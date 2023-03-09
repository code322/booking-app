import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => console.log(`running in port ${PORT}`));
