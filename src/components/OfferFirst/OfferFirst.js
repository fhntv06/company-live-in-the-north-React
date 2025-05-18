import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import TimeCard from '../TimeCard/TimeCard';
import styles from './OfferFirst.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';

const OfferFirst = ({
  data,
  type,
  to,
  className,
  ...otherProps
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Link
      to={to}
      className={classnames(
        styles.container,
        className,
      )}
      {...otherProps}
    >
      {data.dateStartText && (
        <div className={classnames(
          styles.time,
          { [styles.hidden]: isMobile && data.image },
        )}
        >
          <TimeCard
            className={styles.timecard}
            timeClassName={styles.timecardDate}
            fromDate={data.dateStartText}
            toDate={data.dateEndText}
          />
        </div>
      )}
      {(data.image || (isMobile && data.image && !data.dateStartText)) && <div className={styles.image} style={{ backgroundImage: `url(${data.image.url})` }} />}
      <div
        className={
          classnames(
            styles.content,
            { [styles[type]]: type },
          )
        }
      >
        <p className={styles.title}>{data.name}</p>
        <p className={styles.description}>{parse(data.description)}</p>
      </div>
    </Link>
  );
};

OfferFirst.propTypes = {
  data: PropTypes.shape().isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
};

OfferFirst.defaultProps = {
  type: null,
  className: '',
  to: '#',
};

export default OfferFirst;
