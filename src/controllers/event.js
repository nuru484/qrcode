import prisma from '../config/prismaClient.js';

export const createEvent = async (req, res, next) => {
  try {
    const eventDetails = req.body;

    // Create the new event
    const event = await prisma.event.create({
      data: eventDetails,
    });

    res
      .status(201)
      .json({ message: 'Event created successfully', data: event });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params; // Get event ID from route params
    const eventUpdateData = req.body;

    // Find the event by ID
    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: eventUpdateData,
    });

    res
      .status(200)
      .json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params; // Get event ID from route params

    // Find the event by ID
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: parseInt(eventId) },
    });

    res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params; // Get event ID from route params

    // Find the event by ID
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
      include: {
        Attendance: true, // You can include related data if needed
        Registration: true, // Same for the Registration model if necessary
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res
      .status(200)
      .json({ message: 'Event successfully fetched.', data: event });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    // Retrieve all events
    const events = await prisma.event.findMany();

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found.' });
    }

    res
      .status(200)
      .json({ message: 'Events successfully fetched.', data: events });
  } catch (error) {
    next(error); // Pass error to error handler
  }
};
