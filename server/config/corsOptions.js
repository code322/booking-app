import { allowedOrigins } from './allowedOrigins.js';

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
  credential: true,
  optionsSuccessStatus: 200,
  withCredentials: true,
};

export default corsOptions;
