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

router.post('/', registerForEvent);
router.delete('/', deleteEventRegistration);
router.get('/', getAllRegistrations);
router.get('/event/:eventId', getRegistrationsByEvent);
router.get('/user/:userId', getRegistrationsByUser);
router.get('/status', checkRegistrationStatus);

export default router;
