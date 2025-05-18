import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  children,
  label,
  value,
  error,
  className,
}) => {
  const [focus, setFocus] = useState(false);
  const [isLabelActive, setLabelActive] = useState(false);

  useEffect(() => {
    const test = focus || (value && value.length !== 0);
    setLabelActive(test);
  }, [value, focus]);

  return (
    <div
      className={`input-field__inner${error ? ' error' : ''} ${className || ''}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      {label && <div className={`input-field__label${isLabelActive ? ' active' : ''}`}>{label}</div>}
      {error && <div className="input-field__error">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string,
  ]),
  error: PropTypes.string,
  className: PropTypes.string,
};

InputField.defaultProps = {
  label: null,
  error: null,
  value: null,
  className: '',
};

export default InputField;
