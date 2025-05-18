import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './InternalLink.module.scss';

const InternalLink = ({
  href,
  children,
  ...otherProps
}) => (
  <NavLink className={styles.link} to={href} {...otherProps}>
    {children}
  </NavLink>
);

InternalLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

InternalLink.defaultProps = {
  children: null,
  href: '',
};

export default InternalLink;
