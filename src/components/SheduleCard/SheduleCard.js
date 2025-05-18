import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import TagMark from '../Tags/Tag';
import TickerPrice from '../TickerPrice/TickerPrice';
import SocialIconList from '../SocialIconsList/SocialIconsList';
import MapContainer from '../MapContainer/MapContainer';
import Button from '../Button/Button';

import { GradientViolet } from '../../helpers/gradients';
import useMediaQuery from '../../hooks/useMediaQuery';

import styles from './SheduleCard.module.scss';
import { getIsAuth } from '../../features/Auth/authSlice';
import { useTogglePlaceFavoriteMutation } from '../../services/profileApi';
import useToggleFavorite from '../../hooks/useToggleFavorite';

const SheduleCard = ({
  data,
  price,
  className,
  openMap,
  setOpenMap,
  alwaysOpen,
  selectDay,
}) => {
  const [togglePlaceFavorite] = useTogglePlaceFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    data.id,
    'places',
    togglePlaceFavorite,
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const onClick = () => {
    if (!openMap) {
      setOpenMap(true);
    } else {
      navigate(`/afisha/place/${data.id}`);
    }
  };

  const session = useMemo(() => {
    if (!data.sessions) {
      return null;
    }

    const foundDate = data.sessions.find((item) => {
      if (selectDay) {
        if (item.dayOfWeek && item.dayOfWeek === selectDay.getDay()) {
          return item;
        }

        if (item.dateEvent === moment(selectDay).format('DD.MM.YY')) {
          return item;
        }
      }

      return false;
    });

    return foundDate;
  }, [selectDay]);

  const links = useMemo(() => ({
    webLinks: [data.siteLink, data.rtLink].map((link) => {
      if (!link || !link.length) return null;
      return {
        name: link.replace(/^https?:\/\/|\/$/g, ''),
        link,
      };
    }),
    social: [
      {
        url: data.tgLink,
        title: data.tgLink,
        name: data.tgLink ? 'telegram-social' : null,
      },
      {
        url: data.vkLink ?? null,
        title: data.vkLink ?? null,
        name: data.vkLink ? 'vkontakte-social' : null,
      },
      {
        url: data.okLink,
        title: data.okLink,
        name: data.okLink ? 'odnoklassniki-social' : null,
      },
    ],
  }), [data]);

  return (
    <div className={classnames(
      styles.card,
      { [styles.cardWithMap]: openMap },
      { [styles.notAuth]: !isAuth },
      className,
    )}
    >
      {openMap || alwaysOpen
        ? (
          <div className={styles.map}>
            {
            !alwaysOpen
            && (
              <div className={styles.close}>
                <Button typeButton="button-close" onClick={() => { setOpenMap(false); }} />
              </div>
            )
          }
            <MapContainer
              mapCoord={`${data.latitude}, ${data.longitude}`}
              placemarkCoords={[`${data.latitude}, ${data.longitude}`]}
            />
          </div>
        ) : ''}
      <div className={styles.content}>
        <div className={styles.columnName}>
          {isAuth && (
            <Button
              typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
              onClick={() => {
                toggleFavoriteHandler(data.id);
              }}
              iconProps={{ stroke: `url(#${data.id})` }}
              className={styles.booksmarkBtn}
              gradient={GradientViolet(String(data.id), 12.8696, 3.32598, 0.999995, 0.999995)}
            />
          )}
          <div className={styles.name}>
            <button type="button" onClick={onClick} disabled={pathname.split('/').includes('place')}>
              {data.name}
            </button>
            {!openMap && !alwaysOpen ? (
              <div className={styles.location}>
                {data.address}
              </div>
            ) : ''}
          </div>
        </div>
        {openMap || alwaysOpen ? (
          <>
            <div className={styles.contacts}>
              <span className={styles.location}>
                {data.address}
              </span>
              {data.phoneNumber && (
              <a className={styles.phone} href={`tel:${data.phoneNumber.replace(/[\s.,%,(),-]/g, '')}`}>
                {data.phoneNumber}
              </a>
              )}
            </div>
            <div className={styles.social}>
              <div className={styles.webLinks}>
                {
                  links.webLinks.length > 0
                  && (
                    links.webLinks.map((link) => link && (
                      <a className={styles.webLink} href={link.link} rel="noreferrer" target="_blank">
                        {link.name}
                      </a>
                    ))
                  )
                }
              </div>
              <SocialIconList links={links.social} className={styles.socialList} />
            </div>
          </>
        ) : (
          session && (
            <>
              {session.timeStart && session.timeStart !== '00:00' && (
                <div className={styles.times}>
                  <TagMark type="time" className={styles.time}>
                    <span>{session.timeStart}</span>
                  </TagMark>
                </div>
              )}
              {data.eventPlaces[0].ticketLink && (
                <div className={styles.tickerPriceWrapper}>
                  <TickerPrice
                    price={isMobile ? price : null}
                    href={data.eventPlaces[0].ticketLink}
                    className={styles.tickerPrice}
                  />
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

SheduleCard.propTypes = {
  data: PropTypes.shape().isRequired,
  price: PropTypes.number,
  className: PropTypes.string,
  openMap: PropTypes.bool,
  setOpenMap: PropTypes.func,
  alwaysOpen: PropTypes.bool,
  selectDay: PropTypes.shape().isRequired,
};
SheduleCard.defaultProps = {
  price: null,
  className: '',
  openMap: false,
  setOpenMap: '',
  alwaysOpen: false,
};

export default SheduleCard;
