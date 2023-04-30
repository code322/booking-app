import express from 'express';
import {
  addNewList,
  deleteUserList,
  getUserList,
  updateUserList,
} from '../controllers/userControllers.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/user-data/:id', authMiddleware, isAuthorized, getUserList);
router.post('/user-data/:id', authMiddleware, isAuthorized, addNewList);
router.patch('/user-data/:id', authMiddleware, isAuthorized, updateUserList);
router.delete(
  '/user-data/:id/:listId',
  authMiddleware,
  isAuthorized,
  deleteUserList
);

export default router;
