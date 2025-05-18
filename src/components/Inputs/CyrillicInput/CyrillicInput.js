import React, { forwardRef } from 'react';
import { string, func, arrayOf } from 'prop-types';

export const getCyrillicInputRef = (register, options) => register('name', {
  ...options,
});

const CyrillicInput = forwardRef(({
  name,
  value,
  setError,
  clearErrors,
  setForm,
  error,
  ...otherProps
}, ref) => {
  const onChangeHandler = ({ target }) => {
    const valid = error.reg.test(target.value);
    if (!valid && target.value) {
      setError(name, { type: 'custom', message: error.message }, { shouldFocus: true });
    } else {
      clearErrors(name);
    }
  };

  return (
    <input
      {...ref}
      type="text"
      name={name}
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
});

CyrillicInput.propTypes = {
  name: string,
  value: string,
  setError: func,
  clearErrors: func,
  setForm: func,
  error: arrayOf({
    reg: string,
    message: string,
  }),
};

CyrillicInput.defaultProps = {
  name: '',
  value: '',
  setError: () => {},
  clearErrors: () => {},
  setForm: () => {},
  error: arrayOf({
    reg: '',
    message: '',
  }),
};

export default CyrillicInput;
