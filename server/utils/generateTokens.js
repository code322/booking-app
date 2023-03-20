import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const access_token = process.env.ACCESS_TOKEN;
const refresh_token = process.env.REFRESH_TOKEN;

export const generateTokens = {
  accessToken: function (userId) {
    const accessToken = jwt.sign({ id: userId }, access_token, {
      expiresIn: 60 * 30,
    });
    return `Bearer ${accessToken}`;
  },
  refreshToken: function (userId) {
    const refreshToken = jwt.sign({ id: userId }, refresh_token, {
      expiresIn: '30d',
    });
    return `Bearer ${refreshToken}`;
  },
};
