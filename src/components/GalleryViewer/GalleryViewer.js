/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import classnames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './GalleryViewer.module.scss';
import 'swiper/scss';

const GalleryViewer = ({
  items,
  isOpen,
  onClose,
  activeIndex,
}) => {
  const swiperRef = useRef(null);
  const wrapperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen && swiperRef.current && activeIndex !== currentActiveIndex) {
      swiperRef.current.slideTo(activeIndex, 0);
      setCurrentActiveIndex(activeIndex);
    }
  }, [isOpen, activeIndex]);

  const onWrapperClick = (e) => {
    e.stopPropagation();
    if (e.target === wrapperRef.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      ref={wrapperRef}
      className={classnames(
        styles.wrapper,
        { [styles.isOpen]: isOpen },
      )}
      onKeyUp={() => {}}
      onClick={onWrapperClick}
    >
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Navigation]}
            className={styles.swiper}
            loop={items.length > 1}
            grabCursor
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            onSlideChange={(swiper) => {
              const { realIndex } = swiper;
              setCurrentActiveIndex(realIndex);
            }}
          >
            {items.map((item) => (
              <SwiperSlide
                key={item.id}
                className={styles.swiperSlide}
              >
                <img
                  className={
                    classnames(styles.image)
                  }
                  src={item.media.url}
                  alt={item.media.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.info}>
            {items[currentActiveIndex]?.subtext ?? ''}
          </p>
          <div className={styles.counter}>
            {currentActiveIndex + 1}
            {' '}
            из
            {' '}
            {items.length}
          </div>
          <div className={styles.buttons}>
            <Button
              ref={prevButtonRef}
              typeButton="button"
              className={styles.button}
            >
              <i className={classnames(
                styles.icon,
                styles.iconLeft,
              )}
              />
            </Button>
            <Button
              ref={nextButtonRef}
              typeButton="button"
              className={styles.button}
            >
              <i className={classnames(
                styles.icon,
                styles.iconRight,
              )}
              />
            </Button>
          </div>
        </div>
      </div>
      <button type="button" onClick={onClose} className={styles.closeButton}>
        <Icon name="close" className={styles.closeIcon} />
      </button>
    </div>, document.body,
  );
};

GalleryViewer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    realName: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
  })).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default GalleryViewer;
