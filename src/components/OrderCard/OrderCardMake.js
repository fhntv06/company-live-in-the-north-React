import React, { useState } from 'react';
import PropTypes, {
  arrayOf, shape, string,
} from 'prop-types';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import plural from 'plural-ru';
import OrderLine from '../OrderLine/OrderLine';
import Icon from '../Icon/Icon';
import CopyrightPartner from '../CopyrightPartner/CopyrightPartner';
import AboutOrder from '../AboutOrder/AboutOrder';

import { GradientLight } from '../../helpers/gradients';

import styles from './OrderCard.module.scss';
import { normalizeCost } from '../../helpers/format';
import { useCancelOrderMutation } from '../../services/profileApi';
import { setNewBalance } from '../../features/Auth/authSlice';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';
import useMediaQuery from '../../hooks/useMediaQuery';

const OrderCardMake = ({
  className,
  data,
  previousOrders,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const point = useSelector((state) => selectPointByType(state, 3));
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [cancelOrder] = useCancelOrderMutation();

  const onCancelClick = async () => {
    try {
      const result = await cancelOrder(data.id).unwrap();
      if (result.success) {
        dispatch(setNewBalance(result.bonus_count));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusClass = () => {
    switch (data.status.value) {
      case 1:
        return styles.treatment;
      case 2:
        return styles.ready;
      case 3:
        return styles.received;
      case 4:
        return styles.canceled;
      default:
        return styles.withStatus;
    }
  };

  return (
    <div className={classnames(styles.order, styles.orderMake, statusClass(), className)}>
      <div
        className={`${styles.top} ${styles.topWithStatus}`}
        onClick={() => setOpen((prev) => !prev)}
        role="presentation"
      >
        <div className={styles.orderNumber}>
          заказ №
          {data.orderNo}
        </div>
        <div className={styles.date}>
          {moment(data.createdAt).utc().format('L')}
        </div>
        <div className={styles.status}>
          <Icon className={styles.cancelIcon} name="cancel-rounded" />
          <Icon className={styles.checkIcon} name="check-rounded" />
          <span>
            {data.status.description}
          </span>
        </div>
        {open ? (
          <motion.div
          // layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            className={styles.partner}
          >
            {data.partner && (
              <CopyrightPartner partner={data.partner} />
            )}
          </motion.div>
        ) : (
          <motion.div
            // layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            className={styles.topSum}
          >
            <Icon name="coin" />
            <span>
              {normalizeCost(data.totalSum)}
            </span>
            {!isMobile && (
            <span>
              {data.orderProducts.length}
              {' '}
              { plural(data.orderProducts.length, 'товар', 'товара', 'товаров') }
            </span>
            )}
          </motion.div>
        )}
        <Icon name="dropdown-arrow" className={styles.topToggleArrow} />
      </div>
      <div className={classnames(styles.content, { [styles.open]: open })}>
        <div className={styles.orders}>
          {data.orderProducts.map((item) => (
            <OrderLine key={item.id} className={styles.orderLine} data={item} />
          ))}
        </div>
        <div className={styles.sum}>
          <Icon name="coin" fill="url(#order-confirm-gradient)">
            {GradientLight('order-confirm-gradient', 2.66927, 29.3359, 2.66797, 2.66797)}
          </Icon>
          <span>
            {normalizeCost(data.totalSum)}
          </span>
        </div>
        {
          !!point && !previousOrders
          && (
          <AboutOrder
            className={styles.orderMakeInfo}
            title="Где забрать заказ?"
            data={point}
            qr={
              data.qrCode ? {
                orderNo: data.orderNo,
                qrCode: data.qrCode,
              } : null
}
          />
          )
        }
        {(data.status.value === 1 || data.status.value === 2) && data.isPhysical && (
          <button
            type="button"
            className={styles.buttonCancel}
            onClick={onCancelClick}
          >
            Отменить заказ
          </button>
        )}
      </div>
    </div>
  );
};

OrderCardMake.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    orderNo: PropTypes.number,
    status: PropTypes.string,
    createdAt: PropTypes.string,
    isPhysical: PropTypes.bool,
    partner: shape({
      name: string.isRequired,
      links: arrayOf(shape({
        name: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
      })),
    }),
    qrCode: PropTypes.string,
    totalSum: PropTypes.number,
    orderProducts: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })).isRequired,
  }).isRequired,
  previousOrders: PropTypes.bool,
};

OrderCardMake.defaultProps = {
  className: '',
  previousOrders: false,
};

export default OrderCardMake;
