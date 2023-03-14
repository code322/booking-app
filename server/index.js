import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import uploadPhotos from './routes/uploadPhotos.js';
import locationRoutes from './routes/locationRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadPhotos);
app.use('/api/location', locationRoutes);

app.listen(PORT, () => console.log(`running in port ${PORT}`));
