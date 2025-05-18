import React, { useEffect, useRef } from 'react';
import { string, bool } from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './CardListView.module.scss';

const CardListView = ({
  type,
  icon,
  isActive,
  info,
  isLastEl,
  className,
  disabled,
  ...otherProps
}) => {
  const buttonRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    if (!isActive) {
      button.classList.add(styles.close);
      return;
    }

    button.classList.add(isLastEl ? styles.openLast : styles.open);
  }, [isActive]);

  const classNamesWrapper = classNames(
    styles.wrapper,
    className,
    styles[type],
    { [styles.disabled]: disabled },
  );

  return (
    <div className={classNamesWrapper}>
      <button
        type="button"
        className={isActive ? `${styles.btn} ${styles.active}` : styles.btn}
        ref={buttonRef}
        {...otherProps}
      >
        <Icon name={icon} className={styles.svg} />
        <span className={styles.info}>{info}</span>
      </button>
    </div>
  );
};

CardListView.propTypes = {
  icon: string.isRequired,
  info: string.isRequired,
  isActive: bool.isRequired,
  isLastEl: bool,
  className: string,
  disabled: bool,
  type: string,
};

CardListView.defaultProps = {
  type: '',
  isLastEl: false,
  className: '',
  disabled: false,
};

export default CardListView;
