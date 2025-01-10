import { Router } from 'express';
const router = Router();

import { registerUser } from '../controllers/index.js';
import validateUserRegistration from '../validation/registrationValidation.js';

router.post('/', validateUserRegistration, registerUser);

export default router;
