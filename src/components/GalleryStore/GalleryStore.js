import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { arrayOf, string } from 'prop-types';
import { Navigation, Thumbs } from 'swiper';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SliderControls from '../Slider/SliderControls/SliderControls';
import GalleryViewer from '../GalleryViewer/GalleryViewer';
import styles from './GalleryStore.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';

const GalleryStore = ({ data, className }) => {
  const currentIndexRef = useRef(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [indexActiveSlide, setIndexActiveSlide] = useState(0);
  const [isEndState, setIsEndState] = useState(false);
  const [isBeginningState, setIsBeginning] = useState(true);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 757px)');

  const sliderRef = useRef(null);

  const onSlideChange = ({ activeIndex, isEnd, isBeginning }) => {
    setIndexActiveSlide(activeIndex);
    setIsBeginning(isBeginning);
    setIsEndState(isEnd);
  };

  const onOpenViewer = (index) => {
    currentIndexRef.current = index;
    setViewerIsOpen(true);
    disableBodyScroll(document.body, {
      reserveScrollBarGap: true,
    });
  };

  const onCloseViewer = () => {
    setViewerIsOpen(false);
    enableBodyScroll(document.body);
  };

  return (
    <div className={classnames(styles.wrapper, className)}>
      <div className={styles.wrapperSlider}>
        { data.length > 1 && (
        <SliderControls
          className={styles.prev}
          indexSlide={indexActiveSlide}
          isBeginning={isBeginningState}
          type="store"
          onClick={() => sliderRef.current.swiper.slidePrev()}
        />
        )}
        <Swiper
          ref={sliderRef}
          wrapperClass={styles.container}
          className={`${styles.wrapperSlider} gallery-store`}
          speed={300}
          slidesPerView="auto"
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs]}
          navigation={{
            nextEl: `.${styles.next}`,
            prevEl: `.${styles.prev}`,
          }}
          slideActiveClass={styles.slideActive}
          noSwiping={!isMobile}
          noSwipingClass={styles.slide}
          onSlideChange={(swiper) => onSlideChange(swiper)}
        >
          {data.map((img, index) => (
            <SwiperSlide
              className={styles.slide}
              style={{ backgroundImage: `url(${img.media.url})` }}
              onClick={(e) => { e.stopPropagation(); onOpenViewer(index); }}
            />
          ))}
        </Swiper>
        { data.length > 1 && (
        <SliderControls
          className={styles.next}
          next
          type="store"
          indexSlide={indexActiveSlide}
          isEnd={isEndState}
          onClick={() => sliderRef.current.swiper.slideNext()}
        />
        )}
      </div>
      {data.length > 1 && !isMobile
        && (
        <Swiper
          className={`${styles.containerThumb} gallery-store__thumb`}
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          slidesPerView="auto"
          modules={[Thumbs]}
        >
          {data.map((img) => (
            <SwiperSlide
              className={styles.slideThumb}
              style={{ backgroundImage: `url(${img.media.url})` }}
            />
          ))}
        </Swiper>
        )}
      {data && data.length > 0 && (
      <GalleryViewer
        items={data}
        isOpen={viewerIsOpen}
        onClose={onCloseViewer}
        activeIndex={currentIndexRef.current}
      />
      )}
    </div>
  );
};

GalleryStore.propTypes = {
  data: arrayOf({
    src: string,
  }).isRequired,
  className: string,
};

GalleryStore.defaultProps = {
  className: '',
};

export default GalleryStore;
