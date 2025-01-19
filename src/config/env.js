import dotenv from 'dotenv';
dotenv.config();

const ENV = {
  CORS_ACCESS: process.env.CORS_ACCESS,
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export default ENV;
