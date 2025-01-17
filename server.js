import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
config();
import expressSession from 'express-session';
import cookieParser from 'cookie-parser'; // To parse cookies in the request
import cors from 'cors'; // To enable Cross-Origin Resource Sharing (CORS)
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

import routes from './src/routes/index.js';
import initializePassport from './src/config/authentication.js';
import errorHandler from './src/utils/middleware/errorHandler.js';

const app = express();

// Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session setup
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, // Prevent JavaScript access to cookies
      secure: process.env.NODE_ENV === 'production', // Only set cookies over HTTPS in production
      sameSite: 'none', // Allow cross-origin cookies
    },
    secret: process.env.SESSION_SECRET,
    resave: false, // Prevent unnecessary session saving
    saveUninitialized: false, // Prevent saving uninitialized sessions
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Configure allowed origins for CORS
const allowedOrigins = new Set(
  process.env.CORS_ACCESS ? process.env.CORS_ACCESS.split(',') : []
);
const corsOptions = {
  origin: function (origin, callback) {
    // Allow if origin is in the allowed list or is undefined (for same-origin requests)
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// CORS middleware
app.use(cors(corsOptions));

// Cookie parsing middleware
app.use(cookieParser());

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Application routes
app.use('/api/v1', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
