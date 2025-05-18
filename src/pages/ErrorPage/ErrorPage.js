import React, { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  useEffect(() => {
    disableBodyScroll(document.body, {
      reserveScrollBarGap: true,
    });

    return () => {
      enableBodyScroll(document.body);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.text}>
        <h2 className={styles.title}>
          Такой страницы не существует
        </h2>
        <p className={styles.description}>
          Попробуйте воспользоваться меню, либо перейти на
          {' '}
          <Link to="/">главную страницу</Link>
          {' '}
          сайта.
        </p>
      </div>
      <div className={styles.decoration}>
        <div>4</div>
        <div>0</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default ErrorPage;
