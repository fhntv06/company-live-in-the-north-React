import React from 'react';
import InputMask from 'react-input-mask';
import { string, arrayOf, func } from 'prop-types';

export const getPhoneInputRef = (register, options) => register('phone', {
  ...options,
});

const PhoneInput = React.forwardRef(({
  name,
  value,
  setForm,
  error,
  setError,
  clearErrors,
  ...otherProps
}, ref) => {
  const onChangeHandler = ({ target }) => {
    const valPhone = target.value.replace(error.reg, '');
    const valid = valPhone?.length === 11 && valPhone[1] === '9';

    if (!valid && valPhone) {
      setError(name, { type: 'custom', message: error.message }, { shouldFocus: true });
    } else {
      clearErrors(name);
    }
  };

  return (
    <InputMask
      {...ref}
      name={name}
      mask="+7 999 999 9999"
      value={value}
      type="tel"
      onChange={(e) => {
        onChangeHandler(e);
        setForm(e);
      }}
      {...otherProps}
    />
  );
});

PhoneInput.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  setForm: func.isRequired,
  setError: func.isRequired,
  clearErrors: func.isRequired,
  error: arrayOf({
    reg: string,
    message: string,
  }).isRequired,
};

export default PhoneInput;
