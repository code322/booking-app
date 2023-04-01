import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  let authHeader = req.headers?.authorization || req?.headers?.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let accessToken = authHeader?.split(' ')[1];

  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err.message, accessToken });
      }
      // req.user = decoded;
      console.log('verified');
      next();
    });
  }
  // res.status(401).json({ message: 'authorizaed', accessToken });
};
