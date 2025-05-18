import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomMenuMobile.module.scss';

const BottomMenuItem = ({
  img, name, href, onClick, isAuth, user,
}) => {
  const location = useLocation();

  // eslint-disable-next-line consistent-return
  const userName = useMemo(() => (
    user && user.firstName && user.surname ? user.firstName[0] + user.surname[0] : ''
  ), [user]);

  const Wrapper = ({ children }) => {
    const buttonProps = { className: styles.button, onClick };

    const linkProps = {
      to: (name === 'Профиль' && !isAuth) ? '/sign-in' : href,
      className: `${styles.button} ${location.pathname === href ? styles.active : ''}`,
    };

    return (
      onClick ? <button type="button" {...buttonProps}>{children}</button> : <Link {...linkProps}>{children}</Link>
    );
  };
  Wrapper.propTypes = { children: PropTypes.node.isRequired };

  const isProfile = name === 'Профиль';
  const imageIcon = <div className={styles.icon}>{img}</div>;

  const imageStyle = { backgroundImage: `url(${user && user.avatar && user.avatar.url})` };

  return (
    <Wrapper>
      {isProfile && (
        <div className={`${styles.icon} ${isAuth ? styles.profile : ''}`} style={user && user.avatar && imageStyle}>
          {isAuth ? (
            <span>{!user.avatar && userName}</span>
          ) : (
            imageIcon
          )}
        </div>
      )}
      {!isProfile && (
        imageIcon
      )}
      <span className={styles.name}>
        {isProfile && !isAuth ? 'Войти' : name}
      </span>
    </Wrapper>
  );
};

BottomMenuItem.propTypes = {
  img: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isAuth: PropTypes.bool,
  user: PropTypes.arrayOf(),
};

BottomMenuItem.defaultProps = {
  href: null,
  onClick: null,
  isAuth: false,
  user: null,
};

export default BottomMenuItem;
