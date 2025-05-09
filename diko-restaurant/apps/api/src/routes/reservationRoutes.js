import express from 'express';
import {
  createReservation,
  getReservations,
  checkAvailability,
  updateReservationStatus
} from '../controllers/reservationController.js';

export const router = express.Router();

// Routes publiques
router.post('/', createReservation);
router.get('/check-availability', checkAvailability);

// Routes protégées (à utiliser avec un middleware d'authentification)
router.get('/', getReservations);
router.patch('/:id/status', updateReservationStatus);