import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
config();
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

import initializePassport from './src/config/authentication.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.get('/', (re, res) => {
  res.send('hello');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
