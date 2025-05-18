import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './BasketLink.module.scss';

const BasketLink = ({ className, count }) => (
  <Link to="/cart" className={`${styles.link} ${className}`}>
    <Icon name="basket" />
    <span>
      {count}
    </span>
  </Link>
);

BasketLink.propTypes = {
  className: PropTypes.string,
  count: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  ),
};
BasketLink.defaultProps = {
  className: '',
  count: 0,
};

export default BasketLink;
