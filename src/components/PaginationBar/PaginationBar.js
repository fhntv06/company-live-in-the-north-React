import React, { useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import usePagination, { DOTS } from '../../hooks/usePagination';
import styles from './PaginationBar.module.scss';
import Icon from '../Icon/Icon';

const PaginationBar = (props) => {
  const {
    onPageChange,
    getTotalPageAmount,
    totalCount,
    currentPage,
    siblingCount,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  useEffect(() => {
    if (!getTotalPageAmount) return;

    getTotalPageAmount(paginationRange.at(-1));
  }, [currentPage, paginationRange]);

  if (
    currentPage === 0
    || paginationRange.length < 2
    || currentPage > paginationRange.at(-1)
    || currentPage < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames(styles.container, { [className]: className })}
    >
      <li
        role="presentation"
        className={classnames(styles.item,
          {
            [styles.hidden]: currentPage === 1,
          })}
        onClick={onPrevious}
      >
        <Icon className={styles.prevBtn} name="next" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className={classnames(styles.item, styles.dots)}>&#8230;</li>;
        }

        return (
          <li
            role="presentation"
            className={classnames(styles.item,
              {
                [styles.selected]: pageNumber === currentPage,
              })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        role="presentation"
        className={classnames(styles.item,
          {
            [styles.hidden]: currentPage === lastPage,
          })}
        onClick={onNext}
      >
        <Icon className={styles.nextBtn} name="next" />
      </li>
    </ul>
  );
};

PaginationBar.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  getTotalPageAmount: PropTypes.func,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
};

PaginationBar.defaultProps = {
  getTotalPageAmount: null,
  siblingCount: 1,
  className: '',
};

export default PaginationBar;
