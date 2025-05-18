import moment from 'moment';

export const isPersonAdult = (birthDate) => {
  const currentDate = moment();
  const personBirthDate = moment(birthDate, 'DD.MM.YYYY');
  const age = currentDate.diff(personBirthDate, 'years');

  return age >= 18;
};

export const isPersonYoungAdult = (birthDate) => {
  const currentDate = moment();
  const personBirthDate = moment(birthDate, 'DD.MM.YYYY');
  const age = currentDate.diff(personBirthDate, 'years');

  return age >= 14;
};
