import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './OversizedLink.module.scss';

const OversizedLink = ({
  link,
  children,
  ...otherProps
}) => (
  <NavLink to={link} className={styles.link} {...otherProps}>
    {children}
  </NavLink>
);

OversizedLink.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node,
};

OversizedLink.defaultProps = {
  children: null,
};

export default OversizedLink;
