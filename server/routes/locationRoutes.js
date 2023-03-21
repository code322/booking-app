import express from 'express';
import {
  addNewLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
} from '../controllers/locationControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.get('/get-location-by-id/:id', getLocationById);
router.post('/new-location', authMiddleware, addNewLocation);
router.delete('/delete-location/:id', deleteLocation);

export default router;
