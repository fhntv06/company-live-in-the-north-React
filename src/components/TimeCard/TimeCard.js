import React, { useRef, useMemo, useEffect } from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import parser from 'html-react-parser';
import parseDate from '../../helpers/parseDate';
import styles from './TimeCard.module.scss';

const TimeCard = ({
  text,
  type,
  fromDate,
  toDate,
  size,
  timeClassName,
  cozyYamal,
  className,
}) => {
  const ref = useRef(null);
  const monthRef = useRef(null);

  useEffect(() => {
    const getContainerWidth = () => {
      const { width } = ref.current.getBoundingClientRect();
      monthRef.current.style.setProperty('--time-card-width', `${width}px`);
    };
    getContainerWidth();
    window.addEventListener('resize', getContainerWidth);
    return () => {
      window.removeEventListener('resize', getContainerWidth);
    };
  }, []);

  const classFirst = useMemo(() => type === 'firstdate' && styles.firstdate, [type]);

  const classNamesDate = classNames(
    styles.container,
    className,
    {
      [styles.thin]: size === 'thin' && !cozyYamal,
      [styles.thick]: size === 'thick',
      [styles.cozyYamal]: cozyYamal,
    },
    'time-card',
  );

  const [date, month] = fromDate ? parseDate(fromDate, toDate) : [];

  return (
    <div className={classNamesDate}>
      {text && <div className={styles.text}>{parser(text)}</div>}
      <div className={`${styles.time} ${timeClassName} ${classFirst || ''}`}>
        <div ref={ref} className={styles.date}>
          {date}
          &nbsp;
        </div>
        <div ref={monthRef} className={styles.month}>{month}</div>
      </div>
    </div>
  );
};

TimeCard.propTypes = {
  fromDate: string,
  toDate: string,
  type: string,
  text: string,
  size: string,
  timeClassName: string,
  className: string,
  cozyYamal: bool,
};

TimeCard.defaultProps = {
  fromDate: '',
  toDate: '',
  type: '',
  text: '',
  size: 'thin',
  timeClassName: '',
  className: '',
  cozyYamal: false,
};

export default TimeCard;
