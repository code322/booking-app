import express from 'express';
import { uploadByLink, uploadFromLocal } from '../controllers/uploadPhotos.js';
import { photoMiddleware } from '../middlewares/photosMilddleware.js';

const router = express.Router();

router.post('/upload-by-link', uploadByLink);

router.post(
  '/upload-from-local',
  photoMiddleware.array('photos', 100),
  uploadFromLocal
);

export default router;
