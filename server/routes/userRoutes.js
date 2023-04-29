import express from 'express';
import { addNewList, getUserList } from '../controllers/userControllers.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
// get a user data
router.get('/user-data/:id', authMiddleware, isAuthorized, getUserList);
router.post('/user-data/', authMiddleware, isAuthorized, addNewList);

export default router;
