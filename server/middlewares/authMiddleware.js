import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  let authHeader = req.headers?.authorization || req?.headers?.Authorization;
  console.log(authHeader);

  try {
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    let accessToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    if (!decoded) return res.status(403).json({ message: 'Forbidden' });

    req.id = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
