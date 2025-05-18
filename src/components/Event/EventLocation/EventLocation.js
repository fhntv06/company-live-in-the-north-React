import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon/Icon';
import styles from './EventLocation.module.scss';

const EventLocation = ({
  children,
  ...otherProps
}) => (
  <button type="button" className={styles.button} {...otherProps}>
    <Icon name="location" className={styles.icon} />
    {children}
  </button>
);

EventLocation.propTypes = {
  children: PropTypes.node,
};

EventLocation.defaultProps = {
  children: null,
};

export default EventLocation;
