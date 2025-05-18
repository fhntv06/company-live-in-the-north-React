import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon/Icon';
import styles from './ExpertsGrade.module.scss';

const ExpertsGrade = ({ count, className, ...otherProps }) => (
  <div className={`${styles.wrapper} ${className}`} {...otherProps}>
    <span>Оценка экспертов:</span>
    <Icon name="like" className={styles.svg} />
    <span>
      {count > 0 ? `+${count}` : count}
    </span>
  </div>
);

ExpertsGrade.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
};
ExpertsGrade.defaultProps = {
  className: '',
};

export default ExpertsGrade;
