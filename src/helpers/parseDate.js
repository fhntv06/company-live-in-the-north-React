/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';

const parseDate = (fromDate, toDate) => {
  const localFromDate = fromDate && moment(fromDate).utcOffset(fromDate);
  const localToDate = toDate && moment(toDate).utcOffset(toDate);
  const [dayFrom, monthFrom] = localFromDate ? moment(localFromDate).format('D MMMM').split(' ') : [];
  const [dayTo, monthTo] = localToDate ? moment(localToDate).format('D MMMM').split(' ') : [];
  const date = dayTo ? `${dayFrom?.padStart(2, '0')} — ${dayTo?.padStart(2, '0')}` : `${dayFrom?.padStart(2, '0')}`;

  if (monthFrom === monthTo || !monthTo) return [date, monthFrom];

  const months = (
    <>
      <span>{monthFrom.substr(0, 3)}</span>
      {' '}
      <span>{monthTo.substr(0, 3)}</span>
    </>
  );
  return [date, months];
};

export default parseDate;
