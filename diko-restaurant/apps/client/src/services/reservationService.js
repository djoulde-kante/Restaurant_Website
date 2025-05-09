const API_URL = 'http://localhost:3001/api/reservations';

export const reservationService = {
  async createReservation(data) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
  },

  async checkAvailability(date, time, guests) {
    const params = new URLSearchParams({ date, time, guests });
    const response = await fetch(`${API_URL}/check-availability?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
  }
};