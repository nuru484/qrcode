import { body } from 'express-validator';
import prisma from '../config/prismaClient.js';
import { CustomError } from '../utils/middleware/errorHandler.js';
import handleValidationErrors from './validationErrorHandler.js';

const userRegistrationValidators = [
  body('firstName')
    .exists({ checkFalsy: true })
    .withMessage('You must type a firstname.')
    .trim()
    .escape(),

  body('lastName')
    .exists({ checkFalsy: true })
    .withMessage('You must type a lastname.')
    .trim()
    .escape(),

  // Username validation
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('You must type a username')
    .trim()
    .escape()
    .custom(async (value) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { username: value },
        });
        if (existingUser) {
          throw new CustomError(
            409,
            `The username "${value}" already exists in our database`
          );
        }
      } catch (error) {
        throw error;
      }
    }),

  // Password validation
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('You must type a password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long')
    // .matches(/[A-Z]/)
    // .withMessage('Password must contain at least one uppercase letter')
    // .matches(/[a-z]/)
    // .withMessage('Password must contain at least one lowercase letter')
    // .matches(/\d/)
    // .withMessage('Password must contain at least one number')
    // .matches(/[@$!%*?&#]/)
    // .withMessage('Password must contain at least one special character')
    .trim(),

  // Confirm password validation
  body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('You must type a confirmation password')
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),

  // Email validation
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('You must type an email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Not a valid email address')
    .custom(async (value) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: value },
        });
        if (existingUser) {
          throw new CustomError(
            409,
            `A user with the email "${value}" already exists in our database`
          );
        }
      } catch (error) {
        throw error;
      }
    }),

  body('identification')
    .exists({ checkFalsy: true })
    .withMessage('You must provide identification.')
    .trim()
    .escape(),
];

export default [...userRegistrationValidators, handleValidationErrors];
