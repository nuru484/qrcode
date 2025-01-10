import { Router } from 'express';
const router = Router();

import { login, logout } from '../controllers/index.js';
import validateUserLogin from '../validation/auth.js';

router.post('/login', validateUserLogin, login);
router.post('/logout', logout);

export default router;
