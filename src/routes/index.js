import { Router } from 'express';
const router = Router();

import registrationRoutes from './signup.js';
import authRoutes from './auth.js';
import eventRegistrationRoutes from './eventRegistration.js';
import eventRoutes from './event.js';
import attendanceRoutes from './attendance.js';
import refreshTokenRoute from './refreshToken.js';

router.use('/register', registrationRoutes);
router.use('/auth', authRoutes);
router.use('/event/registration', eventRegistrationRoutes);
router.use('/event', eventRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/', refreshTokenRoute);

export default router;
