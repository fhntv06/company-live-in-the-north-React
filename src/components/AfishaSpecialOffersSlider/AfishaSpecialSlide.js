import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// import classnames from 'classnames';

import { useSwiper } from 'swiper/react';

// import styles from './AfishaSpecialOffersSlider.module.scss';

const AfishaSpecialSlide = ({
  isPrev, children,
}) => {
  const ref = useRef(null);
  const swiper = useSwiper();

  useEffect(() => {
    const el = ref.current;

    const handler = () => {
      if (window.innerWidth > 1024) {
        window.requestAnimationFrame(() => {
          const { right, left } = el.getBoundingClientRect();
          if (right >= window.innerWidth || left < 0) {
            el.classList.add('slide-not-visible');
          } else if ((right <= window.innerWidth || left >= 0) && el.classList.contains('slide-not-visible')) {
            el.classList.remove('slide-not-visible');
          }
        });
      }
    };

    handler();
    swiper.on('slideChangeTransitionEnd', handler);
    swiper.on('slideChange', handler);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [swiper]);

  const onClickHandler = () => {
    if (!isPrev) return;

    swiper.slidePrev();
  };

  return (
    // eslint-disable-next-line
    <div
      ref={ref}
      // className={classnames(
      //   {
      //     [styles.isPrev]: isPrev,
      //     [styles.slideWrapper]: !mask,
      //     [styles.slideWrapperMasked]: mask,
      //   },
      //   className,
      // )}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};

AfishaSpecialSlide.propTypes = {
  isPrev: PropTypes.bool,
  children: PropTypes.node,
  // mask: PropTypes.bool,
  // className: PropTypes.string,
};

AfishaSpecialSlide.defaultProps = {
  isPrev: false,
  children: null,
  // mask: false,
  // className: '',
};

export default AfishaSpecialSlide;
