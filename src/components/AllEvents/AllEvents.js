import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AllEvents.module.scss';
import Icon from '../Icon/Icon';
import { GradientLight } from '../../helpers/gradients';

const AllEvents = ({ href, text, className }) => (
  <Link to={href}>
    <div className={classnames(styles.container, className)}>
      <div className={styles.top}>
        <Icon name="arrow-all-events" stroke="url(#arrow-linear)">
          {GradientLight('arrow-linear', 46.8965, 41.8643, 1, 1)}
        </Icon>
        <Icon name="arrow-all-events" stroke="url(#hover-arrow-linear)">
          {GradientLight('hover-arrow-linear', 45.2269, 56.8962, 17.7762, 12.9174)}
        </Icon>
      </div>
      <div className={styles.bottom}>
        <span>{text}</span>
      </div>
    </div>
  </Link>
);

AllEvents.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

AllEvents.defaultProps = {
  text: 'Все\nсобытия',
  className: null,
};

export default AllEvents;
