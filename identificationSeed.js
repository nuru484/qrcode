import prisma from './src/config/prismaClient.js';

const seedIdentifications = async () => {
  try {
    // Generate identification records
    const identifications = Array.from({ length: 10 }, (_, index) => ({
      identification: String(index + 1).padStart(3, '0'), // Format as 001, 002, ..., 010
    }));

    // Insert identifications into the database
    await prisma.userIdentification.createMany({
      data: identifications,
      skipDuplicates: true, // Prevent duplicate entries if the seed is run multiple times
    });

    console.log('Seeded user identifications successfully.');
  } catch (error) {
    console.error('Error seeding user identifications:', error);
    process.exit(1); // Exit with failure
  } finally {
    await prisma.$disconnect(); // Close the database connection
  }
};

// Run the seed function
seedIdentifications();
