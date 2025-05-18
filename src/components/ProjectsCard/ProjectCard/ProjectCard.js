import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import projectParseDate from '../projectParseDate';
import styles from './ProjectCard.module.scss';

const ProjectCard = ({ data, className }) => {
  const [projectDate, setProjectDate] = useState();
  useEffect(() => {
    if (data && (data.startDate || data.endDate)) {
      setProjectDate(projectParseDate(data.startDate, data.endDate));
    }
  }, [data]);

  return (
    <Link
      target={data.newWindow && '_blank'}
      rel={data.newWindow && 'noopener noreferrer'}
      className={classNames(styles.wrapper, styles.card, className)}
      to={data?.link}
    >
      {data?.monthStart && (
        <div className={styles.time}>
          <div className={styles.months}>
            {projectDate?.monthFrom}
              &nbsp;—
            {projectDate?.monthTo}
          </div>
          <span className={styles.year}>
            {projectDate?.yearFrom === projectDate?.yearTo
              ? projectDate?.yearFrom
              : `${projectDate?.yearFrom}&nbsp;—${projectDate?.yearTo}`}
          </span>
        </div>
      )}
      {data && !data.monthStart && (data && data.image)
      && (
      <div
        className={styles.img_container}
        style={{ backgroundImage: `url(${data?.image.url})` }}
      />
      )}
      <div className={styles.info}>
        <div className={styles.text}>
          <h5 className={styles.title}>{data?.name}</h5>
          <p className={styles.description}>{data?.description}</p>
        </div>
        {data?.newWindow && (
          <div className={styles.ico_container}>
            <Icon name="card-link" className={styles.svg} />
          </div>
        )}
      </div>
    </Link>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

ProjectCard.defaultProps = {
  className: '',
};

export default ProjectCard;
