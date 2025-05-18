import React from 'react';
import CookiesBanner from './CookiesBanner';
import TestModeBanner from './TestModeBanner';
import styles from './WarningBanners.module.scss';

const WarningBanners = () => (
  <div className={styles.wrapper}>
    <CookiesBanner />
    <TestModeBanner />
  </div>
);

export default WarningBanners;
