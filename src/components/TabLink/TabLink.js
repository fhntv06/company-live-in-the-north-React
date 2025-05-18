import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabLink.module.scss';

const TabLink = ({
  children,
  ...otherProps
}) => (
  <button type="button" className={styles.button} {...otherProps}>
    {children}
  </button>
);

TabLink.propTypes = {
  children: PropTypes.node,
};

TabLink.defaultProps = {
  children: null,
};

export default TabLink;
