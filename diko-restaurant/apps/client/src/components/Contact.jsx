import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Container } from '@repo/ui/container'
import { motion } from 'framer-motion'
import { reservationService } from '../services/reservationService'
import toast, { Toaster } from 'react-hot-toast'

// Schéma de validation
const schema = yup.object({
  name: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string().required('Le téléphone est requis'),
  date: yup.date()
    .min(new Date(), 'La date doit être dans le futur')
    .required('La date est requise'),
  time: yup.string().required('L\'heure est requise'),
  guests: yup.number()
    .min(1, 'Minimum 1 personne')
    .max(8, 'Maximum 8 personnes')
    .required('Le nombre de personnes est requis'),
  message: yup.string()
}).required();

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30',
  '19:00', '19:30', '20:00', '20:30', '21:00'
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      guests: 2
    }
  });

  const watchedFields = watch(['date', 'time', 'guests']);

  // Vérifier la disponibilité lors des changements
  const checkAvailability = async () => {
    const [date, time, guests] = watchedFields;
    if (date && time && guests) {
      try {
        const { isAvailable } = await reservationService.checkAvailability(
          date,
          time,
          guests
        );
        setAvailability(isAvailable);
      } catch (error) {
        console.error('Erreur de vérification:', error);
        setAvailability(null);
      }
    }
  };

  // Gérer la soumission du formulaire
  const onSubmit = async (data) => {
    if (availability === false) {
      toast.error('Cet horaire n\'est plus disponible');
      return;
    }

    try {
      setIsSubmitting(true);
      await reservationService.createReservation(data);
      toast.success('Votre réservation a été confirmée !');
      reset();
      setAvailability(null);
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-gray-600">
                  15 Rue du Restaurant<br />
                  75003 Paris, France
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Horaires</h3>
                <p className="text-gray-600">
                  Lundi - Samedi<br />
                  12h00 - 14h30 | 19h00 - 22h30<br />
                  Fermé le dimanche
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p className="text-gray-600">
                  Téléphone: +33 1 23 45 67 89<br />
                  Email: contact@restaurant.fr
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de réservation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Réserver une table</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`mt-1 block w-full rounded-md shadow-sm 
                    ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                    focus:border-amber-500 focus:ring-amber-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`mt-1 block w-full rounded-md shadow-sm 
                      ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                      focus:border-amber-500 focus:ring-amber-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`mt-1 block w-full rounded-md shadow-sm 
                      ${errors.phone ? 'border-red-500' : 'border-gray-300'} 
                      focus:border-amber-500 focus:ring-amber-500`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register('date')}
                    min={new Date().toISOString().split('T')[0]}
                    className={`mt-1 block w-full rounded-md shadow-sm 
                      ${errors.date ? 'border-red-500' : 'border-gray-300'} 
                      focus:border-amber-500 focus:ring-amber-500`}
                    onChange={checkAvailability}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Heure
                  </label>
                  <select
                    id="time"
                    {...register('time')}
                    className={`mt-1 block w-full rounded-md shadow-sm 
                      ${errors.time ? 'border-red-500' : 'border-gray-300'} 
                      focus:border-amber-500 focus:ring-amber-500`}
                    onChange={checkAvailability}
                  >
                    <option value="">Choisir</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                    Personnes
                  </label>
                  <select
                    id="guests"
                    {...register('guests')}
                    className={`mt-1 block w-full rounded-md shadow-sm 
                      ${errors.guests ? 'border-red-500' : 'border-gray-300'} 
                      focus:border-amber-500 focus:ring-amber-500`}
                    onChange={checkAvailability}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'personne' : 'personnes'}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {availability !== null && (
                <div 
                  className={`text-sm ${
                    availability ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {availability 
                    ? '✓ Horaire disponible' 
                    : '✗ Désolé, cet horaire n\'est plus disponible'}
                </div>
              )}

              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || availability === false}
                  className={`w-full bg-amber-600 text-white py-3 px-6 rounded-md 
                    ${(isSubmitting || availability === false) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-amber-700'} 
                    transition-colors`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Réserver'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
      <Toaster position="top-center" />
    </div>
  );
}
