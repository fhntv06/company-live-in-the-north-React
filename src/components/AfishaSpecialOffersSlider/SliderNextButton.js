import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useSwiper } from 'swiper/react';
import Icon from '../Icon/Icon';
import styles from './SliderNextButton.module.scss';

// eslint-disable-next-line react/prop-types
const SliderNextButton = ({ contrast = false }) => {
  const swiper = useSwiper();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!swiper.destroyed && swiper.isEnd) {
      setHide(true);
    }
  }, []);

  useEffect(() => {
    if (!swiper.destroyed) {
      swiper.on('slideChange', (s) => {
        if (!s.isEnd) {
          setHide(false);
        }
      });
      swiper.on('reachEnd', () => {
        setHide(true);
      });
    }
  }, [swiper]);

  return (
    <button
      type="button"
      className={classnames(
        styles.button,
        {
          [styles.hide]: hide,
          [styles.contrast]: contrast,
        },
      )}
      onClick={() => swiper.slideNext()}
    >
      <Icon name="next" className={styles.icon} />
    </button>
  );
};

export default SliderNextButton;
