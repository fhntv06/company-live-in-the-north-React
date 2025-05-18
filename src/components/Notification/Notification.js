import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import parseHtml from 'html-react-parser';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './Notification.module.scss';
import { useReadNotificationMutation } from '../../services/notificationApi';

const Notification = ({ notification, className }) => {
  const [read, setRead] = useState(notification.read_at);
  const contentRef = useRef();
  const [open, setOpen] = useState(false);
  const [readNotification] = useReadNotificationMutation();

  const readNotificationHandler = async () => {
    if (notification.read_at) return;
    setRead(true);

    try {
      await readNotification(notification.id);
    } catch (error) {
      console(error);
    }
  };

  const openHandler = (e) => {
    e.stopPropagation();
    setOpen(true);
    readNotificationHandler();
  };

  const closeHandler = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div
      className={classnames(
        styles.wrapper,
        {
          [styles.open]: open,
          [styles.new]: !notification.read_at && !read,
        },
        className,
      )}
      role="button"
      onClick={open ? closeHandler : openHandler}
      tabIndex="-1"
      onKeyUp={() => {}}
    >
      <div className={styles.top}>
        <p className={styles.title}>{notification.data.subject}</p>
        <p className={styles.date}>{moment(notification.created_at).utc().format('L')}</p>
        <Button className={styles.dropdownBtn} onClick={open ? closeHandler : openHandler}>
          <Icon name="dropdown-arrow" className={styles.chevron} />
        </Button>
      </div>
      <AnimatePresence>
        {open && (
        <motion.p
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            height: 'auto',
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          ref={contentRef}
          className={classnames(
            styles.content,
          )}
        >
          <div className={styles.line} />
          {parseHtml(notification.data.message)}
        </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      subject: PropTypes.string,
      message: PropTypes.string,
    }),
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    read_at: PropTypes.bool,
  }).isRequired,
  className: PropTypes.string,
};

Notification.defaultProps = {
  className: '',
};

export default Notification;
