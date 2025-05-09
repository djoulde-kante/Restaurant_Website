import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { reservationRouter } from './routes/reservations.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Start server
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});