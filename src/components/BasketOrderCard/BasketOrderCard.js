import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

import { GradientLight } from '../../helpers/gradients';

import styles from './BasketOrderCard.module.scss';
import { normalizeCost } from '../../helpers/format';

const BasketOrderCard = ({
  price, isDisabled, balance, onClick, isLoading, className,
}) => (
  <div className={classNames(
    styles.card,
    className,
  )}
  >
    <p className={styles.text}>
      выбрано товаров на сумму
    </p>
    <div className={styles.priceWrapper}>
      <Icon name="coin" className={styles.coinIcon} fill="url(#coin-gradient)">
        {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
      </Icon>
      <p className={styles.price}>
        {normalizeCost(price)}
      </p>
      <p className={styles.balance}>
        {normalizeCost(balance)}
      </p>
    </div>
    <Button
      typeButton="button-fill"
      onClick={onClick}
      disabled={price > balance || isLoading || isDisabled}
      className={styles.button}
    >
      оформить заказ
    </Button>
    <div className={styles.warning}>
      <Icon name="warning-gradient" className={styles.warningIcon} fill="url(#coin-gradient)" stroke="url(#coin-gradient)">
        {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
      </Icon>
      {price > balance
        ? (
          <p className={styles.flaw}>
            На вашем счете недостаточно Ямалкоинов. Попробуйте оформить в заказ товары
            на меньшую сумму.
          </p>
        )
        : (
          <ol className={styles.list}>
            <li className={styles.listItem}>
              Товары от разных партнёров мы оформим в разные заказы
            </li>
            <li className={styles.listItem}>
              Купоны и сертификаты не подлежат возврату
            </li>
          </ol>
        )}
    </div>
  </div>
);

BasketOrderCard.propTypes = {
  price: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

BasketOrderCard.defaultProps = {
  isLoading: false,
  isDisabled: false,
  className: '',
};

export default BasketOrderCard;
