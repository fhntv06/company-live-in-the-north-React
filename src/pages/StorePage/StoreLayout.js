import React, { useMemo } from 'react';
import {
  Link, NavLink, Outlet, useLocation,
} from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { GradientLight } from '../../helpers/gradients';

import PageHeader from '../../components/PageHeader/PageHeader';
import Icon from '../../components/Icon/Icon';
import Seo from '../../components/Seo/Seo';
import styles from './StorePage.module.scss';
import { getIsAuth } from '../../features/Auth/authSlice';

const tabs = [
  {
    id: 1,
    link: '/store',
    name: 'Каталог',
  },
  // {
  //   id: 2,
  //   link: 'partners',
  //   name: 'Партнеры',
  // },
  {
    id: 3,
    link: 'faq',
    name: 'Вопрос-ответ',
  },
];

const getTitle = (page) => {
  switch (page.pathname.split('/').pop()) {
    case 'faq':
      return 'Вопрос-ответ';
    case 'store':
      return 'Магазин';
    default:
      return 'Партнёры';
  }
};

const StoreLayout = () => {
  const path = useLocation();
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const currentPage = useMemo(() => path.pathname.split('/').pop(), [path]);

  return (
    <>
      <Seo title={'Магазин | Живём на севере'} description={'Обменивайте YAMALCOIN на товары'} />
      <PageHeader
        withoutBackLink
        withoutControls
        compact
        className={classnames(
          { [styles.storeHeader]: currentPage === 'store' },
          { [styles.partnersHeader]: currentPage === 'partners' },
          { [styles.fagHeader]: currentPage === 'faq' },
        )}
      >
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{getTitle(path)}</h1>
          <div className={styles.subtitle}>
            Обменивайте
            {' '}
            <Icon name="coin" className={styles.coinIcon} fill="url(#coin-gradient)">
              {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
            </Icon>
            {' '}
            YAMALCOIN на товары
          </div>
        </div>
        {isAuth && (
          <div className={classnames(
            styles.ordersLinkWrapper,
            styles.mobile,
          )}
          >
            <div className={styles.separator} />
            <Link className={styles.tab} to="/profile/orders">Мои заказы</Link>
          </div>
        )}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.link}
                end
                id={tab.id}
                className={
                ({ isActive }) => classnames(
                  { [styles.active]: isActive },
                  styles.tab,
                )
              }
              >
                {tab.name}
              </NavLink>
            ))}
            {isAuth && (
            <div className={classnames(
              styles.ordersLinkWrapper,
              styles.desktop,
            )}
            >
              <div className={styles.separator} />
              <Link className={styles.tab} to="/profile/orders">Мои заказы</Link>
            </div>
            )}
          </div>
        </div>
      </PageHeader>
      <Outlet />
    </>
  );
};

export default StoreLayout;
