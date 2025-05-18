import {
  bool, number, string,
} from 'prop-types';
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import Icon from '../../Icon/Icon';
import styles from './SliderControls.module.scss';

const SliderControls = forwardRef(({
  next,
  type,
  isBeginning,
  isEnd,
  indexSlide,
  ...otherProps
}, ref) => (
  <div className={classnames(
    styles.controls,
    {
      [styles.next]: next,
      [styles.prev]: !next,
      'slider-control-next': next,
      'slider-control-prev': !next,
      [styles.isBeginning]: isBeginning,
      [styles.isEnd]: isEnd,
      [styles[type]]: type.length > 0,
    },
  )}
  >
    <button
      ref={ref}
      type="button"
      {...otherProps}
    >
      {(next || type === 'store') && (
        <div className={styles.icon}>
          <Icon name="next" />
        </div>
      )}
    </button>
  </div>
));

SliderControls.propTypes = {
  next: bool,
  type: string,
  isBeginning: bool,
  isEnd: bool,
  indexSlide: number.isRequired,
};

SliderControls.defaultProps = {
  next: false,
  isBeginning: false,
  isEnd: false,
  type: '',
};

export default SliderControls;
