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

router.post('/', createAttendance);
router.put('/', validateUserId, validateEventId, updateAttendance);
router.get('/', getAllAttendance);
router.get('/user/:userId', getUserAttendance);
router.get('/event/:eventId', getEventAttendance);
router.delete('/', validateUserId, validateEventId, deleteAttendance);

export default router;
