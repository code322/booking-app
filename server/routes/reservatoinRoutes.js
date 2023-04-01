import express from 'express';
import { addNewReservation } from '../controllers/reservationControllers';

let route = express.Router();

route.post('/addNewReservation', addNewReservation);
