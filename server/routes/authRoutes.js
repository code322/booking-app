import express from 'express';
import {
  login,
  register,
  logout,
  refreshToken,
} from '../controllers/authControllers.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refreshToken);

export default router;
