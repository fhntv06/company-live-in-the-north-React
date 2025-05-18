import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SocialIconsList from '../SocialIconsList/SocialIconsList';
import styles from './PlaceCard.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useTogglePlaceFavoriteMutation } from '../../services/profileApi';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import { getIsAuth } from '../../features/Auth/authSlice';

const PlaceCard = ({
  data, link, withoutMark, withoutLink, className,
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

  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const socialLinks = useMemo(() => ([
    { name: 'telegram-social', url: data.tgLink, title: data.tgLink },
    { name: 'vkontakte-social', url: data.vkLink, title: data.vkLink },
    { name: 'odnoklassniki-social', url: data.okLink, title: data.okLink },
    { name: 'tik-tok-social', url: data.ttLink, title: data.ttLink },
  ]), []);

  const renderBookmarkButton = () => (
    <Button
      typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
      onClick={() => {
        toggleFavoriteHandler(data.id);
      }}
      className={classnames(
        styles.booksmark,
        {
          [styles.booksmarkMobile]: isMobile,
        },
      )}
    />
  );

  return (
    <div className={classnames(styles.card, className,
      {
        [styles.withoutImage]: !data.image,
      })}
    >
      <div className={styles.top}>
        {data.image && <img src={data.image.url} alt={data.name} />}
        {!isMobile && !withoutMark && isAuth && renderBookmarkButton()}
      </div>
      <div className={styles.bottom}>
        <Link
          className={classnames(
            styles.title,
            { [styles.withoutLink]: withoutLink },
          )}
          to={link}
        >
          {data.name}
        </Link>
        {
        data.location
        && (
          <div className={styles.location}>
            <Icon name="geo" />
            {data.location}
          </div>
        )
      }
        {
        data.siteLink
        && (
          <a className={styles.link} href={data.siteLink} target="_blank" rel="noreferrer">
            {data.siteLink}
          </a>
        )
      }
        <SocialIconsList
          className={styles.linkIcons}
          links={socialLinks}
        />
      </div>
      {isMobile && !withoutMark && renderBookmarkButton()}
    </div>
  );
};

PlaceCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  link: PropTypes.string.isRequired,
  withoutMark: PropTypes.bool,
  withoutLink: PropTypes.bool,
};

PlaceCard.defaultProps = {
  className: '',
  withoutMark: false,
  withoutLink: false,
};

export default PlaceCard;
