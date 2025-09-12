// Utility functions for medicine and stock management

export const getStockLevelColor = (stockLevel) => {
  if (stockLevel <= 7) {
    return 'text-red-600 bg-red-50 border-red-200';
  } else if (stockLevel <= 14) {
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  } else {
    return 'text-green-600 bg-green-50 border-green-200';
  }
};

export const getStockLevelStatus = (stockLevel) => {
  if (stockLevel <= 7) return 'Critical';
  if (stockLevel <= 14) return 'Low';
  return 'Good';
};

export const shouldShowRefillAlert = (stockLevel, dailyDosage = 1) => {
  const daysRemaining = stockLevel / dailyDosage;
  return daysRemaining <= 7;
};

export const calculateDaysRemaining = (stockLevel, frequency) => {
  const frequencyMap = {
    'Once daily': 1,
    'Twice daily': 2,
    'Three times daily': 3,
    'Four times daily': 4,
    'Every other day': 0.5,
    'Weekly': 1/7,
    'As needed': 0.5, // Estimated
  };
  
  const dailyUsage = frequencyMap[frequency] || 1;
  return Math.floor(stockLevel / dailyUsage);
};

export const formatFrequency = (frequency) => {
  const frequencyMap = {
    'Once daily': '1x/day',
    'Twice daily': '2x/day',
    'Three times daily': '3x/day',
    'Four times daily': '4x/day',
    'Every other day': 'Every 2 days',
    'Weekly': '1x/week',
    'As needed': 'As needed',
  };
  
  return frequencyMap[frequency] || frequency;
};