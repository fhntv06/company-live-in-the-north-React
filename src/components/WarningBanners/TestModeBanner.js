import React, { useState } from 'react';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import ModalCloseButton from '../Modal/ModalCloseButton';
import Icon from '../Icon/Icon';
import styles from './WarningBanners.module.scss';

const TestModeBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = (e) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <AnimatePresence mode="wait">
      { isOpen && (
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, translateY: isOpen ? 0 : 20 }}
        exit={{ opacity: 0, translateY: 20 }}
        transition={{ duration: 0.3 }}
        className={classnames(styles.testModeBanner, { [styles.disabled]: !isOpen })}
      >
        <Icon name="warning-white" className={styles.icon} />
        <p>Сайт работает в тестовом режиме</p>
        <ModalCloseButton
          className={styles.closeBtn}
          showOnDesktop
          white
          onClick={closeHandler}
        />
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestModeBanner;
