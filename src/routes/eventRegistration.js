import { Router } from 'express';
const router = Router();

import {
  registerForEvent,
  deleteEventRegistration,
} from '../controllers/index.js';

router.post('/', registerForEvent);
router.delete('/', deleteEventRegistration);

export default router;
