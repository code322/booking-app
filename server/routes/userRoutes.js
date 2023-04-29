import express from 'express';
import { getUserData } from '../controllers/userControllers.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
// get a user data
router.get('/user-data/:id', authMiddleware, isAuthorized, getUserData);

export default router;
