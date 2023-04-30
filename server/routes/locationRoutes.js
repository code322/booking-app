import express from 'express';
import {
  getAllLocations,
  getFilteredLocations,
  getLocationById,
} from '../controllers/locationControllers.js';

const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.get('/get-location-by-id/:id', getLocationById);
router.get('/filtered-result', getFilteredLocations);

export default router;
