/* eslint-disable max-len */
import moment from 'moment';

export const formingTextData = (array) => {
  const data = [];
  array.forEach((item) => {
    const text = item.text?.length > 150 ? `${item.text.slice(0, 150)} ...` : item.text;
    data.push({ ...item, text });
  });

  return data;
};

export const sliceData = (data, max) => data.slice(0, max);
export const filterData = (data, sort) => data.filter((item) => (item.type === sort));
export const filterCity = (data, city) => data.filter((item) => (item.location === city));
export const findCity = (data, city) => data.filter((item) => (item.location === city));
export const findSelectCity = (data, value) => data.find(((item) => value === item.value));

export const sortedDataByType = (sortedData) => ({
  archive: sortedData.filter((data) => data.status === 'archive'),
  rest: sortedData.filter((data) => data.status !== 'acrhive'),
});

export const sortingDateUp = (array) => (
  array.sort((prevDate, nextDate) => {
    const currentFieldPrev = prevDate.updatedAt ? prevDate.updatedAt : prevDate.activeStart;
    const currentFieldNext = nextDate.updatedAt ? nextDate.updatedAt : nextDate.activeStart;
    const formatedPrevDate = moment(currentFieldPrev).format('DD.MM.YYYY.h.mm.ss');
    const formatedNextDate = moment(currentFieldNext).format('DD.MM.YYYY.h.mm.ss');
    const [dayPrev, monthPrev, yearPrev, hoursPrev, minutePrev, secondPrev] = formatedPrevDate.split('.');
    const [dayNext, monthNext, yearNext, hoursNext, minuteNext, secondNext] = formatedNextDate.split('.');
    // eslint-disable-next-line max-len
    return new Date(yearPrev, monthPrev, dayPrev, hoursPrev, minutePrev, secondPrev) - new Date(yearNext, monthNext, dayNext, hoursNext, minuteNext, secondNext);
  })
);

export const sortingDateDown = (array) => (
  array.sort((prevDate, nextDate) => {
    const currentFieldPrev = prevDate.updatedAt ? prevDate.updatedAt : prevDate.activeStart;
    const currentFieldNext = nextDate.updatedAt ? nextDate.updatedAt : nextDate.activeStart;
    const formatedPrevDate = moment(currentFieldPrev).format('DD.MM.YYYY.h.mm.ss');
    const formatedNextDate = moment(currentFieldNext).format('DD.MM.YYYY.h.mm.ss');

    const [dayPrev, monthPrev, yearPrev, hoursPrev, minutePrev, secondPrev] = formatedPrevDate.split('.');
    const [dayNext, monthNext, yearNext, hoursNext, minuteNext, secondNext] = formatedNextDate.split('.');

    // eslint-disable-next-line max-len
    return new Date(yearNext, monthNext, dayNext, hoursNext, minuteNext, secondNext) - new Date(yearPrev, monthPrev, dayPrev, hoursPrev, minutePrev, secondPrev);
  })
);

export const sortingDateEndDown = (array) => (
  array.sort((prevDate, nextDate) => {
    const currentFieldPrev = prevDate.activeEnd;
    const currentFieldNext = nextDate.activeEnd;
    const formatedPrevDate = moment(currentFieldPrev).format('DD.MM.YYYY');
    const formatedNextDate = moment(currentFieldNext).format('DD.MM.YYYY');
    const [dayPrev, monthPrev, yearPrev] = formatedPrevDate.split('.');
    const [dayNext, monthNext, yearNext] = formatedNextDate.split('.');

    // eslint-disable-next-line max-len
    return new Date(yearNext, monthNext, dayNext) - new Date(yearPrev, monthPrev, dayPrev);
  })
);
const dateUtcOffset = (date) => moment(date).utcOffset(date);
export const sortingDateEndUp = (array) => (
  array.sort((prevDate, nextDate) => {
    const currentFieldPrev = prevDate.activeEnd;
    const currentFieldNext = nextDate.activeEnd;
    const formatedPrevDate = dateUtcOffset(currentFieldPrev).format('YYYY.MM.DD');
    const formatedNextDate = dateUtcOffset(currentFieldNext).format('YYYY.MM.DD');
    const a = moment(formatedPrevDate, 'YYYY.MM.DD');
    const b = moment(formatedNextDate, 'YYYY.MM.DD');
    // eslint-disable-next-line max-len
    return a.diff(b);
  })
);

export const sortingForProperty = (array) => (
  array.sort((preIdea, nextIdea) => nextIdea.likesCount - preIdea.likesCount)
);

export const sortingIdeas = (ideas, id) => {
  switch (id) {
    case 1:
      // date sort down
      return sortingDateDown(ideas);
    case 2:
      // date sort up
      return sortingDateUp(ideas);
    default:
      // volume like sort
      return sortingForProperty(ideas);
  }
};

export const formingIdeas = (data, sortId, max) => sortingIdeas(sliceData(data, max), sortId);
