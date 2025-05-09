// Validation d'email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation de mot de passe
export const isValidPassword = (password) => {
  return password.length >= 8;
};

// Validation de numéro de téléphone français
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

// Validation de prix
export const isValidPrice = (price) => {
  return !isNaN(price) && parseFloat(price) >= 0;
};

// Validation des champs requis
export const validateRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined && value.trim() !== '';
};

// Validation de longueur minimale
export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

// Validation de longueur maximale
export const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};