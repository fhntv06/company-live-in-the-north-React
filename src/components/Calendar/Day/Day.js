import React, { forwardRef } from 'react';
import { number, string, node } from 'prop-types';
import styles from './Day.module.scss';
import { weekDays } from '../../../helpers/timeValues';

const Day = forwardRef(({
  date,
  type,
  day,
  children,
  className,
  ...otherProps
}, ref) => {
  let typeStyle = '';
  switch (type) {
    case 'disabled':
      typeStyle = styles.disabled;
      break;

    case 'red':
      typeStyle = styles.red;
      break;

    case 'selected':
      typeStyle = 'is-select';
      break;
  }

  return (
    <div ref={ref} className={`${styles.container} ${className} ${typeStyle}`} {...otherProps}>
      <div className={styles.children}>
        {children}
      </div>
      <span className={styles.date}>
        {date}
      </span>
      {typeof day === 'number' && (
        <span className={styles.day}>
          {weekDays[day]}
        </span>
      )}
    </div>
  );
});

Day.propTypes = {
  date: number.isRequired,
  type: string.isRequired,
  day: number,
  children: node,
  className: string,
};

Day.defaultProps = {
  day: null,
  children: null,
  className: '',
};

export default Day;
