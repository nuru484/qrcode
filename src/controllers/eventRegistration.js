import QRCode from 'qrcode';
import prisma from '../config/prismaClient.js';

export const registerForEvent = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    // Validate inputs
    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: 'User ID and Event ID are required.' });
    }

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

    // Respond with the QR code
    res.status(200).json({
      message: 'Registration successful. QR code generated.',
      data: qrCodeUrl, // Send back the QR code image in base64
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventRegistration = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    // Validate inputs
    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: 'User ID and Event ID are required.' });
    }

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
    res.status(200).json({ message: 'Registration successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
