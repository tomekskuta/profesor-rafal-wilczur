export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.round(Math.random() * array.length - 1)];
};
