import React, {
  useRef, useEffect, useState, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ResultSplitImages.module.scss';
import useResize from '../../hooks/useResize';

const ResultSplitImages = ({
  firstImg,
  secondImg,
  className,
  altTitles,
}) => {
  const containerRef = useRef(null);
  const positionRef = useRef(null);
  const activeRef = useRef(false);
  const leftRef = useRef();
  const rightRef = useRef();
  const [endClass, setEndClass] = useState(null);
  const [imgWidth, setImgWidth] = useState(0);
  const resize = useResize();

  useLayoutEffect(() => {
    if (containerRef && containerRef.current) {
      setImgWidth(containerRef.current.offsetWidth);
    }
  }, [resize, firstImg]);

  const disabled = () => {
    activeRef.current = false;
    positionRef.current = null;
  };

  const handler = (e) => {
    if (e.type === 'mousemove') e.preventDefault();

    if (!activeRef.current || !(leftRef.current && rightRef.current)) return;

    const leftWidth = leftRef.current.offsetWidth;
    const rightWidth = rightRef.current.offsetWidth;
    const currentPosition = e.clientX || e.touches[0].clientX;
    const leftDrag = currentPosition - positionRef.current + leftWidth;
    const rightDrag = positionRef.current - currentPosition + rightWidth;

    if (!positionRef.current) {
      positionRef.current = currentPosition;
      return;
    }

    if ((leftDrag < 0 && (currentPosition < positionRef.current))
      || (rightDrag < 0 && (currentPosition > positionRef.current))) {
      return;
    }

    if (currentPosition !== positionRef.current) {
      leftRef.current.style.width = `${leftDrag}px`;
      rightRef.current.style.width = `${rightDrag}px`;

      if (currentPosition - positionRef.current + leftWidth <= 0) {
        setEndClass('leftStart');
      } else if (positionRef.current - currentPosition + rightWidth <= 0) {
        setEndClass('rightEnd');
      } else if (endClass) {
        setEndClass(null);
      }
    }

    positionRef.current = currentPosition;
  };

  useEffect(() => {
    const installWidth = () => {
      if (containerRef.current && leftRef.current && rightRef.current) {
        leftRef.current.style.width = '25%';
        rightRef.current.style.width = '75%';
        containerRef.current.style.setProperty(
          '--split-img-width', `${leftRef.current.offsetWidth + rightRef.current.offsetWidth}px`,
        );
      }
    };

    installWidth();

    document.body.addEventListener('mouseup', disabled);
    window.addEventListener('resize', installWidth);

    return () => {
      document.body.removeEventListener('mouseup', disabled);
      window.removeEventListener('resize', installWidth);
    };
  }, [resize, firstImg]);

  return (
    <>
      {(secondImg && firstImg) ? (
        <div
          onMouseMove={handler}
          onTouchMove={handler}
          className={classnames(styles.splitImages, className)}
          ref={containerRef}
        >
          <div className={styles.splitLeft} ref={leftRef}>
            <img src={firstImg} width={imgWidth} className={styles.firstImage} alt={altTitles[0]} />
            <span className={styles.splitBefore}>было</span>
          </div>

          <div
            className={classnames(
              styles.split,
              'split',
              {
                [styles.leftStart]: endClass === 'leftStart',
                [styles.rightEnd]: endClass === 'rightEnd',
              },
            )}
            role="presentation"
            onMouseDown={() => { activeRef.current = true; }}
            onTouchStart={() => { activeRef.current = true; }}
            onTouchEnd={() => { activeRef.current = false; }}
          />
          <div className={styles.splitRight} ref={rightRef}>
            <img
              src={secondImg}
              width={imgWidth}
              className={styles.secondImage}
              alt={altTitles[1]}
            />
            <span className={styles.splitAfter}>стало</span>
          </div>
        </div>
      ) : (
        <img src={secondImg || firstImg} className={styles.simpleImages} alt="" />
      )}
    </>
  );
};

ResultSplitImages.propTypes = {
  firstImg: PropTypes.string,
  secondImg: PropTypes.string,
  altTitles: PropTypes.arrayOf().isRequired,
  className: PropTypes.string,
};
ResultSplitImages.defaultProps = {
  className: '',
  firstImg: null,
  secondImg: null,
};

export default ResultSplitImages;
