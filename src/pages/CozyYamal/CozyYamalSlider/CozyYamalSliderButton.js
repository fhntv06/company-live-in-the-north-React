import React from 'react';
import PropTypes from 'prop-types';

import { useSwiper } from 'swiper/react';

import classnames from 'classnames';
import Icon from '../../../components/Icon/Icon';
import styles from './CozyYamalSliderButton.module.scss';

const CozyYamalSliderButton = ({ prev }) => {
  const swiper = useSwiper();

  const classes = classnames(
    styles.btn,
    { [styles.prev]: prev },
  );

  const clickHandler = () => {
    if (prev) {
      swiper.slidePrev();
      return;
    }

    swiper.slideNext();
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={clickHandler}
    >
      <Icon name="next" className={styles.icon} />
    </button>
  );
};

CozyYamalSliderButton.propTypes = {
  prev: PropTypes.bool,
};

CozyYamalSliderButton.defaultProps = {
  prev: false,
};

export default CozyYamalSliderButton;
