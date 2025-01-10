import { body } from 'express-validator';
import handleValidationErrors from './validationErrorHandler.js';

const eventValidationValidators = [
  // Validate 'title'
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Event title is required.')
    .trim()
    .escape(),

  // Validate 'description' (optional, but if provided, it should be a string)
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string if provided.')
    .trim()
    .escape(),

  // Validate 'date' (required and must be a valid date)
  body('date')
    .exists({ checkFalsy: true })
    .withMessage('Event date is required.')
    .isISO8601()
    .withMessage('Date must be a valid date in ISO format.')
    .toDate(),

  // Validate 'location' (required and must be a string)
  body('location')
    .exists({ checkFalsy: true })
    .withMessage('Event location is required.')
    .isString()
    .withMessage('Location must be a string.')
    .trim()
    .escape(),

  // Validate 'category' (optional, but if provided, it must be a string)
  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string if provided.')
    .trim()
    .escape(),
];

export const validateEventDetails = [
  ...eventValidationValidators,
  handleValidationErrors,
];

const eventUpdateValidators = [
  // Validate 'title' (optional for update, but if provided, it must be a string)
  body('title')
    .optional()
    .isString()
    .withMessage('Event title must be a string if provided.')
    .trim()
    .escape(),

  // Validate 'description' (optional, but if provided, it must be a string)
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string if provided.')
    .trim()
    .escape(),

  // Validate 'date' (optional for update, but if provided, it must be a valid date)
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date in ISO format if provided.')
    .toDate(),

  // Validate 'location' (optional for update, but if provided, it must be a string)
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string if provided.')
    .trim()
    .escape(),

  // Validate 'category' (optional for update, but if provided, it must be a string)
  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string if provided.')
    .trim()
    .escape(),
];

export const validateEventUpdateDetails = [
  ...eventUpdateValidators,
  handleValidationErrors,
];
