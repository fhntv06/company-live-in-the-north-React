import React, { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import OrderCard from '../../components/OrderCard/OrderCard';
import Icon from '../../components/Icon/Icon';
import AboutOrder from '../../components/AboutOrder/AboutOrder';
import Modal from '../../components/Modal/Modal';

import { GradientLight } from '../../helpers/gradients';

import styles from './OrderPage.module.scss';
import { normalizeCost } from '../../helpers/format';
import { useConfirmOrderMutation } from '../../services/storeApi';
import { setNewBalance } from '../../features/Auth/authSlice';
import useModal from '../../hooks/useModal';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';
import { selectOrderData, confirm as confirmAction, clear } from '../../features/Order/orderSlice';
import useMediaQuery from '../../hooks/useMediaQuery';

const OrderPage = () => {
  const numberOrders = useRef('');
  const state = useSelector(selectOrderData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const point = useSelector((s) => selectPointByType(s, 3));
  const isMobile = useMediaQuery('(max-width: 767px)');

  const {
    isOpen: isOrderModalOpen, openModalHandler: openOrderModalHandler,
    closeModalHandler: closeOrderModalHandler,
  } = useModal();

  const [confirm] = useConfirmOrderMutation();

  useEffect(() => {
    if (!state || state.confirmed) {
      dispatch(clear());
      navigate('/', { replace: true });
    }
  }, []);

  const closeModal = () => {
    closeOrderModalHandler();
    navigate('/profile/orders', { replace: true });
  };

  const confirmOrder = async () => {
    const data = state.orders.map((order) => ({
      cart_product_ids: order.cartProducts.map((item) => item.id),
    }));

    try {
      const result = await confirm(data).unwrap();
      if (result.success) {
        openOrderModalHandler(true);
        numberOrders.current = result.data.reduce((current, order) => [
          ...current,
          order.order_no,
        ], []);
        dispatch(confirmAction());
        dispatch(setNewBalance(result.bonus_count));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        compact
        withoutControls={isMobile}
      >
        <h1 className={styles.pageTitle}>Оформление заказа</h1>
      </PageHeader>
      <div className={`${styles.page} page-content`}>
        {
          state.orders.map((item) => (
            <div className={styles.row}>
              <OrderCard key={item.id} data={item} />
            </div>
          ))
        }
        <div className={styles.confirmation}>
          <div className={styles.price}>
            <Icon name="coin" className={styles.coinIcon} fill="url(#coin-gradient)">
              {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
            </Icon>
            <p>
              {normalizeCost(state.totalSum)}
            </p>
          </div>
          <Button
            typeButton="button-fill"
            onClick={confirmOrder}
            disabled={state.confirmed}
          >
            подтвердить заказ
          </Button>
        </div>
      </div>
      {!!point && (
        <Modal
          isOpen={isOrderModalOpen}
          onClose={closeModal}
        >
          <AboutOrder
            numberOrders={numberOrders.current}
            className={styles.confirmOrder}
            modal
            data={point}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default OrderPage;
