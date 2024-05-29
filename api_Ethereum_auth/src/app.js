import express from 'express';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

export default app;