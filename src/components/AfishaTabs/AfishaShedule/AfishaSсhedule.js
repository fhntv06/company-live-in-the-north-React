import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SheduleCard from '../../SheduleCard/SheduleCard';
import CalendarBig from '../../Calendar/CalendarBig/CalendarBig';
import CalendarMini from '../../Calendar/CalendarMini/CalendarMini';
import { date, findNearestNextDayOfWeek } from '../../../helpers/helpersCalendar';
import styles from './AfishaSсhedule.module.scss';
import OrganizerInfo from '../../OrganizerInfo/OrganizerInfo';

const AfishaSchedule = React.forwardRef(({
  schedule, organizer, price, className, dateEnd, dateStart,
}, ref) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateSchedule, setDateSchedule] = useState({
    firstSelect: date,
    secondSelect: 0,
    dateStart,
    dateEnd,
  });

  const [openMap, setOpenMap] = useState(false);

  const seances = useMemo(() => {
    const daysSet = new Set();
    const days = [];
    const type = schedule[0].sessions[0]?.dayOfWeek ? 'weekDay' : 'date';

    schedule.forEach((item) => {
      item.sessions.forEach((seance) => daysSet.add(seance.dayOfWeek ?? seance.dateEvent));
    });

    daysSet.forEach((value) => days.push(value));

    return {
      days,
      type,
      dateStart,
      dateEnd,
    };
  }, [schedule]);

  useEffect(() => {
    const { type, days } = seances;
    const today = type === 'date' ? moment(date).format('DD.MM.YY') : date.getDay();
    if (!seances.days.includes(today)) {
      let nextDay = null;
      if (type === 'date') {
        days.forEach((item) => {
          const args = item.split('.');
          const f = [args[1], args[0], args[2]].join('/');
          if (moment(date).isBefore(f) && (!nextDay || moment(nextDay).isAfter(f))) {
            nextDay = new Date(`20${+args[2]}`, args[1] - 1, +args[0]);
          }
        });
      } else {
        const nearestDay = findNearestNextDayOfWeek(days);
        if (today > nearestDay) {
          nextDay = new Date().setDate(date.getDate() + (7 - (today - nearestDay)));
        } else {
          nextDay = new Date().setDate(date.getDate() + (nearestDay - today));
        }
        nextDay = new Date(nextDay);
      }

      setDateSchedule({
        firstSelect: nextDay,
        secondSelect: 0,
      });
    }
  }, []);

  const onClose = () => {
    setCalendarOpen(false);
  };

  const onOpen = () => {
    setCalendarOpen(true);
  };

  const applyDates = () => {
    onClose();
  };

  const dateScheduleSelect = (d) => {
    setDateSchedule(d);
  };

  return (
    <div className={`${styles.shedule} ${className}`} ref={ref}>
      <h2 className={styles.header}>
        Расписание
      </h2>
      <div className={styles.calendarWrapper}>
        <CalendarMini
          onClick={onOpen}
          select={dateSchedule}
          afishaMode
          className={styles.calendar}
          compact
        />
        <CalendarBig
          isOpen={calendarOpen}
          onClose={onClose}
          select={dateSchedule}
          selectHandler={dateScheduleSelect}
          dateNow={date}
          workingDays={seances}
          dayEnd={dateEnd && dateEnd}
          dayStart={dateStart && dateStart}
          apply={applyDates}
          singleMode
          compactMode
        />
      </div>
      <div className={styles.cards}>
        {schedule.map((card) => (
          <SheduleCard
            key={card.name}
            data={card}
            price={price}
            className={styles.card}
            openMap={openMap}
            setOpenMap={setOpenMap}
            selectDay={dateSchedule.firstSelect}
          />
        ))}
        {organizer && schedule.includes(organizer) && (
          <OrganizerInfo organizer={organizer} />
        )}
      </div>
    </div>
  );
});

AfishaSchedule.propTypes = {
  schedule: PropTypes.arrayOf().isRequired,
  organizer: PropTypes.shape().isRequired,
  price: PropTypes.number,
  className: PropTypes.string,
  dateEnd: PropTypes.string,
  dateStart: PropTypes.string,
};

AfishaSchedule.defaultProps = {
  price: null,
  className: '',
  dateEnd: null,
  dateStart: null,
};

export default AfishaSchedule;
