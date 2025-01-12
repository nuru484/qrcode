import { Router } from 'express';
const router = Router();

import { user, login, logout } from '../controllers/index.js';
import validateUserLogin from '../validation/auth.js';
import isAuthenticated from '../utils/middleware/authentication.js';

router.get('/user', user);
router.post('/login', validateUserLogin, login);
router.post('/logout', logout);

export default router;
