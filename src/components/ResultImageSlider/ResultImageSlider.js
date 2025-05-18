import React, {
  useRef, useLayoutEffect, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import styles from './ResultImageSlider.module.scss';
import ResultSplitImages from '../ResultSplitImages/ResultSplitImages';

const ResultImageSlider = ({ className, splitImages, images }) => {
  const swiperRef = useRef(null);
  const splitImagesContainerRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useLayoutEffect(() => {
    if (splitImagesContainerRef && splitImagesContainerRef.current) {
      setImgWidth(splitImagesContainerRef.current.offsetWidth);
      setImgHeight(splitImagesContainerRef.current.offsetHeight);
    }
  }, [screenSize]);

  const updateDimension = useCallback(() => {
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    });
  }, []);

  const checkSplit = (e) => {
    if (e.type === 'mousedown') e.preventDefault();
    swiperRef.current.allowTouchMove = !e.target.classList.contains('split');
  };

  return (
    <Swiper
      speed={700}
      className={classnames(styles.swiper, className)}
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
      {splitImages && splitImages.length > 0 && (
      <SwiperSlide
        className={styles.slide}
        onMouseDown={checkSplit}
        onTouchStart={checkSplit}
      >
        {((splitImages[0] && splitImages[0].url) && (splitImages[1] && splitImages[1].url)) ? (
          <div
            ref={splitImagesContainerRef}
          >
            <ResultSplitImages
              firstImg={splitImages[0] && splitImages[0].url}
              secondImg={splitImages[1] && splitImages[1].url}
              altTitles={
              [splitImages[0] && splitImages[0].aggregateType,
                splitImages[1] && splitImages[1].aggregateType]
}
              className={styles.sliderItem}
            />
          </div>
        ) : (
          <div className={classnames(
            styles.sliderItem,
            styles.sliderImageItem,
          )}
          >
            <img
              src={(splitImages[0] && splitImages[0].url) || (splitImages[1] && splitImages[1].url)}
              alt={(splitImages[0] && splitImages[0].aggregateType)
                || (splitImages[1] && splitImages[1].aggregateType)}
              width={imgWidth - 48}
              height={imgHeight}
              className={styles.image}
            />
          </div>
        )}

      </SwiperSlide>
      )}
      {' '}
      {images.map((image) => (
        <SwiperSlide
          key={image.id}
          className={styles.slide}
          onMouseDown={checkSplit}
          onTouchStart={checkSplit}
        >
          <div className={classnames(
            styles.sliderItem,
            styles.sliderImageItem,
          )}
          >
            <img
              src={image.media.url}
              alt={image.media.name}
              width={imgWidth - 48}
              height={imgHeight}
              className={styles.image}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

ResultImageSlider.propTypes = {
  className: PropTypes.string,
  splitImages: PropTypes.arrayOf().isRequired,
  images: PropTypes.objectOf().isRequired,

};
ResultImageSlider.defaultProps = {
  className: '',
};

export default ResultImageSlider;
