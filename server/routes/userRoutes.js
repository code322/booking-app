import express from 'express';
import {
  addNewList,
  getUserList,
  updateUserList,
} from '../controllers/userControllers.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/user-data/:id', authMiddleware, isAuthorized, getUserList);
router.post('/user-data/:id', authMiddleware, isAuthorized, addNewList);
router.patch('/user-data/:id', authMiddleware, isAuthorized, updateUserList);

export default router;
