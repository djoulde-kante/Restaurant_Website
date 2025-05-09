import express from 'express';
import { Reservation } from '../models/Reservation.js';

export const reservationRouter = express.Router();

// Créer une réservation
reservationRouter.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vérifier la disponibilité
reservationRouter.get('/check-availability', async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    const reservationDate = new Date(date);
    
    // Vérifier le nombre de réservations existantes pour cette date et heure
    const existingReservations = await Reservation.countDocuments({
      date: {
        $gte: new Date(reservationDate.setHours(0, 0, 0)),
        $lt: new Date(reservationDate.setHours(23, 59, 59))
      },
      time: time
    });

    // Maximum 4 réservations par créneau horaire
    const isAvailable = existingReservations < 4;

    res.json({ isAvailable });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});