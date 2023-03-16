import express from 'express';
import {
  addNewLocation,
  getAllLocations,
} from '../controllers/locationControllers.js';
const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.post('/new-location', addNewLocation);

export default router;
