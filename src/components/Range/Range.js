import React, { useState } from 'react';
import classnames from 'classnames';
import InputRange from 'react-input-range';
import {
  bool,
  func, number, string,
} from 'prop-types';
import Button from '../Button/Button';
import styles from './Range.module.scss';

const DEFAULT_STEP = 500;
const MAX_VALUE = 5000;
const MIN_VALUE = 0;

const renderValues = () => {
  const length = MAX_VALUE / DEFAULT_STEP + 1;

  return Array.from({ length }, (_, index) => (
    <div className={styles.value} style={{ left: `calc(${(100 / (length - 1)) * index}% + 1px)` }}>
      <span>
        <>
          {index === 0 && MIN_VALUE}
          {index === length - 1 && `${MAX_VALUE}+`}
        </>
      </span>
    </div>
  ));
};

const Range = ({
  userBall,
  onClick,
  closeModal,
  className,
  min,
  max,
  modalMode,
}) => {
  const [value, setValue] = useState({ min, max });
  const [showApplyButton, setShowApplyButton] = useState(false);
  const clickHandler = () => {
    onClick(value);
    setShowApplyButton(false);

    if (modalMode) {
      closeModal();
    }
  };

  const accessMeClick = () => {
    const newValue = { min: MIN_VALUE, max: userBall };
    setValue(newValue);
    onClick(newValue, true);
  };

  const rangeChangeHandler = (rangeValue) => {
    setShowApplyButton(true);
    setValue(rangeValue);
  };

  const resetHandler = () => {
    const defaultValue = { min: MIN_VALUE, max: MAX_VALUE };
    onClick(defaultValue);
    setShowApplyButton(false);

    if (modalMode) {
      closeModal();
    }
  };

  return (
    <>
      <div className={classnames(styles.wrapper, className, {
        [styles.modalMode]: modalMode,
      })}
      >
        <Button
          className={styles.accessMeBtn}
          typeButton="button-gray-extra-light"
          onClick={accessMeClick}
        >
          Доступно мне
        </Button>
        <div className={styles.containerRange}>
          <InputRange
            step={DEFAULT_STEP}
            maxValue={MAX_VALUE}
            minValue={MIN_VALUE}
            onChange={rangeChangeHandler}
            value={value}
            formatLabel={(v) => `${v === MAX_VALUE ? `${v}+` : v}`}
          />
          <div className={styles.values}>{renderValues()}</div>
        </div>
        <div
          className={styles.containerButtons}
        >
          <Button
            className={classnames(
              styles.button,
              {
                [styles.visible]: showApplyButton,
              },
            )}
            typeButton="button-fill--small"
            onClick={clickHandler}
          >
            Применить
          </Button>
        </div>
      </div>
      {modalMode && (
      <div className={styles.modalButtons}>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={resetHandler}
        >
          Сбросить
        </button>
        <Button
          className={classnames(
            styles.button,
            {
              [styles.visible]: showApplyButton,
            },
          )}
          typeButton="button-fill--small"
          onClick={clickHandler}
        >
          Применить
        </Button>
      </div>
      )}
    </>
  );
};

Range.propTypes = {
  userBall: number,
  max: number.isRequired,
  min: number.isRequired,
  onClick: func.isRequired,
  className: string,
  modalMode: bool,
  closeModal: func,
};

Range.defaultProps = {
  userBall: 0,
  className: '',
  modalMode: false,
  closeModal: null,
};

export default Range;
