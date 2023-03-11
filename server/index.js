import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5000',
  })
);
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`running in port ${PORT}`));
