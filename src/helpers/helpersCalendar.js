import moment from 'moment';

const dateUtcOffset = (date) => moment(date).utcOffset(date);

export const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

export const getTomorrowDate = () => {
  const tomorrow = new Date(date).setDate(date.getDate() + 1);

  return moment(tomorrow).format('L');
};

export const getType = (
  item,
  today,
  select,
  workingDays,
  previousDays = false,
  dayEnd,
  dayStart,
) => {
  if (!previousDays && (item.date < today)) {
    return 'disabled';
  }

  if (dayEnd || dayStart) {
    const a = new Date(item.date);
    const itemFormatted = `${a.getFullYear()}.${(`0${a.getMonth() + 1}`).slice(-2)}.${(`0${a.getDate()}`).slice(-2)}`;
    let dateStart;
    let dateEnd;
    if (dayStart) {
      dateStart = dateUtcOffset(dayStart).format('YYYY.MM.DD');
    }

    if (dayEnd) {
      dateEnd = dateUtcOffset(dayEnd).format('YYYY.MM.DD');
    }
    const itemDate = dateUtcOffset(item.date).format('YYYY.MM.DD');

    if ((!previousDays && itemDate !== dateEnd
        && (moment(itemFormatted).isAfter(dateEnd)))
        || (!previousDays && itemDate !== dateStart
          && (moment(itemFormatted).isBefore(dateStart)))) {
      return 'disabled';
    }
  }

  const desiredValue = workingDays?.type === 'date' ? moment(item.date).format('DD.MM.YY') : item.date.getDay();
  if (workingDays && !workingDays.days.includes(desiredValue === 0 ? 7 : desiredValue)) {
    return 'disabled';
  }

  if (previousDays && (item.date > today)) return 'disabled';

  item.select = false;

  if (select.firstSelect && select.firstSelect.getTime() === item.date.getTime()) {
    item.select = true;
    item.firstSelect = true;
    return 'selected';
  }

  if (select.firstSelect <= item.date && select.secondSelect >= item.date) {
    if (select.secondSelect.getTime() === item.date.getTime()) {
      item.secondSelect = true;
    }
    item.select = true;
    return 'selected';
  }

  if (item.date.getDay() === 6 || item.date.getDay() === 0) {
    return 'red';
  }

  return '';
};

export const daysCount = () => {
  const date1 = date;
  const date2 = new Date(date1.getFullYear(), date1.getMonth() + 2, 0);
  return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
};

export const getSortedByMonthDate = () => {
  const total = Array.from(Array(daysCount() + 1).keys(), (day) => ({
    date: new Date(date.getFullYear(), date.getMonth(), day + date.getDate()),
  }));
  let obj = {};
  total.forEach((item) => {
    const month = item.date.getMonth();
    obj = {
      ...obj,
      [month]: obj[month] ? [...obj[month], item] : [item],
    };
  });

  return Object.values(obj);
};

export const findNearestNextDayOfWeek = (targetDays) => {
  const currentDayOfWeek = new Date().getDay();

  if (targetDays.includes(currentDayOfWeek)) {
    return currentDayOfWeek;
  }

  let nearestNextDayOfWeek = null;
  let minDifference = Infinity;

  targetDays.forEach((dayOfWeek) => {
    const difference = (dayOfWeek - currentDayOfWeek + 7) % 7;

    if (difference < minDifference) {
      minDifference = difference;
      nearestNextDayOfWeek = dayOfWeek;
    }
  });

  return nearestNextDayOfWeek;
};
