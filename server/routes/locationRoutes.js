import express from 'express';
import { addNewLocation } from '../controllers/locationControllers.js';
const router = express.Router();

router.post('/new-location', addNewLocation);

export default router;
