import express from 'express';
import { uploadImage } from '../controllers/uploadByLink.js';

const router = express.Router();

router.post('/upload-by-link', uploadImage);

export default router;
