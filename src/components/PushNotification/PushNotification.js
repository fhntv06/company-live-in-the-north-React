import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import plural from 'plural-ru';
import ModalCloseButton from '../Modal/ModalCloseButton';
import styles from './PushNotification.module.scss';
import Icon from '../Icon/Icon';
import {
  closeNotification,
  getNotificationIsClosedState,
  getRecentUnreadNotification,
  getUnreadCounter,
} from '../../features/Notification/notificationSlice';
import { getIsAuth } from '../../features/Auth/authSlice';
import { useLazyGetUserQuery } from '../../services/authApi';

const PushNotification = ({
  type, children, className,
}) => {
  const [isOpen, setIsOpen] = useState(type === 'warning');
  const notification = useSelector((state) => getRecentUnreadNotification(state.notification));
  const unreadCounter = useSelector((state) => getUnreadCounter(state.notification));
  const notificationIsClosed = useSelector(
    (state) => getNotificationIsClosedState(state.notification),
  );
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [getUserTrigger] = useLazyGetUserQuery();

  useEffect(() => {
    if (type === 'warning') return;

    if (
      pathname === '/profile'
      || pathname === '/profile/notifications'
      || !unreadCounter
      || !isAuth
    ) {
      setIsOpen(false);
    } else {
      setIsOpen(!notificationIsClosed);
      getUserTrigger();
    }
  }, [notificationIsClosed, unreadCounter, type, pathname, isAuth]);

  const closeNotificationHandler = (e) => {
    e.stopPropagation();

    if (type === 'warning' || type === 'otherMunicipality') {
      setIsOpen(false);
      return;
    }

    dispatch(closeNotification());
  };

  const navigateHandler = () => {
    if (type === 'warning' || type === 'otherMunicipality') return;

    navigate(`${process.env.PUBLIC_URL}/profile/notifications`);
  };

  const renderContent = children ? (
    <>
      <Icon name="warning-white" className={styles.icon} />
      { children }
    </>
  ) : (
    <>
      <Icon name="bell" className={styles.icon} />
      <p>
        {notification?.data.subject}
        <br />
        { unreadCounter - 1 ? (
          <Link to={`${process.env.PUBLIC_URL}/profile/notifications`} className={styles.unreadNotifications}>
            Еще
            {' '}
            {plural(unreadCounter - 1, '%d непрочитанное', '%d непрочитанных')}
          </Link>
        ) : null }
      </p>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      { (isOpen) && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.5 }}
          className={classNames(
            styles.wrapper,
            className,
            { [styles.warning]: type === 'warning' || type === 'otherMunicipality' },
          )}
          onClick={navigateHandler}
          role="presentation"
        >
          <div className={styles.content}>
            { renderContent }
          </div>
          <ModalCloseButton
            className={styles.closeBtn}
            showOnDesktop
            white
            onClick={closeNotificationHandler}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PushNotification.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

PushNotification.defaultProps = {
  className: '',
  children: null,
  type: null,
};

export default PushNotification;
