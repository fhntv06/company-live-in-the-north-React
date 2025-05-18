import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

export const getDateTimestamp = (value) => {
  const [day, month, year] = value.split('.');
  return Date.parse(`${month}/${day}/${year}`);
};

const error = {
  message: 'Пожалуйста, введите дату рождения',
};

const validate = (value) => {
  const timestamp = getDateTimestamp(value);
  const isDateValid = !Number.isNaN(timestamp);

  return isDateValid;
};

const DateInput = ({
  name,
  value,
  setForm,
  setError,
  clearErrors,
  ...otherProps
}) => {
  const onChangeHandler = ({ target }) => {
    const valid = validate(target.value);
    if (!valid && target.value) {
      setError(name, { type: 'custom', message: error.message }, { shouldFocus: true });
    } else {
      clearErrors(name);
    }
  };

  return (
    <InputMask
      name={name}
      type="text"
      mask="99.99.9999"
      value={value}
      onChange={
        (e) => {
          onChangeHandler(e);
          setForm(e);
        }
      }
      {...otherProps}
    />
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default DateInput;
