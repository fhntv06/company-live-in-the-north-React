import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ResultCardSlider.module.scss';
import ResultCard from '../ResultCard/ResultCard';

const ResultCardSlider = ({ cardList, className }) => {
  const swiperRef = useRef(null);
  const checkSplit = (e) => {
    if (e.type === 'mousedown') e.preventDefault();
    swiperRef.current.allowTouchMove = !e.target.classList.contains('split');
  };

  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <div className={styles.sliderWrapper}>
        <Swiper
          speed={700}
          className={styles.swiper}
          touchStartPreventDefault={false}
          slidesPerGroup={2}
          slidesPerView={2}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: {
              slidesPerGroup: 1,
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerGroup: 1,
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            1050: {
              slidesPerGroup: 2,
              slidesPerView: 2,
              spaceBetween: 32,
            },
          }}
        >

          {cardList && cardList.length > 0 && cardList.map((item) => (
            <SwiperSlide
              key={item.id}
              className={styles.slide}
              onMouseDown={checkSplit}
              onTouchStart={checkSplit}
            >
              <ResultCard className={styles.card} data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

ResultCardSlider.propTypes = {
  className: PropTypes.string,
  cardList: PropTypes.arrayOf(
    PropTypes.shape({
      firstImg: PropTypes.string,
      secondImg: PropTypes.string,
      location: PropTypes.string,
      year: PropTypes.string,
      title: PropTypes.string,
      className: PropTypes.string,
      isSplit: PropTypes.bool,
      label: PropTypes.bool,
    }),
  ).isRequired,
};
ResultCardSlider.defaultProps = {
  className: '',
};

export default ResultCardSlider;
