import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  res.send('test');
});

app.listen(PORT, () => console.log(`running in port ${PORT}`));
