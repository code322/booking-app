import express from 'express';
import {
  addNewReservation,
  deleteReservation,
  getAllReserves,
} from '../controllers/reservationControllers.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';

let route = express.Router();

route.post(
  '/add-new-reservation/:id',
  isAuthenticated,
  isAuthorized,
  addNewReservation
);
route.get(
  '/get-all-reserves/:id',
  isAuthenticated,
  isAuthorized,
  getAllReserves
);
route.delete('/delete-reservation/:id', isAuthenticated, deleteReservation);

export default route;
