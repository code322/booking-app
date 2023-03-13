import express from 'express';
import { uploadByLink } from '../controllers/uploadPhotos.js';

const router = express.Router();

router.post('/upload-by-link', uploadByLink);

export default router;
