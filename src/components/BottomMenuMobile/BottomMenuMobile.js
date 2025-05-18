import React from 'react';
import { useSelector } from 'react-redux';
import BottomMenuItem from './BottomMenuItem';
import {
  MessagesGradient,
  CalendarGradient,
  CartGradient,
  CardsGradient,
  ProfileGradient,
} from './BottomMenuIcons';
import { getIsAuth, getUser } from '../../features/Auth/authSlice';
import styles from './BottomMenuMobile.module.scss';

const menuList = [
  { name: 'Обсуждения', img: <MessagesGradient />, href: '/discussions' },
  { name: 'Афиша', img: <CalendarGradient />, href: '/afisha' },
  { name: 'Меню', img: <CardsGradient />, href: '/menu' },
  { name: 'Магазин', img: <CartGradient />, href: '/store' },
  { name: 'Профиль', img: <ProfileGradient />, href: '/profile' },
];

const BottomMenuMobile = () => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const user = useSelector(getUser);

  return (
    <div className={styles.container}>
      {menuList.map((item) => <BottomMenuItem isAuth={isAuth} user={user} {...item} />)}
    </div>
  );
};

export default BottomMenuMobile;
