import { Router } from 'express';
const router = Router();

import {
  createAttendance,
  updateAttendance,
  getAllAttendance,
  getUserAttendance,
  getEventAttendance,
  deleteAttendance,
} from '../controllers/index.js';
import { validateUserId, validateEventId } from '../validation/idValidators.js';
import isAuthenticated from '../utils/middleware/authentication.js';
import authorizeRole from '../utils/middleware/authorizeRole.js';

router.post('/', createAttendance);

router.put(
  '/',
  validateUserId,
  validateEventId,
  isAuthenticated,
  updateAttendance
);

router.get('/', isAuthenticated, authorizeRole(['ADMIN']), getAllAttendance);

router.get(
  '/user/:userId',
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getUserAttendance
);

router.get(
  '/event/:eventId',
  isAuthenticated,
  authorizeRole(['ADMIN', 'STUDENT']),
  getEventAttendance
);

router.delete(
  '/',
  validateUserId,
  validateEventId,
  isAuthenticated,
  authorizeRole(['ADMIN']),
  deleteAttendance
);

export default router;
