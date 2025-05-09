import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 8 },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);