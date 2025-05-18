import React from 'react';
import PropTypes, {
  arrayOf, shape, string,
} from 'prop-types';

import OrderLine from '../OrderLine/OrderLine';
import CopyrightPartner from '../CopyrightPartner/CopyrightPartner';

import styles from './OrderCard.module.scss';

const OrderCard = ({
  className,
  data,
}) => (
  <div className={`${styles.order} ${className}`}>
    <div className={styles.content}>
      <div
        className={styles.top}
      >
        <div className={styles.orderNumber}>
          заказ
          {data.orderNo && (
            <>
              {' '}
              &#8470;
              {' '}
              {data.orderNo}
            </>
          )}
        </div>
        {data.partner && (
          <CopyrightPartner className={styles.partner} partner={data.partner} />
        )}
      </div>
      <div className={styles.orders}>
        {data.cartProducts.map((item) => (
          <OrderLine key={item.id} className={styles.orderLine} data={item} />
        ))}
      </div>
    </div>
  </div>
);

OrderCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    orderNo: PropTypes.number,
    status: PropTypes.string,
    dateOrder: PropTypes.string,
    partner: shape({
      name: string.isRequired,
      links: arrayOf(shape({
        name: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
      })),
    }),
    cartProducts: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })).isRequired,
  }).isRequired,
};

OrderCard.defaultProps = {
  className: '',
};

export default OrderCard;
