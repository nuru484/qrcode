import jwt from 'jsonwebtoken';
import ENV from '../config/env.js';

// helper function to verify tokens
export const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

// Middleware to authenticate users with  access token
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = await verifyToken(token, ENV.ACCESS_TOKEN_SECRET);
    req.user = decodedUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Access Token expired. Please refresh token' });
    }
    return res.status(403).json({ message: 'Invalid token', err });
  }
};

export default authenticateJWT;
