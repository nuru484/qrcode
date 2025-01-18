import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
config();
import expressSession from 'express-session';
import cookieParser from 'cookie-parser'; // To parse cookies in the request
import cors from 'cors'; // To enable Cross-Origin Resource Sharing (CORS)
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import sessionFromHeader from './src/utils/middleware/sessionFromHeader.js';

import routes from './src/routes/index.js';
import initializePassport from './src/config/authentication.js';
import errorHandler from './src/utils/middleware/errorHandler.js';

const app = express();

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

const allowedOrigins = new Set(
  process.env.CORS_ACCESS ? process.env.CORS_ACCESS.split(',') : []
);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true); // Pass true for allowing credentials
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
  methods: 'GET, POST, PUT, DELETE', // Allow these HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};

app.enable('trust proxy');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionFromHeader);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use('/api/v1', routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
