import React, { useEffect, useState, useRef } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import OrderCardMake from '../../components/OrderCard/OrderCardMake';
import styles from './ProfileOrders.module.scss';
import Button from '../../components/Button/Button';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import { useGetOrdersQuery } from '../../services/profileApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import Seo from '../../components/Seo/Seo';

const ORDERS_LIMIT = 5;

const ProfileOrders = () => {
  const [skip, setSkip] = useState(0);
  const [totalPreviousCount, setTotalPreviousCount] = useState(0);
  const isFirstLoad = useRef(true);
  const [previousOrders, setPreviousOrders] = useState([]);

  const {
    data: currentOrdersData,
    isLoading: isLoadingCurrentOrders,
    isFetching: isFetchingCurrentOrders,
  } = useGetOrdersQuery({ isActive: true });

  const {
    data: previousOrdersData,
    isLoading: isLoadingPreviousOrders,
    isFetching: isFetchingPreviousOrders,
  } = useGetOrdersQuery({ limit: ORDERS_LIMIT, skip, isActive: false }, {
    skip: previousOrders.length >= totalPreviousCount && !isFirstLoad.current,
  });

  // eslint-disable-next-line max-len
  const mergedArray = (arrayOne, arrayTwo) => arrayOne.concat(arrayTwo).filter((item, index, self) => index === self.findIndex((t) => (
    t.id === item.id
  )));

  useEffect(() => {
    if (!previousOrdersData) return;

    setTotalPreviousCount(previousOrdersData.totalCount);

    if (previousOrders.length > 0) {
      setPreviousOrders(mergedArray(previousOrders, previousOrdersData?.orders));
    } else {
      // eslint-disable-next-line max-len
      setPreviousOrders((prevOrders) => [...new Set([...prevOrders, ...previousOrdersData?.orders])]);
    }
  }, [previousOrdersData]);

  const loadMoreHandler = () => {
    isFirstLoad.current = false;
    setSkip((prevSkip) => prevSkip + ORDERS_LIMIT);
  };

  if ((isFirstLoad.current
    && (isFetchingCurrentOrders
      || isLoadingCurrentOrders
      || isFetchingPreviousOrders
      || isLoadingPreviousOrders))) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Личный кабинет | Живём на севере'} description={'Личный кабинет пользователя'} />
      <PageHeader
        withoutControls
        compact
      >
        <h1 className={styles.title}>Мои заказы</h1>
      </PageHeader>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          {currentOrdersData?.orders?.map((order) => (
            <OrderCardMake key={order.id} data={order} />
          ))}
        </div>
        {previousOrders.length > 0 && (
          <div className={styles.overlay}>
            <VisibleWrapper className={styles.overlayMask} />
            <div className={styles.wrapper}>
              <h2 className={styles.subtitle}>Предыдущие заказы</h2>
              {previousOrders.map((order) => (
                <OrderCardMake key={order.id} data={order} previousOrders />
              ))}
            </div>
            {previousOrders.length < totalPreviousCount && (
            <div className={styles.moreButtonWrapper}>
              <SpinnerLoader
                className={styles.spinner}
                isLoading={isFetchingPreviousOrders || isLoadingPreviousOrders}
              />
              <Button onClick={loadMoreHandler} typeButton="button">Показать больше</Button>
            </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileOrders;
