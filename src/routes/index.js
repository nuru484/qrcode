import { Router } from 'express';
const router = Router();

import registrationRoutes from './userRegistration.js';
import authRoutes from './auth.js';
import eventRegistrationRoutes from './eventRegistration.js';
import eventRoutes from './event.js';

router.use('/register', registrationRoutes);
router.use('/auth', authRoutes);
router.use('/event/registration', eventRegistrationRoutes);
router.use('/event', eventRoutes);

export default router;
