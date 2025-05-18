import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';
import styles from './UserNotificationsPage.module.scss';
import { useReadAllNotificationsMutation } from '../../services/notificationApi';
import {
  closeNotification,
  getAllNotifications,
  getUnreadCounter,
} from '../../features/Notification/notificationSlice';
import Seo from '../../components/Seo/Seo';

const UserNotificationsPage = () => {
  const notifications = useSelector((state) => getAllNotifications(state.notification));
  const unreadCounter = useSelector((state) => getUnreadCounter(state.notification));

  const [showCounter, setShowCounter] = useState(10);
  const sortedNotifications = notifications?.slice(0, showCounter);

  const dispatch = useDispatch();

  const showMore = () => {
    setShowCounter((prevState) => prevState + 10);
  };

  const [readAllNotifications] = useReadAllNotificationsMutation();

  const markAsReadHandler = async () => {
    dispatch(closeNotification());
    try {
      await readAllNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Seo title={'Уведомления | Живём на севере'} description={'Уведомления для пользователя'} />
      <PageHeader
        compact
        withoutControls
      >
        <h1 className={styles.title}>Уведомления</h1>
      </PageHeader>
      <div className={styles.page}>
        <div className={styles.row}>
          <Button
            onClick={markAsReadHandler}
            typeButton="button-gray"
            disabled={!unreadCounter}
          >
            Отметить все как прочитанные
          </Button>
        </div>
        <div className={styles.content}>
          {sortedNotifications
           && sortedNotifications.map((item) => (
             <Notification
               key={item.id}
               notification={item}
               className={styles.notification}
             />
           ))}
          {sortedNotifications
            && showCounter <= notifications.length
            && showCounter <= sortedNotifications.length && (
            <div className={styles.buttonWrapper}>
              <Button
                typeButton="button"
                className={styles.button}
                onClick={showMore}
              >
                Показать больше
              </Button>
            </div>
          )}

        </div>
      </div>

    </>
  );
};

export default UserNotificationsPage;
