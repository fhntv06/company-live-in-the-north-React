/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';
import Wallet from '../Wallet/Wallet';
import styles from './BasketItem.module.scss';
import Icon from '../Icon/Icon';
import { GradientViolet } from '../../helpers/gradients';
import useSwipe from '../../hooks/useSwipe';
import useOutsideClick from '../../hooks/useOutsideClick';
import {
  useDecreaseProductInCartMutation, useDeleteFromCartMutation, useIncreaseProductInCartMutation,
} from '../../services/storeApi';

const linearId = `basket-item-${Math.random()}`;

const BasketItem = ({
  id,
  product,
  count,
  className,
  checked,
  onChecked,
}) => {
  const cardRef = useRef(null);

  const [swiped, setSwiped] = useSwipe(cardRef, { maxMoveDist: 35, maxDist: 120 });
  const [increase, { isLoading: isIncreaseLoading }] = useIncreaseProductInCartMutation();
  const [decrease, { isLoading: isDecreaseLoading }] = useDecreaseProductInCartMutation();
  const [deleteFromCart, { isLoading: isDeletLoading }] = useDeleteFromCartMutation();
  const disabled = !product.amount;

  useOutsideClick(cardRef, () => {
    if (swiped) {
      setSwiped(false);
    }
  });

  const onSelectItem = () => {
    if (disabled) return;

    onChecked(id);
  };

  const onPlusHandler = async (e) => {
    e.stopPropagation();
    try {
      await increase(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onMinusHandler = async (e) => {
    e.stopPropagation();
    try {
      await decrease(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (e) => {
    e.stopPropagation();
    try {
      await deleteFromCart(id).unwrap();
      setSwiped(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardClass = classnames(
    styles.card,
    {
      [styles.checked]: checked,
      [styles.disabled]: disabled,
      [styles.swipe]: swiped,
      [styles.withoutImg]: !product.mainImagePreview,
    },
    className,
  );

  return (
    <div
      className={cardClass}
      ref={cardRef}
    >
      <button className={styles.deleteMobile} onClick={onDeleteHandler} type="button">
        <Icon name="delete" />
      </button>
      <div
        className={styles.item}
        onClick={onSelectItem}
      >
        <div className={styles.checkboxWrapper}>
          <Checkbox checked={checked} onClick={onSelectItem} className={styles.checkbox} />
        </div>
        {product.mainImagePreview && (
          <div className={styles.imgWrapper}>
            <div className={styles.category}>
              {product.category.description}
            </div>
            <img src={product.mainImagePreview.url} alt={product.name} />
          </div>
        )}
        <div
          className={styles.details}
        >
          <div className={styles.text}>
            <div className={styles.category}>
              {product.category.description}
            </div>
            <div className={styles.name}>
              {product.name}
            </div>
          </div>
          <div className={styles.controls}>
            <div className={styles.info}>
              <p className={styles.itemsLeft}>
                осталось:
                {' '}
                <span>
                  {product.amount}
                </span>
              </p>
              <Wallet
                storeGradient
                balance={product.price * count}
                needPlus={false}
                className={styles.wallet}
              />
            </div>
            <div className={styles.count}>
              <button
                type="button"
                className={styles.minus}
                disabled={count === 1 || isDecreaseLoading || isIncreaseLoading || isDeletLoading}
                onClick={onMinusHandler}
              >
                <Icon name="minus" />
              </button>
              <span>{count}</span>
              <button
                type="button"
                className={styles.plus}
                disabled={
                count === +product.amount
                  || isIncreaseLoading
                  || isDecreaseLoading
                  || isDeletLoading
              }
                onClick={onPlusHandler}
              >
                <Icon name="plus" />
              </button>
            </div>
            <button
              className={styles.delete}
              onClick={onDeleteHandler}
              type="button"
              disabled={isDeletLoading || isIncreaseLoading || isDecreaseLoading}
            >
              <Icon name="delete" fill={`url(#${linearId})`}>
                {GradientViolet(linearId, 15.7914, 0.521564, -5.29379e-06, -5.00128e-06)}
              </Icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.number,
    mainImage: PropTypes.shape(),
    mainImagePreview: PropTypes.shape(),
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]).isRequired,
    price: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]).isRequired,
    category: PropTypes.shape({
      description: PropTypes.string,
    }),
  }).isRequired,
  count: PropTypes.number.isRequired,
  checked: PropTypes.bool,
  onChecked: PropTypes.func,
};
BasketItem.defaultProps = {
  className: '',
  checked: false,
  onChecked: () => { },
};

export default BasketItem;
