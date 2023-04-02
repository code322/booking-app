import express from 'express';
import {
  addNewReservation,
  deleteReservation,
  getAllReserves,
} from '../controllers/reservationControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

let route = express.Router();

route.post('/add-new-reservation', addNewReservation);
route.get('/get-all-reserves', authMiddleware, getAllReserves);
route.delete('/delete-reservation/:id', authMiddleware, deleteReservation);

export default route;
