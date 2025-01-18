import passport from 'passport';
import prisma from '../config/prismaClient.js';
import { CustomError } from '../utils/middleware/errorHandler.js';

export const user = async (req, res, next) => {
  try {
    console.log(req.session.userId);
    console.log(req.session);
    const userId = req.session.userId;

    if (!userId) {
      throw new CustomError(401, 'Session expired, please login again.');
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
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Pass error to the error handler
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Save user ID in the session
        req.session.userId = user.id;

        return res
          .status(200)
          .json({ message: 'Login successful.', sessionId: req.sessionID });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err); // Pass error to error handler
      }

      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          return next(err); // Pass error to error handler
        }

        // Send successful logout response
        return res.status(200).json({ message: 'Logout successful.' });
      });
    });
  } catch (error) {
    next(error); // Any unexpected errors
  }
};
