import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import styles from './OrderLine.module.scss';
import { normalizeCost } from '../../helpers/format';

const OrderLine = ({
  className, data,
}) => (
  <div className={`${className} ${styles.line}`}>
    {data.warehouseProduct.mainImagePreview && (
    <div className={styles.imgWrapper}>
      <img
        alt={data.warehouseProduct.name}
        src={data.warehouseProduct.mainImagePreview.url}
      />
    </div>
    )}
    <div className={styles.name}>
      {data.warehouseProduct.name}
    </div>
    <div className={styles.price}>
      <Icon name="coin" />
      <span>
        {normalizeCost(data.sum)}
      </span>
    </div>
    <div className={styles.quantity}>
      x
      {' '}
      <span>
        {data.count}
      </span>
    </div>
  </div>
);

OrderLine.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    count: PropTypes.number,
    sum: PropTypes.number,
    warehouseProduct: {
      mainImagePreview: PropTypes.arrayOf(),
      name: PropTypes.string,
      price: PropTypes.number,
    },
  }).isRequired,
};

OrderLine.defaultProps = {
  className: '',
};

export default OrderLine;
