import prisma from '../config/prismaClient.js';
import jwt from 'jsonwebtoken';
import ENV from '../config/env.js';
import { verifyToken } from './jwtAuthentication.js';

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided!' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { refreshToken } });

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const decodedUser = await verifyToken(token, ENV.ACCESS_TOKEN_SECRET);

    // Rotate refresh token
    const newRefreshToken = jwt.sign(
      { id: user.id },
      ENV.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Issue new access token
    const newAccessToken = jwt.sign(
      { id: decodedUser.id, username: user.username, role: user.role },
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ newAccessToken, newRefreshToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // If refresh token has expired
      return res
        .status(401)
        .json({ message: 'Refresh token expired. Please log in again.' });
    }
    res
      .status(500)
      .json({ message: 'Server error during refresh token process', error });
  }
};

export default refreshToken;
