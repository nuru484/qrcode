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

import isAuthenticated from '../utils/middleware/authentication.js';
import authorizeRole from '../utils/middleware/authorizeRole.js';

router.post(
  '/',
  validateEventDetails,
  isAuthenticated,
  authorizeRole(['ADMIN']),
  createEvent
);

router.put(
  '/:eventId',
  validateEventUpdateDetails,
  isAuthenticated,
  authorizeRole(['ADMIN']),
  updateEvent
);

router.delete(
  '/:eventId',
  isAuthenticated,
  authorizeRole(['ADMIN']),
  deleteEvent
);

router.get(
  '/:eventId',
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getEventById
);

router.get(
  '/',
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getAllEvents
);

export default router;
