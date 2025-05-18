import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './ActivityTypeLabel.module.scss';

const TYPES = {
  discussion: 'Обсуждение',
  voting: 'Голосование',
};

const ActivityTypeLabel = ({
  type,
  className,
}) => (
  <div className={classnames(styles.wrapper, className)}>
    {TYPES[type]}
  </div>
);

ActivityTypeLabel.propTypes = {
  type: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

ActivityTypeLabel.defaultProps = {
  className: '',
};

export default ActivityTypeLabel;
