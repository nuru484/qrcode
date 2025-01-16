import QRCode from 'qrcode';
import prisma from '../config/prismaClient.js';

export const registerForEvent = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    // Check if the user is already registered for the event
    const existingRegistration = await prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: 'User is already registered for this event.' });
    }

    // Create a new registration and connect the user and event using 'connect'
    const registration = await prisma.registration.create({
      data: {
        user: { connect: { id: userId } }, // Connect the existing user by their ID
        event: { connect: { id: eventId } }, // Connect the existing event by its ID
      },
    });

    // Generate a unique QR code for the registration
    const qrData = {
      eventId,
      userId,
      registrationId: registration.id, // This is the unique identifier for the registration
    };

    const qrCodeString = JSON.stringify(qrData); // Encode the registration data in JSON
    const qrCodeUrl = await QRCode.toDataURL(qrCodeString); // Generate QR code as base64 image

    // Update the registration with the generated QR code URL
    await prisma.registration.update({
      where: { id: registration.id },
      data: { registrationCode: qrCodeUrl },
    });

    // Respond with the QR code
    res.status(200).json({
      message: 'Registration successful. QR code generated.',
      data: qrCodeUrl,
      eventId,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventRegistration = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    // Check if the user is registered for the event
    const existingRegistration = await prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (!existingRegistration) {
      return res
        .status(400)
        .json({ message: 'No registration found for this user and event.' });
    }

    // Delete the registration from the database
    await prisma.registration.delete({
      where: { id: existingRegistration.id },
    });

    // Respond with success message
    res
      .status(200)
      .json({ message: 'Registration successfully deleted.', eventId });
  } catch (error) {
    next(error);
  }
};

export const getAllRegistrations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const registrations = await prisma.registration.findMany({
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
        event: true,
      },
    });

    const totalRecords = await prisma.registration.count();

    res.status(200).json({
      message: 'Registrations fetched successfully.',
      data: registrations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const registrations = await prisma.registration.findMany({
      where: { eventId: parseInt(eventId) },
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
      },
    });

    const totalRecords = await prisma.registration.count({
      where: { eventId: parseInt(eventId) },
    });

    if (registrations.length === 0) {
      return res
        .status(404)
        .json({ message: 'No registrations found for this event.' });
    }

    res.status(200).json({
      message: 'Registrations fetched successfully.',
      data: registrations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const registrations = await prisma.registration.findMany({
      where: { userId: parseInt(userId) },
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        event: true,
      },
    });

    const totalRecords = await prisma.registration.count({
      where: { userId: parseInt(userId) },
    });

    if (registrations.length === 0) {
      return res
        .status(404)
        .json({ message: 'No registrations found for this user.' });
    }

    res.status(200).json({
      message: 'Registrations fetched successfully.',
      data: registrations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const checkRegistrationStatus = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    const registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });

    if (!registration) {
      return res.status(200).json({ isRegistered: false });
    }

    res.status(200).json({ isRegistered: true });
  } catch (error) {
    next(error);
  }
};
