import { monthNominative, monthsGenitive } from './timeValues';

const getMonth = (dateString, genitive) => {
  const date = new Date(dateString);

  const thisDate = `${date.getDate()} ${(genitive ? monthsGenitive : monthNominative)[date.getMonth()]}`;

  return thisDate;
};

export default getMonth;
