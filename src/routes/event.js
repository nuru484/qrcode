import { Router } from 'express';
const router = Router();

import {
  validateEventDetails,
  validateEventUpdateDetails,
} from '../validation/event.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
} from '../controllers/index.js';
import authorizeRole from '../utils/middleware/authorizeRole.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';

router.post(
  '/',
  validateEventDetails,
  authenticateJWT,
  authorizeRole(['ADMIN']),
  createEvent
);

router.put(
  '/:eventId',
  validateEventUpdateDetails,
  authenticateJWT,
  authorizeRole(['ADMIN']),
  updateEvent
);

router.delete(
  '/:eventId',
  authenticateJWT,
  authorizeRole(['ADMIN']),
  deleteEvent
);

router.get(
  '/:eventId',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getEventById
);

router.get(
  '/',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getAllEvents
);

export default router;
