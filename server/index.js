import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import uploadPhotos from './routes/uploadPhotos.js';
import locationRoutes from './routes/locationRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import reservationRoutes from './routes/reservationRoutes.js';
import corsOptions from './config/corsOptions.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('home route'));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadPhotos);
app.use('/api/location', locationRoutes);
app.use('/api/reservation', reservationRoutes);

app.listen(PORT, () => console.log(`running in port ${PORT}`));
