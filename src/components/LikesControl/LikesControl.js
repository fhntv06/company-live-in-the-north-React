import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './LikesControl.module.scss';

const LikesControl = ({
  count, onLike, onDislike, className, voted,
}) => (
  <div className={`${styles.container} ${className}`}>
    <button type="button" className={styles.button} onClick={onDislike} disabled={voted === 'dislike'}>
      <Icon name="dislike" className={styles.svg} />
    </button>
    <div className={styles.count}>{count > 0 ? `+${count}` : count}</div>
    <button type="button" className={styles.button} onClick={onLike} disabled={voted === 'like'}>
      <Icon name="like" className={styles.svg} />
    </button>
  </div>
);

LikesControl.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  voted: PropTypes.string,
  className: PropTypes.string,
};
LikesControl.defaultProps = {
  className: '',
  voted: null,
};

export default LikesControl;
