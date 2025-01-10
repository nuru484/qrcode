import bcrypt from 'bcryptjs';
import prisma from '../config/prismaClient.js';

export default async (req, res, next) => {
  const { confirmPassword, ...userDetails } = req.body;
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    userDetails.password = hashedPassword;

    // Create the new user in the database
    const user = await prisma.user.create({
      data: userDetails,
    });

    const { password, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'Registration successful.',
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
