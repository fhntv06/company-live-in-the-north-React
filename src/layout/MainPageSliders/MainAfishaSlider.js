import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import EventCard from '../../components/Event/EventCard/EventCard';
import styles from './MainAfishaSlider.module.scss';
import GridSlider from '../../components/Slider/GridSlider';

const MainAfishaSlider = ({ events }) => (
  <GridSlider>
    {events?.map((card, index) => (
      <EventCard
        type={index === 0 ? 'soon' : 'event'}
        variant={index === 0 ? 'soon' : 'actual'}
        className={classnames(
          styles.slide,
          { [styles.slide5col]: index === 0 },
        )}
        data={card}
      />
    ))}
  </GridSlider>
);

MainAfishaSlider.propTypes = {
  events: PropTypes.shape().isRequired,
};

export default MainAfishaSlider;
