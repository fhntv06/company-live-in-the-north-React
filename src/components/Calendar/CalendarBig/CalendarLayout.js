import React, {
  useState, useRef, useMemo,
} from 'react';
import {
  bool, string, func, shape, oneOfType, number, instanceOf, arrayOf,
} from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import moment from 'moment/moment';

import classnames from 'classnames';
import Icon from '../../Icon/Icon';
import TagMark from '../../Tags/Tag';
import Day from '../Day/Day';
import Button from '../../Button/Button';

import { monthNominative } from '../../../helpers/timeValues';
import { date, getType } from '../../../helpers/helpersCalendar';

import styles from './CalendarBig.module.scss';

const CalendarLayout = ({
  singleMode,
  dateNow,
  onClose,
  selectHandler,
  select,
  compactMode,
  pastMode,
  className,
  calendarRef,
  apply,
  workingDays,
  dayEnd,
  dayStart,
}) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const range = useMemo(() => ({
    dateStart: select.firstSelect ? moment(select.firstSelect).format('DD') : moment(date).format('DD'),
    dateEnd: singleMode || select.secondSelect === 0 ? null : moment(select.secondSelect).format('DD'),
    monthStart: select.firstSelect
      ? moment(select.firstSelect).format('D MMMM').split(' ')[1]
      : moment(date).format('D MMMM').split(' ')[1],
    monthEnd: select.secondSelect
      ? moment(select.secondSelect).format('MMM')
      : null,
  }), [select]);

  const {
    dateStart, dateEnd, monthStart, monthEnd,
  } = range;

  const allDayMonth = new Date(year, month + 1, 0).getDate();
  const allDayNextMonth = new Date(year, month + 2, 0).getDate();

  const currentMonth = useMemo(() => Array.from(Array((allDayMonth)).keys(), (x) => ({
    date: new Date(year, month, x + 1),
    select: false,
  })), [year, month, select]);

  const nextMonth = useMemo(() => Array.from(Array((allDayNextMonth)).keys(), (x) => ({
    date: new Date(year, month + 1, x + 1),
    select: false,
  })), [year, month, select]);

  const nextHandler = () => {
    document.body.style.setProperty('--calendar-big-fade-exit', '-60px');
    document.body.style.setProperty('--calendar-big-fade-enter', '60px');
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
      return;
    }
    setMonth((prev) => prev + 1);
  };

  const prevHandler = () => {
    document.body.style.setProperty('--calendar-big-fade-exit', '60px');
    document.body.style.setProperty('--calendar-big-fade-enter', '-60px');
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
      return;
    }
    setMonth((prev) => prev - 1);
  };

  let dayCount = 0;
  const addBackground = ({
    date: itemDate, select: itemSelect, firstSelect,
  }) => {
    if (!itemSelect) return null;
    if (dayCount !== 0) {
      dayCount = dayCount >= 6 ? 0 : dayCount + 1;
      return null;
    }

    let width = 0;
    let rightRadius = select.secondSelect ? 16 : 8;
    const leftRadius = firstSelect && select.secondSelect ? 16 : 8;
    if (!select.secondSelect) width = 40;

    const endWeekCheck = new Date(
      itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate() + 7 - itemDate.getDay(),
    );
    if (endWeekCheck.getMonth() > itemDate.getMonth() && endWeekCheck < select.secondSelect) {
      const endMonthDay = new Date(endWeekCheck.getFullYear(), endWeekCheck.getMonth(), 0);

      width = ((endMonthDay.getDay() || 7) + 1 - (itemDate.getDay() || 7)) * 46 - 6;
      dayCount = 8 - endMonthDay.getDay() > 6 ? 0 : 8 - endMonthDay.getDay();
      rightRadius = endMonthDay.getTime() === select.secondSelect?.getTime() ? 16 : 8;
    }

    if (!width && select.secondSelect > endWeekCheck) {
      width = (8 - (itemDate.getDay() || 7)) * 46 - 6;
      dayCount = itemDate.getDay();
    }

    if (!width) {
      width = ((select.secondSelect.getDay() || 7) + 1 - (itemDate.getDay() || 7)) * 46 - 6;
      rightRadius = 16;
      dayCount = itemDate.getDay();
    }

    return (
      <div
        className={styles.background}
        style={{
          width,
          borderBottomLeftRadius: leftRadius,
          borderTopLeftRadius: leftRadius,
          borderBottomRightRadius: rightRadius,
          borderTopRightRadius: rightRadius,
        }}
      />
    );
  };

  const onSelectDate = (item, selectNew) => {
    if (item
      && select.firstSelect
      && select.firstSelect.getTime() === item.date.getTime()
      && !select.secondSelect) {
      return;
    }

    if (selectNew) {
      selectHandler(selectNew, false);
      return;
    }

    if (select.secondSelect || !select.firstSelect || singleMode) {
      selectHandler({
        firstSelect: item.date,
        secondSelect: 0,
      }, false);
      return;
    }

    selectHandler({
      firstSelect: item.date < select.firstSelect ? item.date : select.firstSelect,
      secondSelect: item.date < select.firstSelect ? select.firstSelect : item.date,
    }, false);
  };

  const weekEndSelect = () => {
    onSelectDate(null, {
      firstSelect: new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() + ((7 + 6 - dateNow.getDay()) % 7),
      ),
      secondSelect: new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() + ((7 + 7 - dateNow.getDay()) % 7),
      ),
    });
  };

  const todaySelect = () => {
    onSelectDate(null, {
      firstSelect: dateNow,
      secondSelect: 0,
    });
  };

  const onReset = () => {
    onSelectDate(null, {
      firstSelect: null,
      secondSelect: 0,
    });
  };

  const tomorrowSelect = () => {
    onSelectDate(null, {
      firstSelect: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1),
      secondSelect: 0,
    });
  };

  return (
    <div
      ref={calendarRef}
      className={classnames(
        styles.container,
        className,
        { [styles.compact]: compactMode },
      )}
    >
      <div className={styles.top}>
        <button type="button" className={styles.icons} onClick={onClose}>
          <Icon name="calendar" className={styles.calendarSvg} />
          <Icon name="dropdown-arrow" className={styles.dropdownSvg} />
        </button>
        <div className={styles.range}>
          <div className={styles.dates}>
            <span>
              {dateStart}
            </span>
            {dateEnd && (
              <>
                <span className={styles.seporator} />
                <span>
                  {dateEnd}
                </span>
              </>
            )}
          </div>
          <div className={styles.months}>
            {monthEnd && monthStart.slice(0, 3) !== monthEnd ? (
              <>
                <span>
                  {monthStart.slice(0, 3)}
                </span>
                <span />
                <span>
                  {monthEnd.slice(0, 3)}
                </span>
              </>
            ) : (
              <span>
                {monthStart}
              </span>
            )}
          </div>
        </div>
        <div className={styles.tags}>
          <button className={styles.tag} type="button" onClick={todaySelect}>
            <TagMark type="time">
              Сегодня
            </TagMark>
          </button>
          <button className={styles.tag} type="button" onClick={tomorrowSelect}>
            <TagMark type="time">
              Завтра
            </TagMark>
          </button>
          {!singleMode && (
            <button className={styles.tag} type="button" onClick={weekEndSelect}>
              <TagMark type="time">
                Выходные
              </TagMark>
            </button>
          )}
        </div>
      </div>
      <div className={styles.monthsControl}>
        <div className={styles.left}>
          <span className={styles.dateIndicator}>
            {monthNominative[month]}
            {' '}
            {year}
          </span>
          <button
            type="button"
            onClick={prevHandler}
            className={styles.prev}
            disabled={
              currentMonth[0].date.getTime() <= dateNow.getTime() && !pastMode
            }
          >
            <Icon name="arrow-next" />
          </button>
        </div>
        <div className={styles.right}>
          <button
            type="button"
            onClick={nextHandler}
            className={styles.next}
            disabled={(moment().startOf('month').add(1, 'months').valueOf() <= moment(nextMonth[0].date.getTime()).startOf('month')) && pastMode}
          >
            <Icon name="arrow-next" />
          </button>
          <span>
            {monthNominative[month + 1 > 11 ? 0 : month + 1]}
            {' '}
            {month + 1 > 11 ? year + 1 : year}
          </span>
        </div>
      </div>
      <div className={styles.calendar}>
        <SwitchTransition>
          <CSSTransition
            key={month}
            classNames="calendar-big-fade"
            nodeRef={leftRef}
            timeout={600}
          >
            <div className={styles.left} ref={leftRef}>
              {currentMonth.map((item) => (
                <Day
                  type={getType(item, dateNow, select, workingDays, pastMode, dayEnd, dayStart)}
                  style={{ gridColumnStart: item.date.getDay() || 7 }}
                  date={item.date.getDate()}
                  onClick={() => onSelectDate(item)}
                  key={item.date.getTime()}
                >
                  {addBackground(item)}
                </Day>
              ))}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <SwitchTransition>
          <CSSTransition
            key={month}
            classNames="calendar-big-fade"
            nodeRef={rightRef}
            timeout={600}
          >
            <div className={styles.right} ref={rightRef}>
              {nextMonth.map((item) => (
                <Day
                  type={getType(item, dateNow, select, workingDays)}
                  style={{ gridColumnStart: item.date.getDay() || 7 }}
                  date={item.date.getDate()}
                  onClick={() => onSelectDate(item)}
                  key={item.date.getTime()}
                >
                  {addBackground(item)}
                </Day>
              ))}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className={styles.bottom}>
        <button type="button" onClick={onReset} className={styles.reset}>
          сбросить
        </button>
        <Button typeButton="button" onClick={apply} className={styles.submit}>
          показать
        </Button>
      </div>
    </div>
  );
};

CalendarLayout.propTypes = {
  className: string,
  singleMode: bool,
  compactMode: bool,
  pastMode: bool,
  dateNow: instanceOf(Date),
  calendarRef: bool,
  onClose: func.isRequired,
  select: shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  }).isRequired,
  selectHandler: func.isRequired,
  apply: func.isRequired,
  workingDays: arrayOf(number),
  dayEnd: string,
  dayStart: string,
};
CalendarLayout.defaultProps = {
  className: '',
  compactMode: false,
  singleMode: false,
  pastMode: false,
  dateNow: new Date(),
  calendarRef: false,
  workingDays: null,
  dayEnd: null,
  dayStart: null,
};

export default CalendarLayout;
