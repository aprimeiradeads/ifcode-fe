// Utility functions for date and time formatting

export const formatTime = (time) => {
  if (!time) return '';
  
  const [hour, minute] = time.split(':');
  const hourNum = parseInt(hour);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
  return `${displayHour}:${minute} ${ampm}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return today.toDateString() === checkDate.toDateString();
};

export const getTimeUntilNext = (time) => {
  const now = new Date();
  const [hour, minute] = time.split(':');
  const nextTime = new Date();
  nextTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
  
  if (nextTime <= now) {
    nextTime.setDate(nextTime.getDate() + 1);
  }
  
  const diff = nextTime - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `in ${hours}h ${minutes}m`;
  } else {
    return `in ${minutes}m`;
  }
};