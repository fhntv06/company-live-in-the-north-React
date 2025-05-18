/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactSelect, { components } from 'react-select';
import {
  string,
  number,
  arrayOf,
  shape,
  func,
} from 'prop-types';
import classNames from 'classnames';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './Select.module.scss';
import MenuList, { handleScrollFrame } from '../../features/scrollbarSelect/renderScrollbar';
import Icon from '../Icon/Icon';

const Select = ({
  options,
  type,
  className,
  classIsOpen,
  setSortId,
  label,
  register,
  setValue,
  clearErrors,
  onChangeHandler,
  ...otherProps
}) => {
  const [open, setOpen] = useState(false);

  const refSelect = useRef(null);

  const isSelectHovered = useRef(false);

  const controlOpenStateHandler = () => {
    setOpen(false);
  };

  useOutsideClick(refSelect, controlOpenStateHandler);
  const ValueContainer = (props) => {
    const {
      selectProps: { value },
    } = props;

    let valueContainer = null;
    switch (type) {
      case 'button--color':
      case 'button--white':
      case 'button--gray':
        valueContainer = <div className={`${styles.text} ${type === 'button--color' && styles.boldText}`}>{props.children}</div>;
        break;
      case 'input':
        valueContainer = (
          <>
            <div className={`select__placeholder ${open || value ? 'active' : ''}`}>{label}</div>
            <components.ValueContainer {...props} />
          </>
        );
        break;
    }

    return valueContainer;
  };

  const DropdownIndicator = () => (
    <Icon
      name="dropdown-arrow"
      className={classNames(
        styles.dropdownIcon,
        'select__dropdown-icon',
        { open },
      )}
    />
  );

  const Control = (props) => {
    const {
      children,
    } = props;

    let control = null;
    switch (type) {
      case 'button--color':
      case 'button--white':
      case 'button--gray':
        control = (
          <button
            className={`select__button__content ${type} ${styles.selectButton} ${open ? styles.active : ''}`}
            type="button"
            onClick={() => setOpen(!open)}
          >
            {children}
          </button>
        );
        break;
      case 'input':
        control = (
          <div className="select__control">
            <button type="button" onClick={() => setOpen(!open)}>
              {children}
            </button>
          </div>
        );
        break;
    }

    return control;
  };

  useEffect(() => handleScrollFrame({ top: 0 }, refSelect.current, false), [open]);

  const onChange = (selectedOption) => {
    setOpen(false);
    setValue(register.name, selectedOption.value);
    clearErrors(register.name);
    setSortId(selectedOption.value);
    onChangeHandler(selectedOption);
  };

  const classNamesSelect = classNames({
    [`${classIsOpen}`]: open,
  });

  return (
    <div
      onMouseEnter={() => {
        isSelectHovered.current = true;
      }}
      onMouseLeave={() => {
        isSelectHovered.current = false;
      }}
      ref={refSelect}
      className={className}
    >
      <ReactSelect
        className={classNamesSelect}
        classNamePrefix="select"
        options={options}
        components={{
          Control,
          ValueContainer,
          MenuList,
          DropdownIndicator,
        }}
        styles={{
          clearIndicator: () => {},
          indicatorSeparator: () => {},
          valueContainer: () => {},
        }}
        onChange={onChange}
        onInputChange={() => handleScrollFrame({ top: 0 }, refSelect.current, false)}
        placeholder=""
        theme={() => ({ colors: {}, spacing: {} })}
        menuIsOpen={open}
        noOptionsMessage={() => 'Не найдено'}
        inputProps={{
          autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off', autofill: 'off',
        }}
        {...otherProps}
      />
    </div>
  );
};

Select.propTypes = {
  options: arrayOf(shape({
    value: number,
    label: string,
  })),
  type: string,
  className: string,
  classIsOpen: string,
  setSortId: func,
  label: string,
  setValue: func,
  clearErrors: func,
  onChangeHandler: func,
  register: shape(
    {
      name: string,
    },
  ),
};

Select.defaultProps = {
  options: [],
  type: '',
  className: '',
  classIsOpen: '',
  setSortId: () => {},
  label: '',
  setValue: () => {},
  clearErrors: () => {},
  register: {},
  onChangeHandler: () => {},
};

export default Select;
