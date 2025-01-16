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

import isAuthenticated from '../utils/middleware/authentication.js';
import authorizeRole from '../utils/middleware/authorizeRole.js';

router.post(
  '/',
  validateUserId,
  validateEventId,
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  registerForEvent
);

router.delete(
  '/',
  validateUserId,
  validateEventId,
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  deleteEventRegistration
);

router.get('/', isAuthenticated, authorizeRole(['ADMIN']), getAllRegistrations);

router.get(
  '/event/:eventId',
  validateEventId,
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getRegistrationsByEvent
);

router.get(
  '/user/:userId',
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getRegistrationsByUser
);

router.get(
  '/status',
  validateUserId,
  validateEventId,
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  checkRegistrationStatus
);

export default router;
