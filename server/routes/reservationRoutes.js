import express from 'express';
import {
  addNewReservation,
  getAllReserves,
} from '../controllers/reservationControllers.js';

let route = express.Router();

route.post('/add-new-reservation', addNewReservation);
route.get('/get-all-reserves', getAllReserves);

export default route;
