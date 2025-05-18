/* eslint-disable max-len */
import React, { useMemo } from 'react';
import {
  string, shape, oneOfType, instanceOf, number, bool,
} from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import Icon from '../../Icon/Icon';

import useMediaQuery from '../../../hooks/useMediaQuery';

import styles from './CalendarMini.module.scss';
import { date } from '../../../helpers/helpersCalendar';

const CalendarMini = ({
  className,
  select,
  dates,
  afishaMode,
  compact,
  ...otherProps
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const dateStartFormatted = moment(select.dateStart).format('YYYY-MM-DD');
  const itemFormatted = moment(select.firstSelect).format('YYYY-MM-DD');

  const range = useMemo(() => ({
    dateStart: select.firstSelect
      ? (
        select.dateStart
          ? (
            moment(dateStartFormatted).isBefore(itemFormatted)
              ? moment(select.firstSelect).format('DD') : (
                moment(dateStartFormatted).isAfter(itemFormatted)
                  ? moment(select.dateStart).format('DD') : moment(select.firstSelect).format('DD')
              )
          )
          : moment(select.firstSelect).format('DD')
      )
      : moment(date).format('DD'),
    dateEnd: select.secondSelect === 0 ? null : moment(select.secondSelect).format('DD'),
    monthStart: select.firstSelect
      ? moment(select.firstSelect).format('D MMMM').split(' ')[1]
      : moment(date).format('D MMMM').split(' ')[1],
    monthEnd: select.secondSelect
      ? moment(select.firstSelect).format('MMM')
      : null,
  }), [select]);

  const {
    dateStart, dateEnd, monthStart, monthEnd,
  } = range;

  return (
    <button
      type="button"
      className={classnames(
        className,
        { [styles.wrapper]: !compact },
        { [styles.miniWrapper]: compact },
      )}
      {...otherProps}
    >
      {isMobile || compact
        ? (
          <div className={styles.mobileCalendar}>
            <Icon name="calendar" className={styles.calendarSvg} />
            <div>
              {dates && `${dates.dateStart[0]} ${dates.dateStart[1].slice(0, 3)} - ${dates.dateEnd[0]} ${dates.dateEnd[1].slice(0, 3)}`}
              {!dates && !afishaMode && +dateStart === new Date().getDate() && !dateEnd && 'Сегодня'}
              {!dates && afishaMode && +dateStart === new Date().getDate() && !dateEnd && `${dateStart} ${monthStart.slice(0, 3)}`}
              {!dates && (dateStart && dateEnd && monthStart && monthEnd) && `${dateStart} ${monthStart.slice(0, 3)} - ${dateEnd} ${monthEnd.slice(0, 3)}`}
              {!dates && dateStart && monthStart && +dateStart !== new Date().getDate() && !dateEnd && `${dateStart} ${monthStart.slice(0, 3)}`}
            </div>
            {!dates && <Icon name="dropdown-arrow" className={styles.dropdownSvg} /> }
          </div>
        )
        : (
          <>
            <div className={classnames(
              styles.top,
            )}
            >
              <Icon name="calendar" className={styles.calendarSvg} />
              {!dates && <Icon name="dropdown-arrow" className={styles.dropdownSvg} /> }
            </div>
            <div className={styles.bottom}>
              <div className={styles.dates}>
                {dateEnd || dates ? (
                  <>
                    <span>
                      {!dates ? dateStart : dates.dateStart[0]}
                    </span>
                    {(dateEnd || (dates && dates.dateEnd)) && <span className={styles.seporator} /> }
                    <span>
                      {!dates ? dateEnd : dates.dateEnd[0]}
                    </span>
                  </>
                ) : (
                  <span>
                    {dateStart}
                  </span>
                )}
              </div>
              <div className={styles.months}>
                {(monthEnd && monthStart.slice(0, 3) !== monthEnd) || dates ? (
                  <>
                    <span>
                      {!dates ? monthStart.slice(0, 3) : dates.dateStart[1].slice(0, 3)}
                    </span>
                    <span />
                    <span>
                      {!dates ? monthEnd.slice(0, 3) : (dates.dateEnd ? dates.dateEnd[1].slice(0, 3) : '')}
                    </span>
                  </>
                ) : (
                  <span>
                    {!dates && monthStart}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
    </button>
  );
};

CalendarMini.propTypes = {
  className: string,
  select: shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  }).isRequired,
  switchToOneLineCalendar: bool,
  dates: shape({
    firstDate: oneOfType([instanceOf(Date), string]),
    secondSelect: oneOfType([instanceOf(Date), string]),
  }),
  compact: bool,
  afishaMode: bool,
};

CalendarMini.defaultProps = {
  className: '',
  switchToOneLineCalendar: true,
  dates: null,
  compact: false,
  afishaMode: false,
};

export default CalendarMini;
