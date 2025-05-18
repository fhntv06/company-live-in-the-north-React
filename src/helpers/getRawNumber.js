// eslint-disable-next-line import/prefer-default-export
export const getRawNumber = (number) => {
  const parsedNumber = number.replace(/\s/g, '').replace('+', '');
  return parsedNumber;
};
