import prisma from '../config/prismaClient.js';

export const createAttendance = async (req, res, next) => {
  try {
    const { registrationId, eventId, userId } = req.body;

    // Validate the scanned QR code data
    if (!registrationId || !eventId || !userId) {
      return res.status(400).json({ message: 'Invalid QR code data.' });
    }

    // Find the registration record based on userId, eventId, and registrationId
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { event: true, user: true },
    });

    // If registration doesn't exist or doesn't match the scanned data, return an error
    if (
      !registration ||
      registration.userId !== userId ||
      registration.eventId !== eventId
    ) {
      return res
        .status(404)
        .json({ message: 'Invalid or unauthorized QR code.' });
    }

    const checkAttendance = await prisma.attendance.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (checkAttendance && checkAttendance.attended) {
      return res
        .status(409)
        .json({ message: 'User attendance has already been captured.' });
    }

    const attendance = await prisma.attendance.upsert({
      where: { userId_eventId: { userId, eventId } },
      update: { attended: true },
      create: { userId, eventId, attended: true },
    });

    res.status(200).json({ message: 'Attendance marked successfully.' });
  } catch (error) {
    next(error);
  }
};

// Update attendance record (e.g., mark as attended or update end time)
export const updateAttendance = async (req, res, next) => {
  try {
    const { attended, attendanceEndTime, userId, eventId } = req.body;

    const attendance = await prisma.attendance.update({
      where: { userId_eventId: { userId, eventId } },
      data: {
        attended: attended || undefined,
        attendanceEndTime: attendanceEndTime
          ? new Date(attendanceEndTime)
          : undefined,
      },
    });

    res
      .status(200)
      .json({ message: 'Attendance record updated successfully.', attendance });
  } catch (error) {
    next(error);
  }
};

// Get all attendance records (Admin Function) with Pagination
export const getAllAttendance = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const attendances = await prisma.attendance.findMany({
      skip: (page - 1) * parseInt(limit), // Skip the records for previous pages
      take: parseInt(limit), // Limit the number of records per page
      include: {
        user: true,
        event: true,
      },
    });

    const totalRecords = await prisma.attendance.count(); // Get total records count

    res.status(200).json({
      message: 'Attendance records successfully fetched.',
      data: attendances,
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

// Get attendance for a specific user with Pagination
export const getUserAttendance = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found.` });
    }

    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const userAttendances = await prisma.attendance.findMany({
      where: { userId: parseInt(userId) },
      skip: (page - 1) * parseInt(limit), // Skip the records for previous pages
      take: parseInt(limit), // Limit the number of records per page
      include: {
        event: true,
      },
    });

    const flattenedUserAttendance = userAttendances.map(
      ({ event, ...rest }) => ({
        ...rest,
        ...event,
      })
    );

    const totalRecords = await prisma.attendance.count({
      where: { userId: parseInt(userId) },
    });

    if (!userAttendances.length) {
      return res
        .status(404)
        .json({ message: 'No attendance records found for this user.' });
    }

    res.status(200).json({
      message: 'User attendance records successfully fetched.',
      data: flattenedUserAttendance,
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

// Get attendance for a specific event with Pagination
export const getEventAttendance = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    // Find the event by ID
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with ID ${eventId} not found.` });
    }

    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const eventAttendances = await prisma.attendance.findMany({
      where: { eventId: parseInt(eventId) },
      skip: (page - 1) * parseInt(limit), // Skip the records for previous pages
      take: parseInt(limit), // Limit the number of records per page
      include: {
        user: true,
      },
    });

    const totalRecords = await prisma.attendance.count({
      where: { eventId: parseInt(eventId) },
    });

    if (!eventAttendances.length) {
      return res
        .status(404)
        .json({ message: 'No attendance records found for this event.' });
    }

    res.status(200).json({
      message: 'Event attendance records successfully fetched.',
      data: eventAttendances,
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

// Delete attendance record
export const deleteAttendance = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;

    await prisma.attendance.delete({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });

    res
      .status(200)
      .json({ message: 'Attendance record deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
