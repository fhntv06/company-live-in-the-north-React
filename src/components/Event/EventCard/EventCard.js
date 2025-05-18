import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../../Icon/Icon';
import TickerPrice from '../../TickerPrice/TickerPrice';
import Button from '../../Button/Button';
import IconType from '../../../helpers/IconType';
import styles from './EventCard.module.scss';
import { getIsAuth } from '../../../features/Auth/authSlice';
import { useToggleEventFavoriteMutation } from '../../../services/profileApi';
import useToggleFavorite from '../../../hooks/useToggleFavorite';
import useMediaQuery from '../../../hooks/useMediaQuery';

const EventCard = ({
  data,
  type,
  icon,
  featherIcon,
  tickerPriceColor,
  typeEvent,
  variant,
  className,
  ...otherProps
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

  const isMobile = useMediaQuery('(max-width: 767px)');

  const classParams = useMemo(() => {
    const params = type === 'event' ? variant : type;
    const additionClass = params === 'actual' ? styles.actual : styles.soon;
    return additionClass;
  }, [type]);

  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const startDate = useMemo(() => {
    const date = moment(data.dateStart).format('D MMMM');

    return {
      day: date.split(' ')[0],
      month: date.split(' ')[1],
    };
  }, [data]);

  const iconType = useMemo(() => {
    if (data.pushkinCard) {
      return 'pen';
    }
    return false;
  });

  const onToggleFavorite = async (event) => {
    event.preventDefault();

    toggleFavoriteHandler(data.id);
  };

  return (
    <Link
      to={`/afisha/event/${data.slug}`}
      className={classnames(
        styles.wrapper,
        classParams,
        { [styles.withoutImage]: !data.mainImage && !data.mainImagePreview },
        className,
      )}
    >
      <div
        className={classnames(
          styles.card,
        )}
        {...otherProps}
      >
        {(data.mainImagePreview || data.mainImage) && (
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${data.mainImagePreview?.url || data.mainImage?.url})` }}
          />
        )}
        <div className={styles.top}>
          {type === 'soon' && (
            <div className={styles.time}>
              <div className={styles.soonText}>
                скоро
              </div>
              <div className={styles.day}>
                {startDate.day}
              </div>
              <div className={styles.month}>
                {startDate.month}
              </div>
            </div>
          )}
          <div className={styles.category}>
            {data.afishaCategory && (
              data.afishaCategory.name
            )}
          </div>
          <div className={styles.price}>
            <TickerPrice
              backgroundColor={data.mainImage ? 'bluemarine' : 'violet'}
              price={data.price}
              freeText="Бесплатно"
            />
            {isAuth && (
              <Button
                typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
                className={styles.booksmarkBtn}
                onClick={onToggleFavorite}
              />
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <h4 className={styles.title}>{data.name}</h4>
          {((data.dateStart && type !== 'soon') || isMobile) && (
          <div className={styles.location}>
            {!isMobile && <Icon name="watch" className={styles.timeSvg} />}
            {data.dateEnd !== data.dateStart && (
              <span>
                до
                &nbsp;
              </span>
            )}
            <span>{moment(data.dateEnd).format('DD MMMM')}</span>
          </div>
          )}
          {data.afishaPlaces && data.afishaPlaces.length > 0 && !isMobile && (
          <div className={styles.location}>
            <Icon name="geo" className={styles.geoSvg} />
            <span>{data.afishaPlaces[0].name}</span>
          </div>
          )}
        </div>
        {featherIcon && <IconType className={styles.labelSvg} typeEvent={iconType} iconFill="white" /> }
      </div>
    </Link>
  );
};

EventCard.propTypes = {
  data: PropTypes.shape().isRequired,
  type: PropTypes.string,
  icon: PropTypes.string,
  tickerPriceColor: PropTypes.string,
  typeEvent: PropTypes.string,
  variant: PropTypes.string,
  featherIcon: PropTypes.bool,
  className: PropTypes.string,
};

EventCard.defaultProps = {
  className: '',
  type: 'actual',
  icon: 'fire',
  featherIcon: false,
  tickerPriceColor: null,
  typeEvent: null,
  variant: 'actual',
};

export default EventCard;
