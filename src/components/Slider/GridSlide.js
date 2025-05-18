/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { useSwiperSlide, useSwiper } from 'swiper/react';
import GridSliderContext from '../../contexts/GridSliderContext';
import styles from './GridSlide.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';

const GridSlide = ({
  withoutIndents,
  title = null,
  hiddenSlidesIsOpacity = false,
  witoutMask = false,
  className,
  children,
}) => {
  const ref = useRef(null);
  const prevContext = useRef(null);
  const context = useContext(GridSliderContext);
  const swiper = useSwiper();
  const slide = useSwiperSlide();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isConflictTreshold = useMediaQuery('(max-width: 1565px)');
  const [hiddenPosition, setHiddenPosition] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (
      el
      && JSON.stringify(prevContext.current) !== JSON.stringify(context)
    ) {
      const { gridColumnStart, width } = window.getComputedStyle(el.firstChild);
      let columns = parseInt(gridColumnStart.split(' ')[1], 10);
      let cardWidth = 0;
      const gaps = withoutIndents ? columns : columns - 1;

      if (Number.isNaN(columns)) {
        cardWidth = width;
      } else {
        columns = title ? columns + 2 : columns;
        cardWidth = `${columns * context.columnWidth + gaps * context.gap}px`;
        el.style.setProperty('--slide-columns', columns);
      }
      el.style.width = cardWidth;
      swiper.update();
      prevContext.current = context;
    }
  }, [context]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isMobile) {
          setHiddenPosition(null);
        } else {
          const direction = entry.target.getBoundingClientRect().left < 0 ? 'left' : 'right';
          setHiddenPosition(direction);
        }
      });
    }, {
      root: document.body,
      rootMargin: '100% 0px 100% 0px',
      threshold: isConflictTreshold ? 0.8 : 0.7,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const onClick = (e) => {
    if (!hiddenPosition) return null;
    e.preventDefault();
    e.stopPropagation();

    if (hiddenPosition === 'left') {
      return swiper.slidePrev();
    }

    return swiper.slideNext();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={ref}
      onClick={onClick}
      role="presentation"
      className={classnames(
        styles.slide,
        {
          [styles.titleCard]: title,
          [styles.isPrev]: !isMobile && slide.isPrev,
          [styles.withoutIndents]: withoutIndents,
          [styles.hidden]: !isMobile && (!slide.isVisible || hiddenPosition),
          [styles[hiddenPosition]]: hiddenPosition === 'left',
          [styles.opacity]: hiddenSlidesIsOpacity,
          [styles.withoutMask]: witoutMask,
        },
        className,
      )}
    >
      {children}
      {title && (
        <p className={styles.title}>{title}</p>
      )}
    </div>
  );
};

export default GridSlide;
