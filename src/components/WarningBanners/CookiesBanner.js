import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import ModalCloseButton from '../Modal/ModalCloseButton';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './WarningBanners.module.scss';

const CookiesBanner = () => {
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const isCookieBannerClosed = localStorage.getItem('cookieBannerClosed');
    if (isCookieBannerClosed) {
      setIsCookieBannerOpen(false);
    } else {
      setIsCookieBannerOpen(true);
    }
  }, []);

  // eslint-disable-next-line consistent-return
  const submitCookieBanner = (e) => {
    e.stopPropagation();
    if (!isCookieBannerOpen) {
      return;
    }
    setIsCookieBannerOpen(false);
    localStorage.setItem('cookieBannerClosed', true);
  };

  const closeCookieBanner = () => {
    if (isCookieBannerOpen) {
      setIsCookieBannerOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: isCookieBannerOpen ? 1 : 0, translateY: isCookieBannerOpen ? 0 : 20 }}
      exit={{ opacity: 0, translateY: 20 }}
      transition={{ duration: 0.3 }}
      className={classnames(styles.cookiesBanner, { [styles.disabled]: !isCookieBannerOpen })}
    >
      <div className={styles.textContent}>
        <Icon name="warning" className={styles.icon} />
        <p>
          Мы используем cookies и
          {' '}
          собираем технические данные посетителей.
          {' '}
          Вы соглашаетесь с этим, продолжая пользоваться сайтом
        </p>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={submitCookieBanner}
          className={styles.button}
          typeButton="button-fill"
        >
          хорошо
        </Button>
        <a
          href={`${process.env.PUBLIC_URL}/personal-data-processing.pdf`}
          target="_blank"
          className={styles.link}
          rel="noreferrer"
        >
          <div className={styles.name}>
            {isMobile ? 'Подробнее' : 'Подробнее о персональных данных'}
          </div>
        </a>
      </div>
      <ModalCloseButton
        className={styles.closeBtn}
        showOnDesktop
        onClick={closeCookieBanner}
      />

    </motion.div>
  );
};

export default CookiesBanner;
