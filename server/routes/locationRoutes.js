import express from 'express';
import {
  deleteLocation,
  getAllLocations,
  getFilteredLocations,
  getLocationById,
} from '../controllers/locationControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.get('/get-location-by-id/:id', getLocationById);
router.get('/filtered-result', getFilteredLocations);
router.delete('/delete-location/:id', authMiddleware, deleteLocation);

export default router;
