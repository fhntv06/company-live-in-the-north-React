import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  onClick, checked, className, children, disabled,
}) => {
  const clickHandler = (e) => {
    onClick(e);
  };

  return (
    <div className={classnames(
      styles.wrapper,
      className,
      {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
      },
    )}
    >
      <button disabled={disabled} type="button" onClick={clickHandler} className={styles.checkbox}>
        <Icon name="check" className={styles.svg} />
      </button>
      {children}
    </div>
  );
};

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
Checkbox.defaultProps = {
  className: '',
  children: null,
  disabled: false,
};

export default Checkbox;
