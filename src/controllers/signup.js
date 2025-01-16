import bcrypt from 'bcryptjs';
import prisma from '../config/prismaClient.js';
import { CustomError } from '../utils/middleware/errorHandler.js';

export default async (req, res, next) => {
  const { confirmPassword, identification, ...userDetails } = req.body;

  try {
    const userIdentification = await prisma.userIdentification.findUnique({
      where: {
        identification,
      },
    });

    if (!userIdentification) {
      throw new CustomError(404, `Invalid identification.`);
    }

    if (userIdentification.taken === true) {
      throw new CustomError(409, `Identification is already taken.`);
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    userDetails.password = hashedPassword;

    // Create the new user in the database
    const user = await prisma.user.create({
      data: userDetails,
    });

    await prisma.userIdentification.update({
      where: {
        identification,
      },
      data: {
        taken: true,
      },
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
