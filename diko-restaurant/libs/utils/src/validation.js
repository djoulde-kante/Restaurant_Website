// Règles de validation communes
const rules = {
  required: (value) => ({
    isValid: value !== undefined && value !== null && value !== '',
    message: 'Ce champ est requis'
  }),
  minLength: (min) => (value) => ({
    isValid: value.length >= min,
    message: `Doit contenir au moins ${min} caractères`
  }),
  maxLength: (max) => (value) => ({
    isValid: value.length <= max,
    message: `Ne doit pas dépasser ${max} caractères`
  }),
  min: (min) => (value) => ({
    isValid: Number(value) >= min,
    message: `La valeur doit être supérieure ou égale à ${min}`
  }),
  max: (max) => (value) => ({
    isValid: Number(value) <= max,
    message: `La valeur doit être inférieure ou égale à ${max}`
  }),
  email: (value) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Email invalide'
  }),
  phone: (value) => ({
    isValid: /^(\+33|0)[1-9](\d{2}){4}$/.test(value.replace(/\s/g, '')),
    message: 'Numéro de téléphone invalide'
  }),
  match: (field, fieldName) => (value, formData) => ({
    isValid: value === formData[field],
    message: `Doit correspondre au champ ${fieldName}`
  })
};

// Schémas de validation prédefinis
export const schemas = {
  menuItem: {
    name: [
      rules.required,
      rules.minLength(2),
      rules.maxLength(50)
    ],
    description: [
      rules.required,
      rules.minLength(10),
      rules.maxLength(500)
    ],
    price: [
      rules.required,
      rules.min(0)
    ],
    category: [
      rules.required
    ]
  },
  reservation: {
    name: [
      rules.required,
      rules.minLength(2),
      rules.maxLength(50)
    ],
    email: [
      rules.required,
      rules.email
    ],
    phone: [
      rules.required,
      rules.phone
    ],
    guests: [
      rules.required,
      rules.min(1),
      rules.max(20)
    ],
    date: [
      rules.required
    ]
  }
};

// Fonction principale de validation
export const validate = (data, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const value = data[field];
    const fieldRules = schema[field];

    for (const rule of fieldRules) {
      const result = rule(value, data);
      if (!result.isValid) {
        errors[field] = result.message;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Hook pour la validation de formulaire React
export const useFormValidation = (initialData, schema) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (schema[name]) {
      for (const rule of schema[name]) {
        const result = rule(value, data);
        if (!result.isValid) {
          setErrors(prev => ({ ...prev, [name]: result.message }));
          return false;
        }
      }
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setData(prev => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const validateForm = () => {
    const result = validate(data, schema);
    setErrors(result.errors);
    return result.isValid;
  };

  return {
    data,
    errors,
    handleChange,
    validateForm,
    setData
  };
};