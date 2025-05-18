import React, { useMemo } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TickerPrice from '../../TickerPrice/TickerPrice';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';
import { GradientLight } from '../../../helpers/gradients';
import styles from './EventCardSmall.module.scss';
import { getIsAuth } from '../../../features/Auth/authSlice';
import IconType from '../../../helpers/IconType';
import { getSelectedMunicipality } from '../../../features/Municipality/municipalitySlice';
import useToggleFavorite from '../../../hooks/useToggleFavorite';
import { useToggleEventFavoriteMutation } from '../../../services/profileApi';

const EventCardSmall = ({
  data,
  type,
  className,
  ...otherProps
}) => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const municipalityId = useSelector(getSelectedMunicipality);

  const [toggleEventFavorite] = useToggleEventFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    data.id,
    'events',
    toggleEventFavorite,
  );

  const params = useMemo(() => {
    switch (type) {
      case 'gradient':
        return {
          typeClass: styles.withGradient,
          iconFill: 'white',
        };
      default:
        return {
          typeClass: '',
          iconFill: 'gradient',
        };
    }
  }, [type]);

  const dateString = useMemo(() => {
    let dates = {};

    if (data.dateEnd) {
      dates = {
        dateEnd: moment(data.dateEnd).format('DD MMMM'),
        isSame: moment(data.dateEnd).isSame(data.dateStart),
      };
    } else if (data.municipalities && data.municipalities.length > 0) {
      const municipality = data.municipalities.find((item) => item.id === municipalityId)
        ?? data.municipalities[0];
      dates = {
        dateEnd: moment(municipality.dateEnd).format('DD MMMM'),
        isSame: moment(municipality.dateEnd).isSame(municipality.dateStart),
      };
    } else {
      return null;
    }

    return (
      <>
        <div className={styles.time}>
          <div className={styles.iconWrapper}>
            <Icon name="watch" className={styles.watchSvg} />
          </div>
          <span>
            {!dates.isSame && (
              'до'
            )}
            {' '}
            {dates.dateEnd}
          </span>
        </div>
      </>
    );
  }, [data]);

  const iconType = useMemo(() => {
    if (data.pushkinCard) {
      return 'pen';
    }

    return false;
  });

  const onToggleFavorite = async (event) => {
    event.preventDefault();
    await toggleFavoriteHandler();
  };

  return (
    <Link
      to={`/afisha/event/${data.slug}`}
      className={classnames(
        styles.card,
        params.typeClass,
        {
          [styles.withoutImage]: !data.mainImagePreview && !data.mainImage,
        },
        className,
      )}
      {...otherProps}
    >
      <div className={styles.top}>
        <div className={styles.topRow}>
          <span className={styles.category}>{data.afishaCategory?.name}</span>
          <div className={styles.price}>
            <TickerPrice
              price={data.price}
              icon={false}
              backgroundColor={data.mainImagePreview || data.mainImage ? 'bluemarine' : 'violet'}
              small
              freeText="Бесплатно"
            />
          </div>
          {isAuth && (
            <Button
              typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
              onClick={onToggleFavorite}
              className={classnames(styles.booksmarkBtn, { active: favoriteView })}
            />
          )}
          {iconType && <IconType className={styles.featureIcon} typeEvent={iconType} iconFill="white" /> }
        </div>
        {(data.mainImagePreview || data.mainImage) && (
          <div
            className={styles.imgWrapper}
            style={{ backgroundImage: `url(${data.mainImagePreview?.url ?? data.mainImage?.url})` }}
          />
        )}
      </div>
      <div className={styles.center}>
        <p className={styles.eventName}>
          {data.name}
        </p>
        {data.afishaPlaces && data.afishaPlaces.length > 0 && (
          <div className={styles.location}>
            <div className={styles.iconWrapper}>
              <Icon name="geo" className={styles.locationSvg} />
            </div>
            <span>{data.afishaPlaces[0].name}</span>
          </div>
        )}
        {dateString}
        {/* {data.dateEnd && ( */}
        {/*  <div className={styles.time}> */}
        {/*    <div className={styles.iconWrapper}> */}
        {/*      <Icon name="watch" className={styles.watchSvg} /> */}
        {/*    </div> */}
        {/*    <span> */}
        {/*      {data.dateEnd !== data.dateStart && ( */}
        {/*        'до' */}
        {/*      )} */}
        {/*      {' '} */}
        {/*      {moment(data.dateEnd).format('DD MMMM')} */}
        {/*    </span> */}
        {/*  </div> */}
        {/* )} */}
      </div>
      {iconType && (
        <Icon name={iconType} className={styles.labelSvg} fill={params.iconFill === 'white' ? '#FFFFFF' : 'url(#event-small-gradient)'}>
          {GradientLight('event-small-gradient', 21.997, 1.63281, 1.99707, 1.99707)}
        </Icon>
      )}
    </Link>
  );
};

EventCardSmall.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  iconFill: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
EventCardSmall.defaultProps = {
  type: 'base',
  iconFill: null,
  className: '',
};

export default EventCardSmall;
