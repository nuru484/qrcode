import { Router } from 'express';
const router = Router();

import registrationRoutes from './userRegistration.js';
import authRoutes from './auth.js';

router.use('/register', registrationRoutes);
router.use('/auth', authRoutes);

export default router;
