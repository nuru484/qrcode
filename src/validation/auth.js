import { body, validationResult } from 'express-validator';

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

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

export default [...loginValidators, handleValidationErrors];
