import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  NavLink, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
import MainAfishaSlider from '../../layout/MainPageSliders/MainAfishaSlider';
import Select from '../../components/Select/Select';
import AfishaCompilation from '../../components/AfishaRecomendation/AfishaCompilation';
import FiltersWrapper from '../../components/Calendar/FiltersWrapper';
import AfishaSpecialOffersSlider from '../../components/AfishaSpecialOffersSlider/AfishaSpecialOffersSlider';
import AfishaEvents from '../../components/AfishaEvents/AfishaEvents';
import { date } from '../../helpers/helpersCalendar';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import styles from './AfishaPage.module.scss';
import {
  useGetAllCategoriesQuery, useGetAllCompilationsQuery,
  useGetAllEventsQuery,
  useGetMainEventsQuery,
  useGetTagsQuery,
} from '../../services/afishaApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { formatParams } from '../../helpers/format';
import useGetParams from '../../hooks/useGetParams';
import useMediaQuery from '../../hooks/useMediaQuery';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import MunicipalityDropdown from '../../components/MunicipalityDropdown/MunicipalityDropdown';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import Seo from '../../components/Seo/Seo';

const mainCategory = {
  id: 'all',
  name: 'Все категории',
  slug: '/afisha',
};

const AFISHA_EVENT_LIMIT = 15;

const AfishaPage = () => {
  const isFirstRender = useRef(true);
  const headerRef = useRef(null);
  const moreCategoriesButtonRef = useRef(null);
  const { category } = useParams();
  const { pathname, search } = useLocation();
  const {
    tagId, dateStart, dateEnd, page,
  } = useGetParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Filter hooks
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateEvents, setDateEvents] = useState({
    firstSelect: dateStart ? moment(dateStart, 'DD.MM.YYYY').toDate() : null,
    secondSelect: dateEnd && dateEnd !== dateStart ? moment(dateEnd, 'DD.MM.YYYY').toDate() : 0,
  });
  const [events, setEvents] = useState([]);
  const [offsetEvents, setOffsetEvents] = useState(0);
  const [selectedTags, setSelectedTags] = useState(tagId ?? []);
  const [filtered, setFiltered] = useState(false);
  const [openCategoriesDropdown, setOpenCategoriesDropdown] = useState(false);

  // Data
  const {
    data: allCategories,
    categories,
    additionalCategories,
    isCategoriesLoading,
  } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      const filteredCategories = [mainCategory, ...data ?? []];
      const deleteCount = filteredCategories.length > 10 ? 9 : 10;
      const mainCategories = filteredCategories.splice(0, deleteCount);
      return {
        data: [mainCategory, ...data ?? []],
        categories: mainCategories,
        additionalCategories: filteredCategories.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
        })),
        isCategoriesLoading: isLoading,
      };
    },
  });
  const { data: tags } = useGetTagsQuery();
  const { data: sliderEvents } = useGetMainEventsQuery();
  const { data: compilations } = useGetAllCompilationsQuery();
  const {
    data: eventsData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAllEventsQuery(
    {
      limit: isFirstRender.current && page ? page * AFISHA_EVENT_LIMIT : AFISHA_EVENT_LIMIT,
      skip: offsetEvents,
      category_slug: category,
      filters: search,
    },
    {
      skip: !isFirstRender.current && offsetEvents === 0 && events.length > 0,
    },
  );

  const title = useMemo(() => {
    const found = (
      categories?.find((item) => item.slug === category)
      ?? additionalCategories?.find((item) => item.slug === category)
    );
    return found ? found.name : 'Все события';
  }, [category]);

  useEffect(() => {
    if (isSuccess) {
      setEvents([...events, ...eventsData.data]);
    }
  }, [eventsData]);

  useEffect(() => {
    if (!filtered) return;
    setEvents([]);
    setOffsetEvents(0);
    const applyFilter = () => {
      const filters = {
        tag_id: selectedTags,
        date_start: dateEvents.firstSelect ? moment(dateEvents.firstSelect).format('L') : null,
        date_end: dateEvents.secondSelect !== 0
          ? moment(dateEvents.secondSelect).format('L')
          : dateEvents.firstSelect ? moment(dateEvents.firstSelect).format('L') : null,
      };
      const location = formatParams(pathname, filters);
      navigate(location);
    };

    applyFilter();
    setFiltered(false);
  }, [filtered]);

  useEffect(() => {
    const el = moreCategoriesButtonRef.current;
    const handler = () => {
      if (el) {
        const { left, bottom } = el.getBoundingClientRect();
        document.body.style.setProperty('--left-dropdown', `${left}px`);
        document.body.style.setProperty('--top-dropdown', `${bottom}px`);
      }
    };

    const wrapper = headerRef.current;
    const observer = new ResizeObserver(() => {
      handler();
    });

    if (wrapper) {
      observer.observe(wrapper);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, isMobile]);

  const dateEventSelect = (d, canFilter) => {
    setDateEvents(d);
    if (canFilter) {
      isFirstRender.current = false;
      setFiltered(true);
    }
  };

  const onFetchMoreEvents = () => {
    isFirstRender.current = false;
    const location = formatParams(pathname, {
      tag_id: tagId,
      date_start: dateStart,
      date_end: dateEnd,
      page: parseInt(page ?? 1, 10) + 1,
    });

    navigate(location, { replace: true });
    setOffsetEvents((prev) => prev + AFISHA_EVENT_LIMIT);
  };

  const onSelectTags = (t) => {
    isFirstRender.current = false;
    setSelectedTags(t);
    setFiltered(true);
  };

  const dateFilterApply = () => {
    isFirstRender.current = false;
    setFiltered(true);
    setCalendarOpen(false);
  };

  const isOptionSelected = (option) => option.slug === category;

  if (isLoading || isCategoriesLoading) return <MainPreloader />;

  return (
    <>
      <Seo title={'Афиша | Живём на севере'} description={'Афиша мероприятий Ямало-Ненецкого автономного округа'} />
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <VisibleWrapper />
        </div>
        <header ref={headerRef} className={styles.header}>
          {!category && sliderEvents && <MainAfishaSlider events={sliderEvents} />}
          <div className={styles.row}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{title}</h1>
              <div className={`select__button ${styles.selectButtonWrapper}`}>
                <MunicipalityDropdown gradient />
              </div>
            </div>
          </div>
        </header>
        <div className={styles.tabsWrapper}>
          <div className={styles.row}>
            <div className={styles.tabsRow}>
              {!isMobile ? (
                <>
                  {categories && categories.map((item, index) => (
                    <NavLink
                      key={item.id}
                      to={item.slug}
                      onClick={() => { setEvents([]); setOffsetEvents(0); }}
                      className={classnames(
                        styles.tab,
                        { [styles.active]: !category ? index === 0 : item.slug === category },
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  {additionalCategories.length > 0 && (
                    <Button
                      ref={moreCategoriesButtonRef}
                      className={styles.tab}
                      onClick={() => setOpenCategoriesDropdown(!openCategoriesDropdown)}
                    >
                      Ещё
                      <Icon className={styles.icon} name="dropdown-arrow" />
                    </Button>
                  )}
                </>
              ) : (
                allCategories && allCategories.map((item, index) => (
                  <NavLink
                    key={item.id}
                    to={item.slug}
                    onClick={() => { setEvents([]); setOffsetEvents(0); }}
                    className={classnames(
                      styles.tab,
                      { [styles.active]: !category ? index === 0 : item.slug === category },
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {!isMobile && additionalCategories.length > 0 && (
        <Select
          className={styles.dropdown}
          isClearable
          defaultValue={null}
          menuIsOpen={openCategoriesDropdown}
          options={additionalCategories}
          onChange={(selectOption) => {
            navigate(selectOption.slug, { replace: true });
            setEvents([]);
            setOpenCategoriesDropdown(false);
          }}
          isOptionSelected={isOptionSelected}
        />
      )}
      <div className={styles.row}>
        <FiltersWrapper
          className={styles.calendar}
          selectHandler={dateEventSelect}
          select={dateEvents}
          date={date}
          calendarOpen={calendarOpen}
          setCalendarOpen={setCalendarOpen}
          tags={tags}
          selectedTags={selectedTags}
          onSelectTags={onSelectTags}
          apply={dateFilterApply}
        />
      </div>
      {!eventsData?.data?.length && !(isLoading || isFetching) && (
      <div className={styles.emptyTitleWrapper}>
        <h5 className={styles.emptyTitle}>
          К сожалению, событий по вашему запросу не найдено
        </h5>
      </div>
      )}
      {events && (
        <AfishaEvents
          events={events}
          className={styles.eventsWrapper}
          totalCount={eventsData ? eventsData.total : 0}
        />
      )}
      <SpinnerLoader className={styles.spinnerLoader} isLoading={isLoading || isFetching} />
      {events.length > 0 && events.length < (eventsData ? eventsData.total : 0) && (
      <div className={styles.showMoreWrapper}>
        <Button
          typeButton="button"
          className={styles.more}
          onClick={onFetchMoreEvents}
        >
          Больше событий
        </Button>
      </div>

      )}
      {compilations && compilations.length > 0 && (
        <VisibleWrapper overflow roundCorners>
          <AfishaCompilation
            events={compilations}
            description="Подборки предложений специально для вас"
          />
        </VisibleWrapper>
      )}
      <AfishaSpecialOffersSlider titleClassName={styles.specialOffersTitle} />
    </>
  );
};

export default AfishaPage;
