export const getMonthName = (date: Date) => {
  return new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(date);
};

export const getDayNumber = (date: Date) => {
  return new Intl.DateTimeFormat('en-EN', { day: 'numeric' }).format(date);
};
