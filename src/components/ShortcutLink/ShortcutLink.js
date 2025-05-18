import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { GradientViolet } from '../../helpers/gradients';
import styles from './ShortcutLink.module.scss';

const ShortcutLink = ({
  link,
  children,
  ...otherProps
}) => (
  <NavLink to={link} className={styles.link} {...otherProps}>
    <Icon name="booksmark" className={styles.icon} stroke="url(#shortcut-link)">
      {GradientViolet('shortcut-link', 12.8696, 3.32598, 0.999995, 0.999995)}
      {children}
    </Icon>
  </NavLink>
);

ShortcutLink.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ShortcutLink.defaultProps = {
  children: null,
};

export default ShortcutLink;
