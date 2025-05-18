import React from 'react';
import { Link } from 'react-router-dom';
import { string, arrayOf } from 'prop-types';
import moment from 'moment';
import Icon from '../Icon/Icon';
import styles from './ResultCard.module.scss';
import ResultSplitImages from '../ResultSplitImages/ResultSplitImages';
import useGetLocation from '../../hooks/useGetLocation';

const ResultCard = ({
  data,
  className,
}) => {
  const {
    id,
    imageStart,
    imageEnd,
    createdAt,
    name,
    label,
    municipalityId,
  } = data;

  const year = moment(createdAt).format('YYYY');

  const municipality = municipalityId && useGetLocation(municipalityId);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {imageStart && imageEnd ? (
        <div className={styles.splitImages}>
          <ResultSplitImages
            firstImg={imageStart.url}
            secondImg={imageEnd.url}
            altTitles={[name, name]}
            className={styles.splitImages}
          />
        </div>
      ) : (
        <div className={styles.images}>
          {imageEnd && <img src={imageEnd.url} className={styles.firstImage} alt={name} />}
        </div>
      )}
      <Link to={`/results/${id}`} className={styles.title}>{name}</Link>
      <div className={styles.row}>
        {label && (
          <div className={styles.label}>
            <span>
              уютный ямал
            </span>
          </div>
        )}
        {municipality && (
        <div className={styles.location}>
          <Icon name="geo" className={styles.svg} />
          <span>
            {municipality}
          </span>
        </div>
        )}
        <div className={styles.date}>
          <span>
            Реализованно в
            {' '}
            {year}
          </span>
        </div>
      </div>
    </div>
  );
};

ResultCard.propTypes = {
  data: arrayOf().isRequired,
  className: string,
};
ResultCard.defaultProps = {
  className: '',
};

export default ResultCard;
