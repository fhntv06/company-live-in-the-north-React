import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import htmlParser from 'html-react-parser';
import styles from './SearchPage.module.scss';
import MunicipalityDropdown from '../../components/MunicipalityDropdown/MunicipalityDropdown';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import { useGetGeneralSearchResultsQuery } from '../../services/searchApi';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import useGetParams from '../../hooks/useGetParams';
import Seo from '../../components/Seo/Seo';

const PAGE_SIZE = 10;

const SearchPage = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [totalPageAmount, setTotalPageAmount] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  const { query, page } = useGetParams();

  const navigate = useNavigate();

  const skip = (
    totalPageAmount && (currentPage > totalPageAmount || currentPage < 1)
  ) || !currentQuery;

  const {
    currentData: searchResults,
    isFetching,
  } = useGetGeneralSearchResultsQuery(currentQuery, { skip });

  useEffect(() => {
    if (!search) return;

    setCurrentQuery(!query ? '' : decodeURIComponent(query));
    setSearchInputValue(!query ? '' : decodeURIComponent(query));
    setCurrentPage(!page ? 1 : Number(page));
  }, [search]);

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  const sortedSearchResults = searchResults?.slice(firstPageIndex, lastPageIndex);

  const searchInputChangeHandler = (value) => {
    setSearchInputValue(value);
  };

  const clearSearchInputHandler = () => {
    setSearchInputValue('');
    setTouched(false);
  };

  const searchSubmitHandler = (e) => {
    if (!(e.key === 'Enter' || e.key === 'NumpadEnder')) {
      return;
    }

    const trimmedInputValue = searchInputValue.trim();

    setTouched(true);
    setCurrentPage(1);
    navigate(`/search?query=${trimmedInputValue}`);

    if (trimmedInputValue.length < 4) {
      setIsNothingFound(true);
      return;
    }

    setIsNothingFound(false);
    setCurrentQuery(trimmedInputValue);
  };

  const navigateOnPageChangeHandler = (pageNumber) => {
    navigate(`/search?query=${currentQuery}&page=${pageNumber}`);
  };

  const paginationHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigateOnPageChangeHandler(pageNumber);
    window.scrollTo(0, 0);
  };

  const getTotalPageAmount = (pageAmount) => {
    setTotalPageAmount(pageAmount);
  };

  return (
    <>
      <Seo title={'Результаты поиска'} description="Живём на севере" />
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.header}>
            <h1 className={styles.title}>Результаты поиска</h1>
            <div className={`select__button ${styles.selectButtonWrapper}`}>
              <MunicipalityDropdown gradient />
            </div>
          </div>
          <main className={styles.main}>
            <div className={styles.searchWrapper}>
              <div className={`${styles.inputField} input-field`}>
                <SearchInput
                  value={searchInputValue}
                  onChange={searchInputChangeHandler}
                  onClear={clearSearchInputHandler}
                  onKeyUp={searchSubmitHandler}
                />
              </div>
            </div>
            <div className={styles.searchResults}>
              {!isNothingFound && sortedSearchResults?.map((result) => (
                <Link key={result.id} to={result.href} className={styles.result}>
                  <div className={styles.titleWrapper}>
                    <span>
                      {result.indexID}
                      .
                    </span>
                    <h2 className={styles.resultTitle}>
                      {result.name}
                    </h2>
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.info}>
                      {result.image
                    && <img src={result.image} alt={result.name} className={styles.img} />}
                      <div className={styles.textBlock}>
                        {result.info && <p className={styles.text}>{htmlParser(result.info)}</p>}
                        <span className={styles.pageName}>{result.page}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <SpinnerLoader isLoading={isFetching} />
              {
            (searchResults?.length === 0 || isNothingFound) && !isFetching && touched
            && <span className={styles.message}>По вашему запросу ничего не найдено</span>
}
            </div>
            {searchResults && !isNothingFound && !isFetching && (
            <div className={styles.paginationWrapper}>
              <PaginationBar
                currentPage={currentPage}
                totalCount={searchResults?.length}
                pageSize={PAGE_SIZE}
                onPageChange={paginationHandler}
                getTotalPageAmount={getTotalPageAmount}
              />
            </div>
            )}
          </main>
        </div>
      </div>
    </>

  );
};

export default SearchPage;
