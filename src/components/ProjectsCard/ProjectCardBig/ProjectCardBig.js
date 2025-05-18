import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import projectParseDate from '../projectParseDate';
import styles from './ProjectCardBig.module.scss';

const ProjectCardBig = ({ data, className }) => {
  const [projectDate, setProjectDate] = useState();
  useEffect(() => {
    if (data && (data.startDate || data.endDate)) {
      setProjectDate(projectParseDate(data.startDate, data.endDate));
    }
  }, [data]);

  return (
    <Link
      className={classNames(
        styles.wrapper,
        className,
      )}
      to={data?.link}
    >
      <div className={styles.time}>
        <div className={styles.months}>
          {projectDate?.monthFrom}
        &nbsp;—
          <br />
          {projectDate?.monthTo}
        </div>
        <div className={styles.year}>
          {projectDate?.yearFrom === projectDate?.yearTo ? projectDate?.yearFrom : `${projectDate?.yearFrom}&nbsp;—${projectDate?.yearTo}`}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.background}>
          <img src={data?.image.url} alt={data?.name} />
        </div>
        <h4 className={styles.title}>{data?.name}</h4>
        <p className={styles.description}>{data?.description}</p>
      </div>
    </Link>
  );
};

ProjectCardBig.propTypes = {
  data: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

ProjectCardBig.defaultProps = {
  className: '',
};

export default ProjectCardBig;
