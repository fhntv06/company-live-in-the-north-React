import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotifications, setReadNotifications, setUnreadNotifications, setNotification, openNotification,
  getUnreadCounter, setIsFetching,
} from '../features/Notification/notificationSlice';
import { useGetAllNotificationsQuery } from '../services/notificationApi';
import { getIsAuth } from '../features/Auth/authSlice';

const useHandleNotifications = () => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const { data: notificationsData, refetch, isFetching } = useGetAllNotificationsQuery(
    undefined, { skip: !isAuth },
  );
  const dispatch = useDispatch();
  const unreadCounter = useSelector((state) => getUnreadCounter(state.notification));
  const prevUnreadCounter = useRef(unreadCounter);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!unreadCounter) return;

    if (unreadCounter > prevUnreadCounter.current) {
      dispatch(openNotification());
      prevUnreadCounter.current = unreadCounter;
    }
  }, [unreadCounter]);

  useEffect(() => {
    if (!isAuth) return;

    refetch();
  }, [pathname]);

  useEffect(() => {
    dispatch(setIsFetching(isFetching));

    if (!notificationsData) return;

    dispatch(setNotifications(notificationsData.notifications));
    dispatch(setReadNotifications(notificationsData.readNotifications));
    dispatch(setUnreadNotifications(notificationsData.unreadNotifications));
    dispatch(setNotification(notificationsData.recentUnreadNotification));
  }, [notificationsData, isFetching]);
};

export default useHandleNotifications;
