import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import styles from './AfishaSearchPage.module.scss';
import TabButton from '../../components/TabButton/TabButton';
import Button from '../../components/Button/Button';
// import AfishaCompilation from '../../components/AfishaRecomendation/AfishaCompilation';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
// import { selectAllCompilations } from '../../features/AfishaCompilation/compiationSlice';
import AfishaEvents from '../../components/AfishaEvents/AfishaEvents';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useGetAfishaEventSearchResultsQuery, useGetAfishaPlaceSearchResultsQuery } from '../../services/searchApi';
import useGetParams from '../../hooks/useGetParams';
import { formatParams } from '../../helpers/format';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import Seo from '../../components/Seo/Seo';

const AFISHA_SEARCH_RESULTS_LIMIT = 15;

const tabs = [
  { id: 1, name: 'события' },
  { id: 2, name: 'места' },
];

const AfishaSearchPage = () => {
  const [events, setEvents] = useState([]);
  const [places, setPlaces] = useState([]);
  const isFirstRender = useRef(true);
  const [offsetEventResults, setOffsetEventResults] = useState(0);
  const [offsetPlaceResults, setOffsetPlaceResults] = useState(0);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  // const compilations = useSelector(selectAllCompilations);
  const [searchInputValue, setSearchInputValue] = useState(search.includes('?query=') ? window.decodeURI(search.split('=')[1]) : '');
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { query, eventsPage, placesPage } = useGetParams();

  const {
    data: eventsData,
    isSuccess: isEventsSuccess,
    isFetching: isEventsFetching,
  } = useGetAfishaEventSearchResultsQuery({
    searchQuery: currentQuery,
    limit: isFirstRender.current
    && eventsPage ? AFISHA_SEARCH_RESULTS_LIMIT * eventsPage : AFISHA_SEARCH_RESULTS_LIMIT,
    skip: offsetEventResults,
  }, {
    skip: !isFirstRender.current && offsetEventResults === 0 && events.length > 0,
  });

  const {
    data: placesData,
    isSuccess: isPlacesSuccess,
    isFetching: isPlacesFetching,
  } = useGetAfishaPlaceSearchResultsQuery({
    searchQuery: currentQuery,
    limit: isFirstRender.current
    && placesPage ? AFISHA_SEARCH_RESULTS_LIMIT * placesPage : AFISHA_SEARCH_RESULTS_LIMIT,
    skip: offsetPlaceResults,
  }, {
    skip: !isFirstRender.current && offsetPlaceResults === 0 && places.length > 0,
  });

  useEffect(() => {
    if (isEventsSuccess) {
      setEvents([...events, ...eventsData.data]);
    }
  }, [eventsData]);

  useEffect(() => {
    if (isPlacesSuccess) {
      setPlaces([...places, ...placesData.data]);
    }
  }, [placesData]);

  useEffect(() => {
    if (!search) return;

    setCurrentQuery(!query ? '' : decodeURIComponent(query));
    setSearchInputValue(!query ? '' : decodeURIComponent(query));
  }, [search]);

  const onKeyUp = (e) => {
    if (searchInputValue === currentQuery) return;

    if (e.key === 'Enter' || e.key === 'NumpadEnder') {
      if (searchInputValue === query) return;

      navigate({
        search: `query=${searchInputValue}`,
      });

      setEvents([]);
      setPlaces([]);
    }
  };

  const fetchMoreEventsHandler = () => {
    isFirstRender.current = false;

    const location = formatParams(pathname, {
      query: currentQuery,
      eventsPage: parseInt(eventsPage ?? 1, 10) + 1,
      ...(placesPage && { placesPage }),
    });

    navigate(location, { replace: true });
    setOffsetEventResults((prev) => prev + AFISHA_SEARCH_RESULTS_LIMIT);
  };

  const fetchMorePlacesHandler = () => {
    isFirstRender.current = false;

    const location = formatParams(pathname, {
      query: currentQuery,
      ...(eventsPage && { eventsPage }),
      placesPage: parseInt(placesPage ?? 1, 10) + 1,
    });

    navigate(location, { replace: true });
    setOffsetPlaceResults((prev) => prev + AFISHA_SEARCH_RESULTS_LIMIT);
  };

  const tabsMarkup = tabs.map((tab) => (
    <TabButton
      className={styles.tabButton}
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      type="button"
      name={tab.name}
      isActive={activeTab === tab.id}
    />
  ));

  const renderShowMoreButton = (condition, onClickHandler) => (
    <>
      {condition && (
      <div className={styles.showMoreWrapper}>
        <Button
          typeButton="button"
          className={styles.more}
          onClick={onClickHandler}
        >
          Загрузить ещё
        </Button>
      </div>
      )}
    </>
  );

  const renderNotFoundMessage = (condition, message) => (
    <>
      {condition && (
      <div className={styles.row}>
        <h5 className={styles.emptyTitle}>
          {message}
        </h5>
      </div>
      )}
    </>
  );

  if (isFirstRender.current && (isEventsFetching || isPlacesFetching)) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Результаты поиска'} description="Живём на севере" />
      <div className={styles.page}>
        <PageHeader
          className={styles.header}
        >
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Результаты поиска</h1>
            <div
              className="input-field"
            >
              <SearchInput
                value={searchInputValue}
                onChange={setSearchInputValue}
                onKeyUp={onKeyUp}
              />
            </div>
          </div>
        </PageHeader>
        <div className={styles.contentContainer}>
          {!isMobile && (
          <div className={styles.tabs}>
            {tabsMarkup}
          </div>
          )}
          <div className={styles.row}>
            {events && activeTab === 1 && (
            <div className={styles.row}>
              <h2 className={classnames('h1', styles.title)}>События</h2>
              <AfishaEvents
                className={styles.afishaEventsWrapper}
                events={events}
                inGridContainer
              />
            </div>
            )}
            {places && activeTab === 2 && (
            <div className={classnames(styles.row, styles.placesWrapper)}>
              <h2 className={classnames('h1', styles.title)}>Места</h2>
              <AnimatePresence>
                <motion.div
                  key="content"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={styles.cards}
                >
                  {places.map((place) => (
                    <motion.div
                      initial={{ y: -40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={styles.placeCardWrapper}
                    >
                      <PlaceCard
                        switchToMobileLayout
                        data={place}
                        className={styles.placeCard}
                      />
                    </motion.div>

                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            )}
            {renderNotFoundMessage(activeTab === 1 && !eventsData?.data?.length && !(isEventsFetching), 'К сожалению, событий по вашему запросу не найдено')}
            {renderNotFoundMessage(activeTab === 2 && !placesData?.data?.length && !(isPlacesFetching), 'К сожалению, мест по вашему запросу не найдено')}
            <SpinnerLoader
              isLoading={isEventsFetching || isPlacesFetching}
              className={styles.spinner}
            />
            {renderShowMoreButton(
              activeTab === 1 && events.length < eventsData?.total, fetchMoreEventsHandler,
            )}
            {renderShowMoreButton(
              activeTab === 2 && places.length < placesData?.total, fetchMorePlacesHandler,
            )}
            {/* {(activeTab === 1 || activeTab === 4) && (
                <div className={styles.row}>
                  <AfishaCompilation
                    events={compilations}
                    title="Подборки"
                    className={styles.recommendation}
                  />
                </div>
              )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AfishaSearchPage;
