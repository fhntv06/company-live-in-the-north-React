import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {
  string,
  arrayOf,
  shape,
  number,
  bool,
  oneOfType,
  func,
} from 'prop-types';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import DiscussionCard from '../DiscussionCard/DiscussionCard';
import styles from './DiscussionList.module.scss';
import CardListView from '../../CardListView/CardListView';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import CalendarMini from '../../Calendar/CalendarMini/CalendarMini';
import CalendarBig from '../../Calendar/CalendarBig/CalendarBig';
import useCalendar from '../../../hooks/useCalendar';
import { getIsAuth } from '../../../features/Auth/authSlice';

const sortByDateValues = [
  { value: 'DESC', label: 'Сначала новые' },
  { value: 'ASC', label: 'Сначала старые' },
];

const mm = matchMedia('(max-width: 768px)');
const setViewBool = (state) => (state ? 'list' : 'table');

const DiscussionList = ({
  discussions,
  className,
  handleMore,
  hiddenMore,
  // maxNumber,
  volumeAllDiscussions,
  archive,
  setData,
  setOrderDirection,
}) => {
  const smallCard = useMemo(() => volumeAllDiscussions.current <= 3, [discussions]);
  const {
    calendarOpen,
    toggleCalendarHandler,
    dateNow: date,
    dateSelect,
    dateSelectHandler,
  } = useCalendar();
  const [view, setView] = useState((discussions.length > 0 && discussions.length < 4) ? 'list' : setViewBool(mm.matches || smallCard));
  const containerRef = useRef(null);
  const [sortByDate, setSortByDate] = useState(sortByDateValues[0]);
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  // const overload = useMemo(() => (
  //   volumeAllDiscussions > maxNumber
  // ), [maxNumber, volumeAllDiscussions]);

  useEffect(() => {
    mm.addEventListener('change', ({ matches }) => setView(setViewBool(matches || smallCard)));

    return mm.removeEventListener('change', ({ matches }) => setView(setViewBool(matches || smallCard)));
  }, []);

  const discussionItem = (discussion) => (
    <DiscussionItem
      archive={archive}
      key={discussion.id}
      className={styles.discussionItem}
      data={discussion}
      type={(discussion.ideasCount || discussion.ideasCount === 0) ? 'discussion' : 'voting'}
      isAuth={isAuth}
    />
  );

  const discussionCard = (discussion) => (
    <DiscussionCard
      archive={archive}
      key={discussion.id}
      className={styles.discussionCard}
      data={discussion}
      type={(discussion.ideasCount || discussion.ideasCount === 0) ? 'discussion' : 'voting'}
      isAuth={isAuth}
    />
  );

  const selectDate = (selectedDate, isApplied) => {
    dateSelectHandler(selectedDate, isApplied);
    setData(selectedDate, isApplied);
  };

  const onSelectSorted = (selectOption) => {
    setSortByDate(selectOption);
    setOrderDirection(selectOption.value);
  };

  return (
    <div className={`${className} ${styles.wrapper}`}>
      <div className={`${styles.container} animation`}>
        <div className={styles.firstRowWrapper}>
          <div className={styles.buttons}>
            <CardListView
              type="table"
              icon="table"
              info="таблицей"
              isActive={view === 'table'}
              onClick={() => setView('table')}
              className={styles.button}
            />
            <CardListView
              type="list"
              icon="list"
              info="списком"
              isActive={view === 'list'}
              onClick={() => setView('list')}
              isLastEl
              className={styles.button}
            />
          </div>
          {archive && (
            <div className={styles.filterWrapper}>
              <div className={styles.selectWrapper}>
                <Select
                  type="button--gray"
                  value={sortByDate}
                  options={sortByDateValues}
                  className={classnames(
                    'select__button',
                    styles.selectButton,
                  )}
                  classIsOpen="select--button--is-open"
                  onChange={(selectOption) => {
                    onSelectSorted(selectOption);
                  }}
                  isSearchable={false}
                />
              </div>
              <div className={styles.calendarWrapper}>
                <CalendarMini
                  onClick={toggleCalendarHandler}
                  select={dateSelect}
                  className={styles.calendar}
                  compact
                  pastMode
                />
                <CalendarBig
                  isOpen={calendarOpen}
                  onClose={toggleCalendarHandler}
                  select={dateSelect}
                  compactMode
                  pastMode
                  className={styles.calendarBigContainer}
                  selectHandler={selectDate}
                  dateNow={date}
                />
              </div>
            </div>
          )}
        </div>
        {volumeAllDiscussions ? (
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={view}
              nodeRef={containerRef}
              classNames="discussion-animation"
              timeout={400}
            >
              <>
                <div ref={containerRef} className={view === 'table' ? styles.table : styles.list}>
                  {discussions.map((discussion) => (
                    view === 'list' ? discussionItem(discussion) : discussionCard(discussion)
                  ))}
                </div>
                {!hiddenMore ? (
                  <div className={styles.more}>
                    <Button className={styles.button} typeButton="button" onClick={handleMore}>больше обсуждений</Button>
                  </div>
                ) : null}
              </>
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <div className={styles.notFound}>Ничего не найдено</div>
        )}
      </div>
    </div>
  );
};

DiscussionList.propTypes = {
  discussions: arrayOf(
    shape({
      question: string,
      tags: arrayOf(shape(string)),
      users: arrayOf(
        shape({ name: string, surname: string }),
      ),
      day: oneOfType([string, number]).isRequired,
      month: string.isRequired,
    }),
  ).isRequired,
  handleMore: func.isRequired,
  hiddenMore: bool,
  className: string,
  // maxNumber: number.isRequired,
  volumeAllDiscussions: number.isRequired,
  archive: bool,
  setData: func,
  setOrderDirection: func,
};
DiscussionList.defaultProps = {
  className: '',
  archive: false,
  hiddenMore: false,
  setData: () => {},
  setOrderDirection: () => {},
};

export default DiscussionList;
