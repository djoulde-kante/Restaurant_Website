import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { reservationRouter } from './routes/reservations.js';
import { uploadRouter } from './routes/upload.js';
import { menuRouter } from './routes/menu.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/menu', menuRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/restaurant')
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Start server
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});