import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import { GradientLight } from '../../helpers/gradients';
import CalendarMini from '../../components/Calendar/CalendarMini/CalendarMini';
import styles from './BonusHistoryPage.module.scss';
import CalendarBig from '../../components/Calendar/CalendarBig/CalendarBig';
import Select from '../../components/Select/Select';
import BonusHistoryCard from '../../components/BonusHistoryCard/BonusHistoryCard';
import useMediaQuery from '../../hooks/useMediaQuery';
import useCalendar from '../../hooks/useCalendar';
import { useGetBonusHistoryQuery } from '../../services/profileApi';
import { getUser } from '../../features/Auth/authSlice';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import { sortingDateDown } from '../../features/DiscussionData/formingData';
import Seo from '../../components/Seo/Seo';
import { useLazyGetUserQuery } from '../../services/authApi';

const sortByTypeValues = [
  { value: 'all', label: 'Все операции' },
  { value: 'in', label: 'Начисление' },
  { value: 'out', label: 'Списание' },
];

const MAX_ITEMS = 10;

const BonusHistoryPage = () => {
  const navigate = useNavigate();
  const {
    calendarOpen, toggleCalendarHandler, dateNow: date, dateSelect, dateSelectHandler,
  } = useCalendar();
  const [sortByType, setSortByType] = useState(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState();
  const [showCounter, setShowCounter] = useState(MAX_ITEMS);
  const user = useSelector(getUser);
  const [getUserTrigger] = useLazyGetUserQuery();

  const isMobile = useMediaQuery('(max-width: 767px)');
  const { data: operations, isLoading, isSuccess } = useGetBonusHistoryQuery();

  useEffect(() => {
    getUserTrigger();
  }, []);

  // eslint-disable-next-line consistent-return
  const sortedData = useMemo(() => {
    if (operations && operations.length > 0 && isSuccess) {
      if (selectedCalendarDate && selectedCalendarDate.firstSelect) {
        const dateStart = moment(selectedCalendarDate.firstSelect).format('DD.MM.YYYY');
        if (!selectedCalendarDate.secondSelect || selectedCalendarDate.secondSelect === 0) {
          const singleDateArray = operations.filter((item) => dateStart === moment(item.updatedAt).format('DD.MM.YYYY'));
          return singleDateArray;
        }
        const filteredData = operations.filter((item) => {
          const dateStartFormatted = moment(selectedCalendarDate.firstSelect).format('YYYY-MM-DD');
          const dateEndFormatted = moment(selectedCalendarDate.secondSelect).format('YYYY-MM-DD');
          const itemFormatted = moment(item.updatedAt).format('YYYY-MM-DD');

          return moment(itemFormatted).isSameOrAfter(dateStartFormatted)
          && moment(itemFormatted).isSameOrBefore(dateEndFormatted);
        });

        if (sortByType && sortByType.value !== 'all') {
          const operationsFiltred = filteredData.filter((o) => (sortByType.value === 'in' ? o.value > 0 : o.value < 0));
          return sortingDateDown(operationsFiltred);
        }
        return sortingDateDown(filteredData.slice());
      }
      if (!sortByType || sortByType.value === 'all') {
        return operations.slice().sort((a, b) => b.id - a.id);
      }

      const operationsFiltred = operations.filter((o) => (sortByType.value === 'in' ? o.value > 0 : o.value < 0));
      return sortingDateDown(operationsFiltred);
    }
  }, [sortByType, operations, selectedCalendarDate]);

  const changeNavigate = () => {
    navigate('/bonus-program', { replace: true });
  };

  const setDateFiltred = (selectedDate, isApplied) => {
    dateSelectHandler(selectedDate, isApplied);
    setSelectedCalendarDate(selectedDate);
  };

  const closeCalendar = () => {
    toggleCalendarHandler();
  };

  const showMoreHandler = () => {
    setShowCounter((prevShowCounter) => prevShowCounter + MAX_ITEMS);
  };

  return (
    <>
      <Seo title={'История бонусов | Живём на севере'} description={'История бонусов пользователя'} />
      <PageHeader
        withoutControls
        compact
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            История
            {' '}
            <span className={styles.titleSpan}>
              бонусов
              {isMobile && (
              <Icon name="coin" className={styles.bluemarinCoin} />
              )}
            </span>
          </h1>
          {!isMobile && (
            <Button
              typeButton="button-white"
              iconName="coin"
              className={styles.headerButton}
              onClick={changeNavigate}
            >
              Подробнее о программе
            </Button>
          )}
        </div>
      </PageHeader>
      <div className={styles.pageContainer}>
        <div className={styles.topRow}>
          <div className={styles.bonuses}>
            <Icon name="coin" className={styles.coinIcon} fill="url(#coin-gradient)">
              {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
            </Icon>
            {user.bonusCount}
          </div>
          <div className={styles.calendarWrapper}>
            <CalendarMini
              select={dateSelect}
              className={styles.calendar}
              compact
              onClick={toggleCalendarHandler}
            />
            <CalendarBig
              isOpen={calendarOpen}
              onClose={toggleCalendarHandler}
              apply={closeCalendar}
              select={dateSelect}
              selectHandler={setDateFiltred}
              dateNow={date}
              compactMode
              pastMode
              className={styles.calendarBig}
            />
          </div>
          <Select
            type="button--gray"
            placeholder="Тип операции"
            defaultValue={null}
            value={sortByType}
            options={sortByTypeValues}
            className="select__button"
            classIsOpen="select--button--is-open"
            onChange={(selectOption) => {
              setSortByType(selectOption);
            }}
            isSearchable={false}
          />
        </div>
        <div className={styles.container}>
          {isLoading && <SpinnerLoader isLoading={isLoading} />}
          {sortedData && sortedData.slice(0, showCounter).map((operation) => (
            <BonusHistoryCard
              key={operation.id}
              data={operation}
            />
          ))}
          {sortedData?.length > showCounter && (
          <div className={styles.buttonWrapper}>
            <Button
              typeButton="button"
              className={styles.button}
              onClick={showMoreHandler}
            >
              Показать больше
            </Button>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BonusHistoryPage;
