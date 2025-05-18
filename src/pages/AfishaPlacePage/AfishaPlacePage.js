import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './AfishaPlacePage.module.scss';
import Button from '../../components/Button/Button';
import { GradientViolet } from '../../helpers/gradients';
import PageHeader from '../../components/PageHeader/PageHeader';
// import AfishaCompilation from '../../components/AfishaRecomendation/AfishaCompilation';
import AfishaAbout from '../../components/AfishaTabs/AfishaAbout/AfishaAbout';
import AfishaSpecialOffersSlider from '../../components/AfishaSpecialOffersSlider/AfishaSpecialOffersSlider';
// import MainAfishaSlider from '../../layout/MainPageSliders/MainAfishaSlider';
import AfishaEvents from '../../components/AfishaEvents/AfishaEvents';
import SheduleCard from '../../components/SheduleCard/SheduleCard';
import {
  // useGetAllCompilationsQuery,
  // useGetMainEventsQuery,
  useGetPlaceByIdQuery,
} from '../../services/afishaApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { getIsAuth } from '../../features/Auth/authSlice';
// import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import Seo from '../../components/Seo/Seo';
import removeTags from '../../helpers/removeTags';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import { useTogglePlaceFavoriteMutation } from '../../services/profileApi';

const MAX_EVENT_VIEW = 5;

const AfishaPlacePage = () => {
  const { id } = useParams();
  const [openMap, setOpenMap] = useState(false);
  const [offset, setOffset] = useState(1);
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const { data: place, isLoading } = useGetPlaceByIdQuery(id);
  // const { data: mainEvents } = useGetMainEventsQuery();
  // const { data: compilations } = useGetAllCompilationsQuery();

  const [togglePlaceFavorite] = useTogglePlaceFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    +id,
    'places',
    togglePlaceFavorite,
  );

  const showMore = () => {
    setOffset((prev) => prev + 1);
  };

  const showEvents = useMemo(() => (
    place?.events.slice(0, offset * MAX_EVENT_VIEW)
  ), [place, offset]);

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={place.name} description={removeTags(place.description ?? place.content)} />
      <PageHeader>
        <div className={styles.header}>
          {place.image && (
            <img src={`${process.env.PUBLIC_URL}/images/${place.image.name}`} alt={place.name} />
          )}
          <h1 className={styles.headerTitle}>{place.name}</h1>
          <div className={styles.buttons}>
            <Button className={styles.shareBtn} typeButton="button-white" iconName="share">поделиться</Button>
            {isAuth && (
              <Button
                typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
                onClick={toggleFavoriteHandler}
                iconProps={{ stroke: 'url(#afisha-preview-gradient)' }}
                gradient={GradientViolet('afisha-preview-gradient', 12.8696, 3.32598, 0.999995, 0.999995)}
              />
            )}
          </div>
        </div>
      </PageHeader>
      <div className={styles.content}>
        <AfishaAbout
          data={place}
        />
      </div>
      <div className={styles.row}>
        <h2 className={styles.subtitle}>
          Контакты
        </h2>
        <SheduleCard
          data={place}
          className={styles.schedule}
          openMap={openMap}
          setOpenMap={setOpenMap}
          alwaysOpen
        />
      </div>
      {place.events.length && (
      <>
        <div className={styles.row}>
          <h2 className={classnames(
            'h1',
            styles.subtitle,
          )}
          >
            события на площадке
          </h2>
        </div>
        <AfishaEvents
          events={showEvents}
          totalCount={place.events.length}
          onFetchMoreEvents={showMore}
        />
      </>
      )}
      {/* <VisibleWrapper overflow roundCorners>
        <div className={styles.compilationsWrapper}>
          <AfishaCompilation
            events={compilations}
            description="Подборки предложений специально для вас"
            className={styles.compilations}
          />
          <div className={styles.row}>
            <h2 className={styles.subtitle}>Ближайшие мероприятия</h2>
          </div>
          <MainAfishaSlider events={mainEvents} />
        </div>
      </VisibleWrapper> */}
      <AfishaSpecialOffersSlider />
    </>
  );
};

export default AfishaPlacePage;
