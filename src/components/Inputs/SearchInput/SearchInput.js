import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { string, bool, func } from 'prop-types';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';
import styles from './SearchInput.module.scss';

const SearchInput = forwardRef(({
  value,
  focus,
  onChange,
  onClear,
  placeholder,
  ...otherProps
}, ref) => (
  <div className={classnames(
    styles.search,
    {
      [styles.searchFocus]: focus,
      [styles.searchChanged]: value,
    },
  )}
  >
    <Button className={styles.searchButton}>
      <Icon name="search" />
    </Button>
    <div className="search__field">
      <input
        ref={ref}
        name="search"
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...otherProps}
      />
      <Button
        className={styles.cross}
        onClick={() => {
          onChange('');
          onClear();
        }}
      >
        <Icon name="close" />
      </Button>
    </div>
  </div>
));

SearchInput.propTypes = {
  value: string,
  focus: bool,
  onChange: func,
  onClear: func,
  placeholder: string,
};

SearchInput.defaultProps = {
  onChange: () => {},
  onClear: () => {},
  value: '',
  focus: false,
  placeholder: 'Что хотите найти?',
};

export default SearchInput;
