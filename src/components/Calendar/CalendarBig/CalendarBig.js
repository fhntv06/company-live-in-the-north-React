import React, { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import {
  arrayOf, string, bool, func, instanceOf, number, oneOfType, shape,
} from 'prop-types';
import classNames from 'classnames';
import useMediaQuery from '../../../hooks/useMediaQuery';

import CalendarLayout from './CalendarLayout';
import useOutsideClick from '../../../hooks/useOutsideClick';
import BottomSheet from '../../Modal/BottomSheet';

import styles from './CalendarBig.module.scss';

const CalendarBig = ({
  isOpen,
  onClose,
  dateNow,
  selectHandler,
  compactMode,
  pastMode,
  select,
  className,
  apply,
  workingDays,
  singleMode,
  dayEnd,
  dayStart,
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const openedCalendar = useRef(false);
  const calendarRef = useRef(null);

  useOutsideClick(calendarRef, () => {
    if (openedCalendar.current) {
      onClose();
    }
  });

  return (
    <>
      {isMobile
        ? (
          <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modal}
          >
            <CalendarLayout
              isOpen
              onClose={onClose}
              select={select}
              selectHandler={selectHandler}
              dateNow={dateNow}
              calendarRef={calendarRef}
              apply={apply}
              pastMode={pastMode}
              workingDays={workingDays}
              singleMode={singleMode}
              dayEnd={dayEnd}
              dayStart={dayStart}
            />
          </BottomSheet>
        )
        : (
          <CSSTransition
            in={isOpen}
            classNames="calendar-fade"
            timeout={300}
            nodeRef={calendarRef}
            onEntered={() => {
              openedCalendar.current = true;
            }}
            onExit={() => {
              openedCalendar.current = false;
            }}
            unmountOnExit
          >
            <CalendarLayout
              isOpen={isOpen}
              onClose={onClose}
              select={select}
              selectHandler={selectHandler}
              dateNow={dateNow}
              compactMode={compactMode}
              pastMode={pastMode}
              calendarRef={calendarRef}
              apply={apply}
              className={classNames(
                { [styles.calendarDesktop]: !isMobile },
                className,
              )}
              workingDays={workingDays}
              singleMode={singleMode}
              dayEnd={dayEnd}
              dayStart={dayStart}
            />
          </CSSTransition>
        )}
    </>
  );
};

CalendarBig.propTypes = {
  isOpen: bool,
  className: string,
  compactMode: bool,
  dateNow: instanceOf(Date),
  onClose: func.isRequired,
  select: shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  }).isRequired,
  selectHandler: func.isRequired,
  apply: func.isRequired,
  workingDays: arrayOf(number),
  singleMode: bool,
  pastMode: bool,
  dayEnd: string,
  dayStart: string,
};
CalendarBig.defaultProps = {
  isOpen: false,
  compactMode: false,
  dateNow: new Date(),
  className: '',
  workingDays: null,
  singleMode: false,
  pastMode: false,
  dayEnd: false,
  dayStart: false,
};

export default CalendarBig;
