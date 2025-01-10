import registerUser from './registration.js';
import { login, logout } from './auth.js';
import {
  registerForEvent,
  deleteEventRegistration,
} from './eventRegistration.js';

import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
} from './event.js';

export {
  registerUser,
  login,
  logout,
  registerForEvent,
  deleteEventRegistration,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
};
