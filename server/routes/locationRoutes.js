import express from 'express';
import {
  addNewLocation,
  deleteLocation,
  getAllLocations,
  getFilteredLocations,
  getLocationById,
  updateLocation,
} from '../controllers/locationControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get-all-locations', getAllLocations);
router.get('/get-location-by-id/:id', getLocationById);
router.get('/filtered-result', getFilteredLocations);
router.post('/new-location', authMiddleware, addNewLocation);
router.delete('/delete-location/:id', authMiddleware, deleteLocation);
router.patch('/update-location/:id', authMiddleware, updateLocation);

export default router;
