import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './ProfileTile.module.scss';

const ProfileTile = ({
  children,
  tileName,
  title,
  additionalText,
  additionalTextHide,
  to,
  icon,
  gray,
  className,
}) => (
  <Link
    className={classnames(
      styles.wrapper,
      {
        [styles.gray]: gray,
        [styles.favoriteTileWrapper]: to === 'favorites',
      },
      className,
    )}
    to={to}
  >
    <div className={styles.contentWrapper}>
      {tileName && (
        <p className={styles.title}>{tileName}</p>
      )}
      <div className={styles.content}>
        {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
        )}
        <p
          className={classnames(
            styles.text,
            { [styles.small]: !additionalText },
          )}
        >
          {title}
        </p>
      </div>
      {additionalText && !additionalTextHide && (
        <p className={styles.additionalText}>
          {additionalText}
        </p>
      )}
    </div>
    <div>
      {children}
    </div>
  </Link>
);

ProfileTile.propTypes = {
  children: PropTypes.node,
  tileName: PropTypes.string,
  title: PropTypes.string,
  additionalText: PropTypes.number,
  additionalTextHide: PropTypes.bool,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node,
  gray: PropTypes.bool,
  className: PropTypes.string,
};

ProfileTile.defaultProps = {
  className: '',
  tileName: '',
  title: '',
  children: null,
  icon: null,
  gray: false,
  additionalText: '',
  additionalTextHide: false,
};

export default ProfileTile;
