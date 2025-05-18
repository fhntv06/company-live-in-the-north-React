import React, { useMemo } from 'react';
import classNames from 'classnames';
import htmlParser from 'html-react-parser';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '../../../components/Icon/Icon';
import styles from './CozyYamalSlider.module.scss';
import GridSlider from '../../../components/Slider/GridSlider';

const CozyYamalSlider = ({ steps }) => {
  const sortedSteps = useMemo(() => [...steps].sort((a, b) => a.priority - b.priority), [steps]);

  return (
    <div className={styles.wrapperSlider}>
      <GridSlider
        withoutMask
        withoutIndents
        className={styles.container}
        contrast
      >
        {sortedSteps.map((step) => (
          <div
            key={step.id}
            className={classNames(
              styles.slide,
              styles.background,
              {
                [styles.mask]: moment(step.dateEnd).isAfter(moment()) && step.status.value !== 1,
                [styles.active]: step.status.value === 1,
              },
            )}
          >
            <div className={styles.slideHeader}>
              <div className={styles.date}>
                {step.dateStart && moment(step.dateStart).format('DD MMMM')}
                {' '}
                {step.dateEnd && (`- ${step.dateEnd && moment(step.dateEnd).format('DD MMMM')}`)}
              </div>
              <Icon className={styles.icon} name="arrow-horizontal" />
            </div>
            <div className={styles.step}>{step.priority}</div>
            <div className={styles.description}>{htmlParser(step.name)}</div>
          </div>
        ))}
      </GridSlider>
    </div>
  );
};

CozyYamalSlider.propTypes = {
  steps: PropTypes.arrayOf().isRequired,
};

export default CozyYamalSlider;
