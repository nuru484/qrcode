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

router.post('/', validateUserId, validateEventId, registerForEvent);
router.delete('/', validateUserId, validateEventId, deleteEventRegistration);
router.get('/', getAllRegistrations);
router.get('/event/:eventId', validateEventId, getRegistrationsByEvent);
router.get('/user/:userId', validateUserId, getRegistrationsByUser);
router.get('/status', validateUserId, validateEventId, checkRegistrationStatus);

export default router;
