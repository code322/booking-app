export const convertToDollars = (num: number) => {
  return Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
