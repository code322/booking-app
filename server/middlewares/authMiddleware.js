import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  let accessToken = req.cookies?.accessToken?.split(' ')[1];
  // console.log(accessToken);

  if (!accessToken) {
    res.redirect('http://localhost:5000/login');
  }

  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    next();
  } catch (error) {
    res.status(400).json('token is not valid');
  }
};
