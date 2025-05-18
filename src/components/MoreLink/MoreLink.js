import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './MoreLink.module.scss';

const MoreLink = ({
  isOpen,
  children,
  ...otherProps
}) => (
  <button type="button" className={`${styles.button} ${isOpen ? styles.open : ''}`} {...otherProps}>
    {children}
    <Icon name="chevron" className={styles.icon} />
  </button>
);

MoreLink.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

MoreLink.defaultProps = {
  children: null,
  isOpen: false,
};

export default MoreLink;
