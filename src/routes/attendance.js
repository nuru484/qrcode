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

router.post('/', createAttendance);
router.put('/', updateAttendance);
router.get('/', getAllAttendance);
router.get('/user/:userId', getUserAttendance);
router.get('/event/:eventId', getEventAttendance);
router.delete('/', deleteAttendance);

export default router;
