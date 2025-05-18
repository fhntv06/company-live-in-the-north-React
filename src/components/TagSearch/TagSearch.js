/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { components } from 'react-select';
import MenuList, { handleScrollFrame } from '../../features/scrollbarSelect/renderScrollbar';
import Button from '../Button/Button';
import Select from '../Select/Select';
import Icon from '../Icon/Icon';
import useOutsideClick from '../../hooks/useOutsideClick';

import styles from './TagSearch.module.scss';
import useResize from '../../hooks/useResize';
import useMediaQuery from '../../hooks/useMediaQuery';

const Input = (props) => (
  <>
    <Button typeButton="button-search" className={styles.search__button} />
    <components.Input {...props} />
  </>
);

const ValueContainer = (props) => (
  <components.ValueContainer {...props}>
    {props.children}
  </components.ValueContainer>
);

const TagSearch = ({
  options,
  children,
  selectedTags,
  onSelectTags,
}) => {
  const containerRef = useRef();

  const [open, setOpen] = useState(false);
  const [valueSel, setValueSel] = useState('');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const resize = useResize();

  const isOptionSelected = (option) => selectedTags.includes(String(option.value));

  useEffect(() => {
    const el = containerRef.current;
    const { left } = el.getBoundingClientRect();
    if (isMobile) {
      el.style.setProperty('--select-width', `${window.innerWidth - left - 16}px`);
    }
  }, [resize]);

  useOutsideClick(containerRef, (e) => {
    if (!e.target.classList.contains(styles.button)) setOpen(false);
  });

  return (
    <div className={styles.wrapperTags}>
      <div className={`select__tag-search ${styles.container} ${styles.containerTags}`}>
        <div className={`${styles.containerButton} ${open ? styles.open : ''}`}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              setOpen(!open);
              handleScrollFrame(0, containerRef.current, false);
            }}
          >
            {children}
            <Icon name="dropdown-arrow" className={styles.icon} />
          </button>
          <div ref={containerRef} className={styles.select}>
            <Select
              className="select__tag-search select__dropdown-tag-select"
              value={valueSel}
              isClearable
              isSearchable
              menuIsOpen={open}
              options={options}
              components={{
                Input,
                ValueContainer,
                MenuList,
                DropdownIndicator: () => { },
              }}
              styles={{
                input: () => { },
                clearIndicator: () => { },
                option: () => { },
              }}
              onChange={(selectOption) => {
                onSelectTags(selectOption);
                setValueSel('');
              }}
              placeholder="Найти теги"
              isOptionSelected={isOptionSelected}
              classIsOpen=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSearch;

TagSearch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  })),
  children: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf().isRequired,
  onSelectTags: PropTypes.func.isRequired,
};

TagSearch.defaultProps = {
  options: {},
};
