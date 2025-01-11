import { body } from 'express-validator';
import prisma from '../config/prismaClient.js';
import handleValidationErrors from './validationErrorHandler.js';
import { CustomError } from '../utils/middleware/errorHandler.js';

const userIdValidator = [
  // Validate 'userId'
  body('userId')
    .exists({ checkFalsy: true })
    .withMessage('User ID is required.')
    .isInt({ gt: 0 })
    .withMessage('User ID must be a positive integer.')
    .custom(async (value) => {
      // Check if user exists in the database
      const user =
        value &&
        (await prisma.user.findUnique({
          where: { id: parseInt(value) },
        }));
      if (value && !user) {
        throw new CustomError(404, 'No user found with the provided User ID.');
      }
      return true;
    }),
];

const eventIdValidator = [
  // Validate 'eventId'
  body('eventId')
    .exists({ checkFalsy: true })
    .withMessage('Event ID is required.')
    .isInt({ gt: 0 })
    .withMessage('Event ID must be a positive integer.')
    .custom(async (value) => {
      // Check if event exists in the database
      const event =
        value &&
        (await prisma.event.findUnique({
          where: { id: parseInt(value) },
        }));
      if (value && !event) {
        throw new CustomError(
          404,
          'No event found with the provided Event ID.'
        );
      }
      return true;
    }),
];

export const validateUserId = [...userIdValidator, handleValidationErrors];
export const validateEventId = [...eventIdValidator, handleValidationErrors];
