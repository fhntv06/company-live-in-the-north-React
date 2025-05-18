import React from 'react';
import {
  number,
  bool,
  string,
  shape,
} from 'prop-types';
import classNames from 'classnames';
import parser from 'html-react-parser';
import parseDate from '../../../helpers/parseDate';
import styles from './DiscussionDate.module.scss';

const formingText = (type, archive, step) => (
  `${archive ? (type === 'discussion'
    ? 'Обсуждение<br />завершено'
    : 'Голосование<br />завершено')
    : type === 'discussion' ? (step.value === 3 ? 'Ждём<br />идей&nbsp;до' : 'Старт<br />приёма идей')
      : (step.value === 3 ? 'Идёт<br />голосование' : 'Старт<br />голосования')}`
);

const DiscussionDate = ({
  type,
  fromDate,
  toDate,
  changeView,
  archive,
  step,
}) => {
  const classNameDate = classNames(
    styles.date,
    { [styles.enter]: changeView },
    { [styles.archive]: archive },
  );
  const [date, month] = fromDate ? parseDate(fromDate, toDate) : [];

  return (
    <div className={classNameDate}>
      <div className={styles.dateInfo}>{parser(formingText(type, archive, step))}</div>
      <div className={styles.enterView}>
        {!archive && <div className={styles.datePrefix}>{step.value === 3 ? 'до' : 'c'}</div>}
        <div className={styles.day}>
          {date}
          &nbsp;
        </div>
        <div className={styles.month}>{month}</div>
      </div>
    </div>
  );
};

DiscussionDate.propTypes = {
  type: string.isRequired,
  fromDate: number.isRequired,
  toDate: number,
  changeView: bool,
  archive: bool,
  step: shape({}),
};
DiscussionDate.defaultProps = {
  changeView: false,
  toDate: null,
  archive: false,
  step: {
    value: 3,
  },
};

export default DiscussionDate;
