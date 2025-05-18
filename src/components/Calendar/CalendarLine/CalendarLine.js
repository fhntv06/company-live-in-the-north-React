import React, {
  useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import {
  func, number, objectOf, oneOfType, shape, string, instanceOf,
} from 'prop-types';
import classnames from 'classnames';
import Day from '../Day/Day';
import Icon from '../../Icon/Icon';
import {
  date as today, daysCount, getSortedByMonthDate, getType,
} from '../../../helpers/helpersCalendar';

import { monthNominative } from '../../../helpers/timeValues';

import styles from './CalendarLine.module.scss';

const totalDays = daysCount();

const totalDayWidth = (totalDays + 1) * 46;

const currentDay = today.getDay();

const getDistance = (currentDistance) => {
  if (currentDistance === 0) {
    return (8 - currentDay) * 46;
  }

  return 7 * 46;
};

const months = getSortedByMonthDate();

const CalendarLine = React.forwardRef(({
  className, selectHandler, select,
}, ref) => {
  // Refs
  const daysRef = useRef(new Set([]));
  const monthRef = useRef(null);
  const datesRef = useRef(null);

  // States
  const [lineX, setLineX] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);

  useEffect(() => {
    const wrapper = datesRef.current;
    daysRef.current.forEach((value) => value.classList.remove('first-select', 'one-select'));
    const firstDay = daysRef.current.keys().next().value;
    if (firstDay) {
      const classname = daysRef.current.size > 1 ? 'first-select' : 'one-select';
      firstDay.classList.add(classname);
      wrapper.style.setProperty('--calendar-background-width', daysRef.current.size);
    }
  }, [select, lineX]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setMaxDistance(totalDayWidth - entry.contentRect.width);
        setLineX(0);
        if (monthRef.current) {
          monthRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      });
    });

    observer.observe(datesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // next button
  const nextHandler = (e) => {
    e.target.disabled = true;

    let distance = getDistance(lineX);
    distance = lineX + distance;
    monthRef.current.scrollTo({
      left: distance,
      behavior: 'smooth',
    });
    setLineX(distance);

    const handler = () => {
      e.target.disabled = false;
      monthRef.current.removeEventListener('scrollend', handler);
    };
    monthRef.current.addEventListener('scrollend', handler);
  };

  // prev button
  const prevHandler = (e) => {
    e.target.disable = true;
    let distance = getDistance(lineX);
    distance = lineX - distance;
    monthRef.current.scrollTo({
      left: distance,
      behavior: 'smooth',
    });
    setLineX(distance);

    const handler = () => {
      e.target.disabled = false;
      datesRef.current.removeEventListener('scrollend', handler);
    };
    datesRef.current.addEventListener('scrollend', handler);
  };

  const onSelectDate = (item, selectNew) => {
    daysRef.current.clear();

    if (
      select.firstSelect
      && select.firstSelect.getTime() === item.date.getTime()
      && !select.secondSelect) {
      return;
    }

    if (selectNew) {
      selectHandler(selectNew, true);
      return;
    }

    if (select.secondSelect || !select.firstSelect) {
      selectHandler({
        firstSelect: item.date,
        secondSelect: 0,
      }, true);
      return;
    }

    selectHandler({
      firstSelect: item.date < select.firstSelect ? item.date : select.firstSelect,
      secondSelect: item.date < select.firstSelect ? select.firstSelect : item.date,
    }, true);
  };

  const onDayClick = (item) => {
    onSelectDate(item, false);
  };

  const clear = () => {
    months.forEach((month) => {
      month.forEach((day) => {
        day.select = false;
      });
    });
    daysRef.current.clear();
  };

  useImperativeHandle(ref, () => ({
    clear,
  }));

  return (
    <div
      ref={datesRef}
      className={classnames(
        styles.calendar,
        className,
      )}
    >
      {lineX > 0 && (
        <button type="button" onClick={prevHandler} className={styles.prev}>
          <Icon name="dropdown-arrow" />
        </button>
      )}
      <div className={styles.datesWrapper}>
        <div
          ref={monthRef}
          className={styles.dates}
        >
          {months.map((month) => (
            <div
              key={month[0].date.getMonth()}
              className={styles.month}
            >
              <span
                className={styles.monthName}
              >
                {monthNominative[month[0].date.getMonth()]}
              </span>
              <div className={styles.days}>
                {month.map((item) => (
                  <Day
                    ref={(el) => {
                      if (item.select && el) {
                        daysRef.current.add(el);
                      }
                    }}
                    type={getType(item, today, select)}
                    onClick={() => onDayClick(item)}
                    date={item.date.getDate()}
                    day={item.date.getDay()}
                    key={item.date.getTime()}
                    className={styles.day}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {lineX < maxDistance && (
        <button type="button" onClick={nextHandler} className={styles.next}>
          <Icon name="dropdown-arrow" />
        </button>
      )}
    </div>
  );
});

CalendarLine.propTypes = {
  className: string,
  // dateStart: instanceOf(Date),
  selectHandler: func.isRequired,
  select: objectOf(shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  })).isRequired,
};
CalendarLine.defaultProps = {
  className: '',
  // dateStart: new Date(),
};

export default CalendarLine;
