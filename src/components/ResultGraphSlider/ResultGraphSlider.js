import React, { useRef } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  string,
  bool,
  number,
  oneOfType,
  shape,
  arrayOf,
} from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './ResultGraphSlider.module.scss';
import ResultGraphItem from '../ResultGraphItem/ResultGraphItem';

const max = 10 ** 5;

const ResultGraphSlider = ({
  className,
  topValues,
  bottomValues,
  data,
  byCities,
}) => {
  const containerRef = useRef(null);

  const onTransitionEnd = (swiper) => {
    swiper.slides.forEach((slide) => {
      if (slide.getBoundingClientRect().right > document.body.offsetWidth) {
        slide.classList.add(styles.hide);
      } else {
        slide.classList.remove(styles.hide);
      }
    });
    swiper.el.classList.remove(styles.disabled);
  };

  const onTransitionStart = (swiper) => {
    swiper.el.classList.add(styles.disabled);
    swiper.slides.forEach((slide) => {
      slide.classList.remove(styles.hide);
    });
  };

  const onInit = (swiper, init) => {
    const onClick = (e) => {
      e.preventDefault();
      if (e.target.closest(`.${styles.slide}`).classList.contains(styles.hide)) {
        swiper.slideNext(700);
      }
    };

    if (init) {
      swiper.slides.forEach((slide) => {
        slide.addEventListener('click', onClick);
      });
    } else {
      swiper.slides.forEach((slide) => {
        slide.removeEventListener('click', onClick);
      });
    }
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={bottomValues}
        classNames="fadeIn"
        nodeRef={containerRef}
        timeout={200}
      >
        <div className={`${styles.container} ${className}`} ref={containerRef}>
          <div className={styles.info}>
            <div className={styles.topValues}>
              {topValues}
            </div>
            <div className={styles.bottomValues}>
              {bottomValues}
            </div>
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderWrapper}>
              <Swiper
                modules={[Navigation]}
                onInit={(swiper) => {
                  onInit(swiper, true);
                  onTransitionEnd(swiper);
                }}
                onDestroy={(swiper) => {
                  onInit(swiper, false);
                }}
                onSlideChangeTransitionEnd={onTransitionEnd}
                onSlideChangeTransitionStart={onTransitionStart}
                spaceBetween={0}
                slidesPerView="auto"
                speed={700}
                className={styles.swiper}
                breakpoints={{
                  320: {
                    slidesPerGroup: 1,
                  },
                  768: {
                    slidesPerGroup: 2,
                  },
                  1050: {
                    slidesPerGroup: 3,
                  },
                }}
              >
                {data.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className={
                      classNames(styles.slide, { [styles.slideBig]: item.votesAll >= max })
                    }
                  >
                    <ResultGraphItem
                      className={styles.card}
                      data={item}
                      byCities={byCities}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

ResultGraphSlider.propTypes = {
  className: string,
  topValues: string.isRequired,
  bottomValues: string.isRequired,
  data: arrayOf(
    shape({
      id: oneOfType([string, number]),
      title: string,
      votesAll: oneOfType([string, number]),
      votes: oneOfType([string, number]),
      isLocal: bool,
      hasLabel: bool,
      className: string,
    }),
  ).isRequired,
  byCities: bool,
};
ResultGraphSlider.defaultProps = {
  className: '',
  byCities: false,
};

export default ResultGraphSlider;
