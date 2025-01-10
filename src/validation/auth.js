import { body } from 'express-validator';
import handleValidationErrors from './validationErrorHandler.js';

const loginValidators = [
  // Username validation
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('You must type a username')
    .trim()
    .escape(),

  // Password validation
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('You must type a password')
    .trim()
    .escape(),
];

export default [...loginValidators, handleValidationErrors];
