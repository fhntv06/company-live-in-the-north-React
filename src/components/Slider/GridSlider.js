import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './GridSlider.module.scss';
import GridSliderContext from '../../contexts/GridSliderContext';
import GridSlide from './GridSlide';
import SliderNextButton from '../AfishaSpecialOffersSlider/SliderNextButton';

const GridSlider = ({
  title,
  children,
  withoutIndents,
  withoutButton,
  withoutMask,
  hiddenSlidesIsOpacity,
  className,
  contrast,
}) => {
  const containerRef = useRef(null);
  const [gridData, setGridData] = useState(null);

  const getColumnWidth = () => {
    const el = containerRef.current;
    if (el) {
      const { gridTemplateColumns, columnGap } = window.getComputedStyle(el);
      setGridData({
        columnWidth: parseFloat(gridTemplateColumns.split(' ')[0]),
        gap: parseFloat(columnGap),
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      getColumnWidth();
    }
  }, []);

  return (
    <GridSliderContext.Provider value={gridData}>
      <div
        ref={containerRef}
        className={classnames(
          styles.container,
          className,
        )}
      >
        <Swiper
          speed={700}
          grabCursor
          slidesPerView="auto"
          watchSlidesProgress
          observer
          onResize={getColumnWidth}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide
              className={classnames(
                styles.slide,
                { [styles.withoutIndents]: withoutIndents },
              )}
            >
              <GridSlide
                withoutIndents={withoutIndents}
                hiddenSlidesIsOpacity={hiddenSlidesIsOpacity}
                witoutMask={withoutMask}
                title={title && index === 0 && title}
              >
                {child}
              </GridSlide>
            </SwiperSlide>
          ))}
          {!withoutButton && (
            <SliderNextButton contrast={contrast} />
          )}
        </Swiper>
      </div>
    </GridSliderContext.Provider>
  );
};

GridSlider.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  withoutIndents: PropTypes.bool,
  withoutButton: PropTypes.bool,
  hiddenSlidesIsOpacity: PropTypes.bool,
  className: PropTypes.string,
  withoutMask: PropTypes.bool,
  contrast: PropTypes.bool,
};

GridSlider.defaultProps = {
  title: null,
  children: null,
  withoutIndents: false,
  withoutButton: false,
  className: '',
  hiddenSlidesIsOpacity: false,
  withoutMask: false,
  contrast: false,
};
export default GridSlider;
