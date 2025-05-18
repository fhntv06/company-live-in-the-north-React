import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../ProductCard/ProductCard';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';
import styles from './SliderShop.module.scss';
import AfishaSpecialSlide from '../AfishaSpecialOffersSlider/AfishaSpecialSlide';

const SliderShop = ({ className, products, title }) => {
  const swiperRef = useRef(null);
  const allProducts = products;

  const toggleSlideNextAllowance = (swiper) => {
    const lastSlide = swiper.slides[swiper.slides.length - 1];
    const { right } = lastSlide.getBoundingClientRect();
    if (right < window.innerWidth) {
      swiper.allowSlideNext = false;
    } else {
      swiper.allowSlideNext = true;
    }
  };

  return (
    <VisibleWrapper overflow roundCorners className={`${styles.sliderContainer} ${className}`}>
      <p className={styles.title}>{title}</p>
      <div className={styles.sliderWrapper}>
        <Swiper
          speed={700}
          className={styles.swiper}
          spaceBetween={8}
          loop={false}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
            },
            1023: {
              slidesPerView: 2.8,
            },
            1024: {
              slidesPerView: 3.8,
            },
            1280: {
              slidesPerView: 4.8,
            },
          }}
          watchSlidesProgress
          observer
          observeParents
          onSnapGridLengthChange={(swiper) => {
            if (swiper.snapGrid.length > swiper.slidesGrid.length) {
              swiper.snapGrid = swiper.slidesGrid.slice(0);
            }
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            toggleSlideNextAllowance(swiper);
          }}

        >
          {allProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className={styles.slide}
            >
              { ({ isPrev }) => (
                <AfishaSpecialSlide className={styles.slideWrapper} isPrev={isPrev} mask>
                  <ProductCard product={product} className={styles.card} />
                </AfishaSpecialSlide>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </VisibleWrapper>
  );
};

SliderShop.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  products: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    amount: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
  }).isRequired,
};

SliderShop.defaultProps = {
  className: '',
  title: '',
};

export default SliderShop;
