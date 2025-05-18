import React,
{
  useEffect,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import SearchInput from '../Inputs/SearchInput/SearchInput';
import SearchHint from './SearchHint/SearchHint';
import styles from './Search.module.scss';
import { useLazyGetGeneralSearchResultsQuery } from '../../services/searchApi';

const Search = forwardRef(({
  focus,
  className,
  ...otherProps
}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [trigger, { isFetching }] = useLazyGetGeneralSearchResultsQuery();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const searchContainerRef = useRef();

  const textLoading = isFetching ? 'Загрузка...' : 'Ничего не найдено';

  const inputHandler = (value) => {
    const trimmedValue = value.trim();

    setInputValue(value);
    setOpen(true);
    clearTimeout(timer);
    setData([]);

    if (trimmedValue.length < 4) {
      return;
    }

    const newTimer = setTimeout(async () => {
      try {
        const searchResults = await trigger(trimmedValue).unwrap();
        setData(searchResults);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    setTimer(newTimer);
  };

  const onClear = () => {
    setOpen(false);
    setInputValue('');
    setData([]);
  };

  useEffect(() => {
    const onBlur = ({ target }) => {
      if (searchContainerRef.current
        && !searchContainerRef.current.contains(target)) setOpen(false);
    };

    document.addEventListener('click', onBlur);
    return () => document.removeEventListener('click', onBlur);
  }, []);

  useEffect(() => {
    if (data.length && focus) setOpen(true);
  }, [focus]);

  useEffect(() => {
    if (otherProps.menuIsOpen) {
      onClear();
    }
  }, [otherProps.menuIsOpen]);

  const searchContainerClasses = classnames(
    styles.container,
    styles.container,
    {
      [styles.containerOpen]: open,
    },
  );

  return (
    <div
      className={searchContainerClasses}
      ref={searchContainerRef}
    >
      <div className={`${styles.inputField} input-field`}>
        <SearchInput
          ref={ref}
          value={inputValue}
          focus={focus}
          onChange={inputHandler}
          onClear={onClear}
          {...otherProps}
        />
      </div>
      <div className={classnames(
        styles.result,
        { [styles.visible]: data.length > 0 },
      )}
      >
        {data.length
          ? data.slice(0, 3).map((item) => (
            <SearchHint
              key={item.id}
              {...item}
            />
          ))
          : <p className={styles.message}>{textLoading}</p>}
        {data.length > 3 && (
        <Link
          to={`/search?query=${inputValue}`}
          target="_blank"
          className={styles.allResults}
        >
          Все результаты
        </Link>
        )}
      </div>
    </div>
  );
});

Search.propTypes = {
  focus: bool,
  className: string,
};

Search.defaultProps = {
  className: '',
  focus: false,
};

export default Search;
