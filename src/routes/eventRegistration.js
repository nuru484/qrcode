import { Router } from 'express';
const router = Router();

import {
  registerForEvent,
  deleteEventRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  getRegistrationsByUser,
  checkRegistrationStatus,
} from '../controllers/index.js';
import { validateUserId, validateEventId } from '../validation/idValidators.js';
import authorizeRole from '../utils/middleware/authorizeRole.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';

router.post(
  '/',
  validateUserId,
  validateEventId,
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  registerForEvent
);

router.delete(
  '/',
  validateUserId,
  validateEventId,
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  deleteEventRegistration
);

router.get('/', authenticateJWT, authorizeRole(['ADMIN']), getAllRegistrations);

router.get(
  '/event/:eventId',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getRegistrationsByEvent
);

router.get(
  '/user/:userId',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getRegistrationsByUser
);

router.get(
  '/status',
  validateUserId,
  validateEventId,
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  checkRegistrationStatus
);

export default router;
