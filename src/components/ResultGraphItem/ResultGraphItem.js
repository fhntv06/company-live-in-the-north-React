import React, { useMemo } from 'react';
import { string, arrayOf, bool } from 'prop-types';
import classNames from 'classnames';
import { useSwiperSlide } from 'swiper/react';
import styles from './ResultGraphItem.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import { resultTypes } from '../../services/resultsApi';
import { normalizeCost } from '../../helpers/format';

const ResultGraphItem = ({ data, className, byCities }) => {
  const isMobileSmall = useMediaQuery('(max-width: 767px)');
  const { isActive } = useSwiperSlide();

  const sizes = useMemo(() => ({
    top: Math.cbrt(data.data[0]) * 3,
    bottom: Math.cbrt(data.data[1]) * 3,
  }), [data]);

  const classNamesCard = classNames(
    styles.card,
    className,
    {
      // [styles.withLabel]: hasLabel,
      [styles.isActive]: isActive && isMobileSmall,
      [styles[data.type]]: data.type !== 'votingsCount',
    },
  );

  return (
    <div className={classNamesCard}>
      <div className={styles.row}>
        <div className={styles.title}>
          {resultTypes[data.type]}
        </div>
        {/* {hasLabel && ( */}
        {/*  <div className={styles.label}> */}
        {/*    <span> */}
        {/*      уютный ямал */}
        {/*    </span> */}
        {/*  </div> */}
        {/* )} */}
      </div>
      <div className={styles.graph}>
        <div className={styles.top}>
          <div className={styles.votes}>
            {normalizeCost(data.data[0])}
          </div>
          <div className={styles.graphLine} style={{ maxHeight: sizes.top || 0 }} />
          <div className={styles.middleLine} />
        </div>
        <div className={styles.bottom}>
          <div
            // className={`${styles.graphLine} ${isLocal && styles.graphLineLocal}`}
            className={classNames(styles.graphLine, { [styles.byCities]: byCities })}
            style={{ maxHeight: sizes.bottom || 0 }}
          />
          <div className={styles.votes}>
            {normalizeCost(data.data[1])}
          </div>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
};

ResultGraphItem.propTypes = {
  data: arrayOf().isRequired,
  className: string,
  byCities: bool,
};
ResultGraphItem.defaultProps = {
  className: '',
  byCities: false,
};

export default ResultGraphItem;
