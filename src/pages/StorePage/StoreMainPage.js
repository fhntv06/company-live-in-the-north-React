import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../../components/Icon/Icon';
import Range from '../../components/Range/Range';
import useOutsideClick from '../../hooks/useOutsideClick';
import ProductCard from '../../components/ProductCard/ProductCard';
import Faq from '../../components/Faq/Faq';

import styles from './StorePage.module.scss';
import FaqCard from '../../components/FaqCard/FaqCard';
import AboutOrder from '../../components/AboutOrder/AboutOrder';
import { useGetAllProductsQuery, useGetStoreFaqsQuery } from '../../services/storeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { formatParams } from '../../helpers/format';
import useGetParams from '../../hooks/useGetParams';
import { getBalance } from '../../features/Auth/authSlice';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import StoreFiltersModal from '../../components/StoreFiltersModal/StoreFiltersModal';
import useModal from '../../hooks/useModal';

const sortByPriceValues = [
  { value: null, label: 'Сначала\xa0новинки' },
  { value: 'asc', label: 'Сначала\xa0дешевле' },
  { value: 'desc', label: 'Сначала\xa0дороже' },
];

const StoreMainPage = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [sortByType, setSortByType] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(sortByPriceValues[0]);

  const {
    isOpen: isStoreFiltersModalOpen, openModalHandler: openStoreFiltersModalHandler,
    closeModalHandler: closeStoreFiltersModalHandler,
  } = useModal();

  const filtersRef = useRef({});
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const params = useGetParams();

  const userBalance = useSelector((state) => getBalance(state.auth));
  const point = useSelector((state) => selectPointByType(state, 3));

  const searchModuleRef = useRef(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    products,
    categories,
    isProductsLoading,
    isProductsFetching,
  } = useGetAllProductsQuery({
    filters: search,
  }, {
    selectFromResult: ({
      data, isLoading, isFetching,
    }) => ({
      products: data?.data ?? [],
      categories: [
        { value: null, label: 'Все\xa0товары' },
        ...data?.categories ?? [],
      ],
      isProductsLoading: isLoading,
      isProductsFetching: isFetching,
    }),
  });
  const { data: faqs, isLoading: isFaqsLoading } = useGetStoreFaqsQuery();

  // console.log(faqs);
  const searchInputChangeHandler = (value) => {
    setSearchInputValue(value);
  };

  const clearSearchInputHandler = () => {
    setSearchInputValue('');
    setSearchOpen(false);
  };

  useEffect(() => {
    if (!products || products.length < 1) return;

    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (products.length) {
      const filtered = products.filter((item) => (
        item.name.toLowerCase().includes(searchInputValue.toLowerCase())
      ));
      setFilteredProducts(filtered);
    }
  }, [searchInputValue, products]);

  useOutsideClick(searchModuleRef, () => {
    if (searchOpen) {
      setSearchOpen(false);
    }
  });

  const applyFilter = () => {
    const location = formatParams(pathname, filtersRef.current);

    if (search === new URL(location, window.location.href).search) {
      return;
    }

    setFilteredProducts([]);
    navigate(location);
  };

  const addSortFilterValues = (newFilters) => {
    filtersRef.current = {
      ...filtersRef.current,
      ...newFilters,
    };
  };

  const onCategoryFilter = (category) => {
    setSortByType(category.value);

    addSortFilterValues({
      'filter[category]': category.value,
    });

    applyFilter();
  };

  const onPriceFilter = (value, isAcces = false) => {
    const { min, max } = value;

    addSortFilterValues({
      'filter[price][from]': min,
      'filter[price][to]': max === 5000 && !isAcces ? 0 : max,
    });

    applyFilter();
  };

  if (isProductsLoading && isFaqsLoading && isProductsFetching) {
    return <MainPreloader />;
  }

  return (
    <div className={styles.pageContent}>
      <AnimatePresence mode="wait">
        {!searchOpen ? (
          <motion.div
            key="filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.filtersRow}
          >
            <div className={styles.sortFilters}>
              <div className={styles.sortFiltersInnerWrapper}>
                <button onClick={() => setSearchOpen(true)} type="button" className={styles.searchButton}>
                  <Icon className={styles.searchIcon} name="search" />
                </button>
                {categories.map((category) => (
                  <Button
                    onClick={() => onCategoryFilter(category)}
                    typeButton="button-gray-extra-light"
                    className={classnames(
                      styles.filterButton,
                      {
                        [styles.active]: sortByType === category.value,
                      },
                    )}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.modalBtnWrapper}>
              <Button
                onClick={openStoreFiltersModalHandler}
                typeButton="button-gray-extra-light"
                className={classnames(
                  styles.filterButton,
                  {
                    [styles.active]: sortByType === false,
                  },
                )}
              >
                Цена
                <Icon className={styles.dropdownIcon} name="dropdown-arrow" />
              </Button>
            </div>
            <div className={styles.filtersSecondColumn}>
              <div className={styles.priceText}>
                <Icon name="coin" className={styles.coinIcon} fill="url(#coin-gradient)" />
                <span>Цена:</span>
              </div>
              <Range
                onClick={onPriceFilter}
                userBall={userBalance}
                className={styles.range}
                min={params['filter[price][from]'] ?? 0}
                max={params['filter[price][to]'] ?? 5000}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={
              classnames(
                styles.searchField,
                'input-field',
              )
            }
            ref={searchModuleRef}
          >
            <SearchInput
              value={searchInputValue}
              onChange={searchInputChangeHandler}
              onClear={clearSearchInputHandler}
              placeholder="Введите название товара"
            />
          </motion.div>
        ) }
      </AnimatePresence>
      <div className={styles.wrapperProducts}>
        {filteredProducts.length > 0 && (
        <div className={`${styles.selectWrapper} select__button`}>
          <Select
            type="button--white"
            value={sortByPrice}
            options={sortByPriceValues}
            className={classnames(
              'select__button',
              styles.selectButton,
            )}
            classIsOpen="select--button--is-open"
            onChange={(selectOption) => {
              setSortByPrice(selectOption);
              addSortFilterValues({
                sort: selectOption.value && 'price',
                order: selectOption.value,
              });
              applyFilter();
            }}
            isSearchable={false}
          />
        </div>
        )}
        {isProductsFetching || isProductsLoading ? (
          <SpinnerLoader isLoading className={styles.spinnerLoader} />
        ) : (
          filteredProducts.length > 0 ? (
            <div className={styles.products}>
              {filteredProducts.map((product) => (
                <ProductCard
                  product={product}
                  className="shop__card"
                />
              ))}
            </div>
          ) : (
            <h5 className={styles.emptyTitle}>
              К сожалению, товаров по вашему запросу не найдено
            </h5>
          )
        )}
      </div>
      <Faq questions={faqs}>
        <h2 className={styles.faqTitle}>Вопрос-ответ</h2>
        {!!point && (
        <FaqCard hideContentClassName={styles.faqCard} title="Где получить заказ?">
          <AboutOrder
            data={point}
          />
        </FaqCard>
        )}
      </Faq>
      <StoreFiltersModal
        isOpen={isStoreFiltersModalOpen}
        onClose={closeStoreFiltersModalHandler}
        onPriceFilter={onPriceFilter}
        userBalance={userBalance}
        min={params['filter[price][from]'] ?? 0}
        max={params['filter[price][to]'] ?? 5000}
      />
    </div>
  );
};

export default StoreMainPage;
