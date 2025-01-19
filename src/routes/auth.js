import { Router } from 'express';
const router = Router();

import { user, login } from '../controllers/index.js';
import validateUserLogin from '../validation/auth.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';

router.get('/user', authenticateJWT, user);
router.post('/login', validateUserLogin, login);

export default router;
