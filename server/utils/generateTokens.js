import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../config/jwt.js';
dotenv.config();

const access_token = process.env.ACCESS_TOKEN;
const refresh_token = process.env.REFRESH_TOKEN;

export const generateTokens = {
  accessToken: function (userId, isAdmin) {
    const accessToken = jwt.sign(
      { id: userId, isAdmin: isAdmin },
      access_token,
      {
        expiresIn: ACCESS_TOKEN_LIFE_TIME,
      }
    );
    return `${accessToken}`;
  },
  refreshToken: function (userId, isAdmin) {
    const refreshToken = jwt.sign(
      { id: userId, isAdmin: isAdmin },
      refresh_token,
      {
        expiresIn: REFRESH_TOKEN_LIFE_TIME,
      }
    );
    return `Bearer ${refreshToken}`;
  },
};
