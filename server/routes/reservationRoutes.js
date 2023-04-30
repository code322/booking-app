import express from 'express';
import {
  addNewReservation,
  deleteReservation,
  getAllReserves,
} from '../controllers/reservationControllers.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

let route = express.Router();

route.post('/add-new-reservation', isAuthenticated, addNewReservation);
route.get('/get-all-reserves/:id', isAuthenticated, getAllReserves);
route.delete('/delete-reservation/:id', isAuthenticated, deleteReservation);

export default route;
