import { Reservation } from '../models/Reservation.js';
import { sendEmail } from '../services/emailService.js';

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
  try {
    const { date, time, guests } = req.body;

    // Vérifier la disponibilité
    const isAvailable = await Reservation.checkAvailability(date, time, guests);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Désolé, il n\'y a plus de place disponible pour cette date et cet horaire'
      });
    }

    const reservation = await Reservation.create(req.body);

    // Envoyer un email de confirmation
    try {
      await sendEmail({
        to: reservation.email,
        subject: 'Confirmation de votre réservation - DIKO Restaurant',
        html: `
          <h2>Merci pour votre réservation !</h2>
          <p>Voici les détails de votre réservation :</p>
          <ul>
            <li>Date : ${new Date(reservation.date).toLocaleDateString('fr-FR')}</li>
            <li>Heure : ${reservation.time}</li>
            <li>Nombre de personnes : ${reservation.guests}</li>
          </ul>
          <p>Nous avons hâte de vous accueillir !</p>
        `
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      // On continue même si l'email échoue
    }

    res.status(201).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Récupérer toutes les réservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Vérifier la disponibilité
export const checkAvailability = async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    const isAvailable = await Reservation.checkAvailability(date, time, parseInt(guests));

    res.status(200).json({
      success: true,
      isAvailable
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Mettre à jour le statut d'une réservation
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};