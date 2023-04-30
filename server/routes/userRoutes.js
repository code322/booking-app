import express from 'express';
import {
  addNewList,
  deleteUserList,
  getUserList,
  updateUserList,
} from '../controllers/userControllers.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();
router.get('/user-data/:id', isAuthenticated, isAuthorized, getUserList);
router.post('/user-data/:id', isAuthenticated, isAuthorized, addNewList);
router.patch('/user-data/:id', isAuthenticated, isAuthorized, updateUserList);
router.delete(
  '/user-data/:id/:listId',
  isAuthenticated,
  isAuthorized,
  deleteUserList
);

export default router;
