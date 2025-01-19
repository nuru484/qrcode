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
import authorizeRole from '../utils/middleware/authorizeRole.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';

router.post('/', createAttendance);

router.put(
  '/',
  validateUserId,
  validateEventId,
  authenticateJWT,
  updateAttendance
);

router.get('/', authenticateJWT, authorizeRole(['ADMIN']), getAllAttendance);

router.get(
  '/user/:userId',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getUserAttendance
);

router.get(
  '/event/:eventId',
  authenticateJWT,
  authorizeRole(['ADMIN', 'STUDENT']),
  getEventAttendance
);

router.delete(
  '/',
  validateUserId,
  validateEventId,
  authenticateJWT,
  authorizeRole(['ADMIN']),
  deleteAttendance
);

export default router;
