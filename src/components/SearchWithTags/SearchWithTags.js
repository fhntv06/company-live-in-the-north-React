import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import {
  arrayOf, bool, func, instanceOf, number, objectOf, oneOfType, shape, string,
} from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Button from '../Button/Button';
import TagSearch from '../TagSearch/TagSearch';
import SearchInput from '../Inputs/SearchInput/SearchInput';
import styles from './SearchWithTags.module.scss';
import CalendarMini from '../Calendar/CalendarMini/CalendarMini';
import useMediaQuery from '../../hooks/useMediaQuery';
import Tags from '../Tags/Tags';

const SearchWithTags = ({
  options,
  className,
  selectedTags,
  onSelectTags,
  calendarOpen,
  setCalendarOpen,
  select,
  ...otherProps
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const updatedOptions = useMemo(() => ({
    specialTags: options.filter((tag) => tag.special),
    otherTags: options.filter((tag) => !tag.special),
  }), [options]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  useEffect(() => {
    otherProps.onSearchToggle(searchOpen);
  }, [searchOpen]);

  const onKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnder') {
      navigate({
        pathname: 'search',
        search: `query=${searchValue}`,
      });
    }
  };
  const toggleTags = (tag) => {
    const value = String(tag.value);
    if (selectedTags.includes(value)) {
      return onSelectTags(selectedTags.filter((item) => item !== value));
    }

    return onSelectTags([...selectedTags, value]);
  };

  return (
    <div className={classNames(styles.search, className, { [styles.searchIsOpen]: searchOpen })}>
      <CSSTransition
        in={searchOpen}
        classNames="search-fade"
        timeout={1100}
        unmountOnExit
      >
        <div className={`${styles.searchField} input-field`}>
          <SearchInput
            ref={inputRef}
            placeholder="Поиск событий"
            value={searchValue}
            onChange={setSearchValue}
            onKeyUp={onKeyUp}
          />
        </div>
      </CSSTransition>
      <CSSTransition
        in={!searchOpen}
        classNames="search-fade"
        timeout={1100}
        unmountOnExit
      >
        <div className={styles.controls}>
          <Button typeButton="button-search" className={styles.button} onClick={() => setSearchOpen(true)} />
          <div className={styles.tags}>
            {isMobile && (
              <CalendarMini
                className={classNames(styles.calendarMini, { [styles.opacity]: calendarOpen })}
                onClick={setCalendarOpen}
                select={select}
              />
            )}
            {updatedOptions.specialTags.map((tag, index) => (
              <div key={tag.value + index} className={styles.tag}>
                <Tags
                  tags={selectedTags}
                  onClick={() => { toggleTags(tag); }}
                  option={tag}
                  data-index={index}
                  id={tag.value}
                  select={selectedTags.includes(String(tag.id))}
                >
                  {tag.label}
                </Tags>
              </div>
            ))}
            {selectedTags.length > 0 && (
              <Button
                typeButton="button-close-tag"
                onClick={() => onSelectTags([])}
              />
            )}
          </div>
          <TagSearch
            options={updatedOptions.otherTags}
            tagsClass={styles.tags}
            selectedTags={selectedTags}
            onSelectTags={toggleTags}
          >
            Другие теги
          </TagSearch>
        </div>
      </CSSTransition>
    </div>
  );
};

SearchWithTags.propTypes = {
  options: arrayOf(shape({
    value: number,
    label: string,
  })),
  className: string,
  selectedTags: arrayOf().isRequired,
  onSelectTags: func.isRequired,
  calendarOpen: bool,
  setCalendarOpen: func,
  select: objectOf(shape({
    firstSelect: oneOfType([instanceOf(Date), number]),
    secondSelect: oneOfType([instanceOf(Date), number]),
  })).isRequired,
};
SearchWithTags.defaultProps = {
  options: [],
  calendarOpen: false,
  setCalendarOpen: () => {},
  className: '',
};

export default SearchWithTags;
