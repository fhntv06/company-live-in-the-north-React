import React from 'react';
import PropTypes, {
  shape, string, number,
} from 'prop-types';
import classnames from 'classnames';
import plural from 'plural-ru';
import styles from './ReservedGift.module.scss';

const ReservedGift = ({
  className,
  data,
}) => {
  const statusClass = () => {
    switch (data.executorStatus.value) {
      case 2:
        return styles.accepted;
      case 3:
        return styles.rejected;
      case 4:
        return styles.delivered;
      case 5:
        return styles.completed;
      default:
        return styles.new;
    }
  };

  return (
    <div className={classnames(styles.gift, statusClass(), className)}>
      <div className={styles.giftNumber}>
        №
        {data.id}
      </div>
      <div className={styles.giftInfo}>
        {data.gift}
        {','}
        {' '}
        {data.childFirstName}
        {','}
        {' '}
        {data.age}
        {' '}
        {plural(data.age, 'год', 'года', 'лет')}
      </div>
      <div className={styles.status}>
        <span>
          {data.executorStatus.description}
        </span>
      </div>
      <div className={styles.municipality}>
        {data.municipalityName}
      </div>
    </div>
  );
};

ReservedGift.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    gift: PropTypes.string,
    childFirstName: PropTypes.string,
    age: PropTypes.number,
    municipalityName: PropTypes.string,
    executorStatus: shape({
      value: number.isRequired,
      description: string.isRequired,
    }),

  }).isRequired,
};

ReservedGift.defaultProps = {
  className: '',
};

export default ReservedGift;
