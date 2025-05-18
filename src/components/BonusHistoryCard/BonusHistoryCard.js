import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '../Icon/Icon';
import styles from './BonusHistoryCard.module.scss';

const BonusHistoryCard = ({
  data,
  className,
}) => (
  <div className={classnames(
    styles.card,
    className,
    { [styles.minus]: data.value < 0 },
  )}
  >
    <div className={styles.date}>
      {moment(data.createdAt).format('L')}
    </div>
    <div className={styles.name}>
      {data.name}
    </div>
    <div className={styles.calc}>
      <div className={styles.operand}>
        {data.value}
      </div>
      <div className={styles.balance}>
        <Icon name="coin" />
        <span>
          {data.balance}
        </span>
      </div>
    </div>
  </div>
);

BonusHistoryCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
    createdAt: PropTypes.string,
    value: PropTypes.number,
    balance: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
};

BonusHistoryCard.defaultProps = {
  className: '',
};

export default BonusHistoryCard;
