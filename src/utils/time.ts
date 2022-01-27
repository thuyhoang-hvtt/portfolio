export const isDay = () => {
  const hour = new Date().getHours();
  return hour < 18 && hour > 6;
};
