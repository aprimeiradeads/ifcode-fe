// Form validation utilities

export const validateMedicineForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Medicine name is required';
  }
  
  if (!formData.dosage?.trim()) {
    errors.dosage = 'Dosage is required';
  }
  
  if (!formData.frequency) {
    errors.frequency = 'Frequency is required';
  }
  
  if (formData.stockLevel && formData.stockLevel < 0) {
    errors.stockLevel = 'Stock level cannot be negative';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProfileForm = (profileData) => {
  const errors = {};
  
  if (!profileData.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (profileData.email && !isValidEmail(profileData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (profileData.phone && !isValidPhone(profileData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

export const sanitizeInput = (input) => {
  return input?.trim().replace(/[<>]/g, '');
};