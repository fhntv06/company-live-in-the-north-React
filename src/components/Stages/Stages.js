import React from 'react';
import PropTypes from 'prop-types';
import { GradientLight } from '../../helpers/gradients';
import Icon from '../Icon/Icon';
import styles from './Stages.module.scss';

const Stages = ({
  stageNumber,
  className,
  stageName,
  isFinally,
  ...otherProps
}) => {
  const linearId = `stage-linear-${Math.random()}`;

  return (
    <div
      className={`
      ${styles.wrapper}
      ${isFinally ? styles.finally : ''}
      ${className}`}
      {...otherProps}
    >
      <span className={styles.stageNumber}>
        этап
        {' '}
        {stageNumber}
      </span>
      <span className={styles.stageName}>
        {stageName}
      </span>
      {isFinally ? (
        <Icon name="flag" stroke={`url(#${linearId})`} className={styles.flag}>
          {GradientLight(linearId, 13, 3, 3, 3)}
        </Icon>
      ) : (
        <Icon name="arrow-long" stroke={`url(#${linearId})`} className={styles.arrow}>
          {GradientLight(linearId, 26, 1, 0, 1)}
        </Icon>
      )}
    </div>
  );
};

Stages.propTypes = {
  className: PropTypes.string,
  stageNumber: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
  stageName: PropTypes.string.isRequired,
  isFinally: PropTypes.bool,
};
Stages.defaultProps = {
  className: '',
  isFinally: false,
};

export default Stages;
