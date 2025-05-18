import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { GradientViolet } from '../../helpers/gradients';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './AfishaPreview.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import TickerPrice from '../TickerPrice/TickerPrice';
import { getIsAuth } from '../../features/Auth/authSlice';
import { useToggleEventFavoriteMutation } from '../../services/profileApi';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';
import AgeRestriction from '../AgeRestriction/AgeRestriction';

const AfishaPreview = ({
  data,
  onMoreClick,
  goToScheduleClick,
  openShareModal,
}) => {
  const [toggleEventFavorite] = useToggleEventFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    data.id,
    'events',
    toggleEventFavorite,
  );
  const tags = useMemo(() => [
    data.afishaCategory,
    ...data.afishaTags.filter((item) => item.special),
  ], [data]);
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const afishaPreviewContent = (
    <div className={styles.content}>
      <div className={styles.middle}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <div key={tag.id} className={styles.tag}>
              {/* {tag.icon && <Icon name={tag.icon} />} */}
              {tag.name}
            </div>
          ))}
          {data && data.ageRestriction
            && (
            <AgeRestriction
              age={data.ageRestriction}
              imageUrl={data && data.mainImage && data.mainImage.url}
            />
            )}
        </div>
        <h1 className={styles.header}>
          {data.name}
        </h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.eventPlaceInfo}>
          {data.afishaPlaces && data.afishaPlaces.length > 0 && (
          <div className={styles.locations}>
            <Icon name="geo" />
            <span>
              {data.afishaPlaces[0].name}
            </span>
            {data.afishaPlaces.length > 1 && (
            <button type="button" onClick={onMoreClick} className={styles.more}>
              ещё
              {` ${data.afishaPlaces.length - 1}`}
            </button>
            )}
          </div>
          )}
          <div className={styles.dates}>
            {
          data.dateEnd && (
            <>
              <Icon name="watch" className={styles.iconWatch} />
              {moment(data.dateStart).diff(data.dateEnd) ? (
                <>
                  С
                  {' '}
                  {moment(data.dateStart).format('DD MMMM YYYY')}
                  {' '}
                  до
                  {' '}
                  {moment(data.dateEnd).format('DD MMMM YYYY')}
                </>
              ) : (
                moment(data.dateStart).format('DD MMMM YYYY')
              )}
            </>
          )
        }
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={openShareModal}
            typeButton="button-white"
            iconName="share"
          >
            поделиться

          </Button>
          <Button onClick={goToScheduleClick} typeButton="button-white">расписание</Button>
          <TickerPrice
            price={data.price}
            href={data}
            onClick={goToScheduleClick}
            className={styles.tickerPrice}
            freeText="Бесплатно"
          />
          {isAuth && (
          <Button
            typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
            onClick={() => {
              toggleFavoriteHandler(data.id);
            }}
            iconProps={{ stroke: 'url(#afisha-preview-gradient)' }}
            gradient={GradientViolet('afisha-preview-gradient', 12.8696, 3.32598, 0.999995, 0.999995)}
          />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <PageHeader
      className={classnames(styles.wrapper, { [styles.withoutBackground]: !data.mainImage })}
      contrast={Boolean(data.mainImage)}
    >
      {data.mainImage && (
        <div
          className={classnames(styles.background, { [styles.alignToTop]: data.alignMainImageTop })}
          style={{ backgroundImage: data.mainImage ? `url(${data.mainImage.url})` : null }}
        >
          {/* {video && ( */}
          {/*  <video className={styles.video} playsInline muted autoPlay> */}
          {/*    <source src={video} /> */}
          {/*  </video> */}
          {/* )} */}
        </div>
      )}
      {!data.mainImage && (
      <VisibleWrapper className={styles.visibleWrapper}>
        {afishaPreviewContent}
      </VisibleWrapper>
      )}
      {data.mainImage && afishaPreviewContent}
    </PageHeader>
  );
};

AfishaPreview.propTypes = {
  data: PropTypes.shape().isRequired,
  onMoreClick: PropTypes.func,
  goToScheduleClick: PropTypes.func,
  openShareModal: PropTypes.func,
};

AfishaPreview.defaultProps = {
  onMoreClick: () => {},
  goToScheduleClick: () => {},
  openShareModal: () => {},
};

export default AfishaPreview;
