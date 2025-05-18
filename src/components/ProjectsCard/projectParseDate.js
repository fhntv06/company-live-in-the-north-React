import moment from 'moment';

const projectParseDate = (fromDate, toDate) => {
  const [monthFrom, yearFrom] = fromDate ? moment(fromDate, 'DD.MM.YY').format('MMMM YYYY').split(' ') : [];
  const [monthTo, yearTo] = toDate ? moment(toDate, 'DD.MM.YY').format('MMMM YYYY').split(' ') : [];

  return {
    monthFrom, yearFrom, monthTo, yearTo,
  };
};

export default projectParseDate;
