import prisma from '../config/prismaClient.js';
import { compare } from 'bcrypt';
import { CustomError } from '../utils/middleware/errorHandler.js';
import ENV from '../config/env.js';
import jwt from 'jsonwebtoken';

export const user = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new CustomError(401, 'Not authenticated, please login.');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId, 10),
      },
    });

    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    if (!password || (user && !user.password)) {
      throw new Error('Password or hash missing');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ENV.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      ENV.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.json({ message: 'Login successful', accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
