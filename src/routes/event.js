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

router.post('/', validateEventDetails, createEvent);
router.put('/:eventId', validateEventUpdateDetails, updateEvent);
router.delete('/:eventId', deleteEvent);
router.get('/:eventId', getEventById);
router.get('/', getAllEvents);

export default router;
