import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import BasketItem from '../../components/BasketItem/BasketItem';
import styles from './CartPage.module.scss';
import Button from '../../components/Button/Button';
import Faq from '../../components/Faq/Faq';
import BasketOrderCard from '../../components/BasketOrderCard/BasketOrderCard';
import { useGetCartQuery } from '../../services/profileApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { getBalance } from '../../features/Auth/authSlice';
import {
  useCreateOrderMutation, useDeleteMultipleProductsMutation, useGetStoreFaqsQuery,
} from '../../services/storeApi';
import { createOrder as createOrderAction } from '../../features/Order/orderSlice';
import FaqCard from '../../components/FaqCard/FaqCard';
import AboutOrder from '../../components/AboutOrder/AboutOrder';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balance = useSelector((state) => getBalance(state.auth));
  const point = useSelector((state) => selectPointByType(state, 3));

  const [selectedItems, setSelectedItems] = useState([]);

  const { products, isCartLoading } = useGetCartQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      products: data?.products ?? [],
      isCartLoading: isLoading,
    }),
  });
  const { data: faqs, isLoading: isFaqsLoading } = useGetStoreFaqsQuery();

  const [deleteProducts, { isLoading: isDeleteLoading }] = useDeleteMultipleProductsMutation();
  const [createOrder, { isLoading: isCreateOrderLoading }] = useCreateOrderMutation();

  const totalPrice = useMemo(() => selectedItems.reduce((acc, id) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      return acc + product.sum;
    }

    return acc;
  }, 0) ?? 0, [selectedItems, products]);

  const isSelected = (id) => selectedItems.includes(id);

  const onChecked = (id) => {
    if (isSelected(id)) {
      const newSelectItems = selectedItems.filter((item) => item !== id);
      return setSelectedItems(newSelectItems);
    }

    return setSelectedItems([...selectedItems, id]);
  };

  const onSelectAll = () => {
    const ids = products.filter((item) => item.warehouseProduct.amount > 0)
      .filter((item) => item.count > 0).map((item) => item.id);

    setSelectedItems(ids);
  };

  const removeSelectedProduct = async () => {
    try {
      await deleteProducts(selectedItems).unwrap();
      setSelectedItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateOrder = async () => {
    try {
      const result = await createOrder(selectedItems).unwrap();
      dispatch(createOrderAction(result));
      navigate('/order');
    } catch (error) {
      console.log(error);
    }
  };

  if (isCartLoading && !isFaqsLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <PageHeader
        withoutBackLink
        withoutControls
        compact
      >
        <h1>Корзина</h1>
      </PageHeader>
      <div className="page-content--bottom-80">
        {products.length > 0 ? (
          <>
            <div className={styles.row}>
              <div className={styles.controls}>
                <Button
                  typeButton="button-gray"
                  onClick={onSelectAll}
                >
                  выбрать все
                </Button>
                <Button
                  typeButton="button-gray"
                  iconName="delete"
                  onClick={removeSelectedProduct}
                  disabled={!selectedItems.length || isDeleteLoading}
                >
                  Удалить выбранное
                </Button>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.products}>
                {products.map((product) => (
                  <BasketItem
                    product={product.warehouseProduct}
                    id={product.id}
                    count={product.count}
                    checked={isSelected(product.id)}
                    onChecked={onChecked}
                  />
                ))}
              </div>
              <BasketOrderCard
                className={styles.basketOrderCard}
                balance={balance}
                price={totalPrice}
                onClick={onCreateOrder}
                isDisabled={!selectedItems.length}
                isLoading={isCreateOrderLoading || isDeleteLoading}
              />
            </div>
          </>
        ) : (
          <div className={styles.row}>
            <h1 className={styles.emptyTitle}>Ваша корзина пуста</h1>
          </div>
        )}
        <div className={styles.row}>
          <Faq questions={faqs}>
            {!!point && (
              <FaqCard title="Как и где получить заказ?">
                <AboutOrder
                  data={point}
                />
              </FaqCard>
            )}
          </Faq>
        </div>
      </div>
    </>
  );
};

export default CartPage;
