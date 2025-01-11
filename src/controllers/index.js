import registerUser from './registration.js';
import { login, logout } from './auth.js';
import {
  registerForEvent,
  deleteEventRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  getRegistrationsByUser,
  checkRegistrationStatus,
} from './eventRegistration.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
} from './event.js';
import {
  createAttendance,
  updateAttendance,
  getAllAttendance,
  getUserAttendance,
  getEventAttendance,
  deleteAttendance,
} from './attendance.js';

export {
  registerUser,
  login,
  logout,
  registerForEvent,
  deleteEventRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  getRegistrationsByUser,
  checkRegistrationStatus,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  createAttendance,
  updateAttendance,
  getAllAttendance,
  getUserAttendance,
  getEventAttendance,
  deleteAttendance,
};
