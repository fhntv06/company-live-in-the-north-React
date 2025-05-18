import React from 'react';
import PropTypes from 'prop-types';
import EventCardSmall from '../Event/EventCardSmall/EventCardSmall';
import styles from './AfishaOtherEventsSlider.module.scss';
import GridSlider from '../Slider/GridSlider';
import useMediaQuery from '../../hooks/useMediaQuery';

const AfishaOtherEventsSlider = ({ data }) => {
  const noMobile = useMediaQuery('(min-width: 767px)');

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} h1`}>смотрите также</h2>
      <GridSlider
        withoutButton
        withoutIndents={noMobile}
        hiddenSlidesIsOpacity
        className={styles.slider}
      >
        {data.map((card) => (
          <EventCardSmall
            data={card}
            className={styles.slide}
          />
        ))}
      </GridSlider>
    </div>
  );
};

AfishaOtherEventsSlider.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default AfishaOtherEventsSlider;
