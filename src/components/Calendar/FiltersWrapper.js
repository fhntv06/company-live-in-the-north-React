import React, {
  useMemo, useRef,
  useState,
} from 'react';
import {
  arrayOf,
  bool,
  func, instanceOf, number, objectOf, oneOfType, shape, string,
} from 'prop-types';

import classNames from 'classnames';

import CalendarMini from './CalendarMini/CalendarMini';
import CalendarLine from './CalendarLine/CalendarLine';
import CalendarBig from './CalendarBig/CalendarBig';
import SearchWithTags from '../SearchWithTags/SearchWithTags';

import styles from './FiltersWrapper.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';

const FiltersWrapper = ({
  className,
  date,
  select,
  selectHandler,
  calendarOpen,
  setCalendarOpen,
  tags,
  selectedTags,
  onSelectTags,
  apply,
}) => {
  const lineRef = useRef(null);
  // searchfieldState
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Tags
  const tagsData = useMemo(() => (tags.map((tag) => ({
    ...tag,
    value: tag.id,
    label: tag.name,
  }))), [tags]);

  // close big calendar
  const onClose = () => {
    setCalendarOpen(false);
  };

  // get select range

  const checkSearchOpen = (searchOpen) => {
    setIsSearchOpen(searchOpen);
  };

  const selectDate = (selectedDate, isApplied) => {
    selectHandler(selectedDate, isApplied);
    if (lineRef.current) {
      lineRef.current.clear();
    }
  };

  return (
    <div className={
      classNames(styles.calendar, className, { [styles.searchOpen]: isSearchOpen })
}
    >
      <div className={styles.calendars}>
        {!isMobile && (
          <CalendarMini
            className={`${styles.calendarMini} ${calendarOpen ? styles.opacity : ''}`}
            onClick={() => setCalendarOpen(true)}
            select={select}
          />
        )}
        <CalendarBig
          isOpen={calendarOpen}
          onClose={onClose}
          select={select}
          selectHandler={selectDate}
          dateNow={date}
          apply={apply}
        />
      </div>
      <div className={styles.line}>
        {!isMobile && (
          <CalendarLine
            ref={lineRef}
            selectHandler={selectDate}
            select={select}
            className={styles.calendarLine}
          />
        )}
        <SearchWithTags
          className={styles.search}
          options={tagsData}
          onSearchToggle={checkSearchOpen}
          selectedTags={selectedTags}
          onSelectTags={onSelectTags}
          calendarOpen={calendarOpen}
          setCalendarOpen={() => setCalendarOpen(true)}
          select={select}
        />
      </div>
    </div>
  );
};

FiltersWrapper.propTypes = {
  className: string,
  date: instanceOf(Date).isRequired,
  selectHandler: func.isRequired,
  select: objectOf(shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  })).isRequired,
  calendarOpen: bool,
  setCalendarOpen: func,
  tags: arrayOf(),
  selectedTags: arrayOf().isRequired,
  onSelectTags: func.isRequired,
  apply: func.isRequired,
};
FiltersWrapper.defaultProps = {
  className: '',
  calendarOpen: false,
  setCalendarOpen: () => {},
  tags: [],
};

export default FiltersWrapper;
