import express from 'express';
import {
  addNewLocation,
  getAllLocations,
  getLocationById,
} from '../controllers/locationControllers.js';
const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.get('/get-location-by-id', getLocationById);
router.post('/new-location', addNewLocation);

export default router;
