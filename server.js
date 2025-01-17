import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

import routes from './src/routes/index.js';
import initializePassport from './src/config/authentication.js';
import errorHandler from './src/utils/middleware/errorHandler.js';

// Load environment variables
config();

const app = express();

// Trust proxy - important for secure cookies behind a proxy
app.enable('trust proxy');

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://qrcode-frontend-lovat.vercel.app'
      : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// Session configuration
const sessionConfig = {
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    // Don't set domain in development
    ...(process.env.NODE_ENV === 'production' && {
      domain: '.onrender.com', // Adjust this based on your domain
    }),
  },
  name: 'sessionId', // Custom name for the session cookie
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000, // Check every 2 minutes
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

app.use(expressSession(sessionConfig));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Session debugging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
    console.log('Cookies:', req.cookies);
    console.log('Secure:', req.secure);
    console.log('X-Forwarded-Proto:', req.get('X-Forwarded-Proto'));
    next();
  });
}

// Custom middleware to ensure session is working
app.use((req, res, next) => {
  // Ensure the session is being set
  if (!req.session) {
    return next(new Error('Session initialization failed'));
  }
  next();
});

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
  console.log(`App is listening on http://localhost:${port}`);
});

// Proper error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
