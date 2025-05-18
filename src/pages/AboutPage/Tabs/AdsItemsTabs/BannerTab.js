import React from 'react';
import styles from './BannerTab.module.scss';
import bannerImg from '../../../../images/banner-sample.png';
import DocumentLink from '../../../../components/Documents/DocumentLink';
import TabWrapper from '../TabWrapper';

const documents = [
  {
    href: `${process.env.PUBLIC_URL}/images/Баннер.png`,
  },
  {
    href: `${process.env.PUBLIC_URL}/images/Баннер.pdf`,
  },
  {
    href: `${process.env.PUBLIC_URL}/images/Баннер.ai`,
  },
];

const BannerTab = () => (
  <TabWrapper>
    <div className={styles.info}>
      <h3 className={styles.title}>
        Базовые наборы баннеров представлены в двух форматах: PDF и PNG.
      </h3>
      <p className={styles.text}>
        PNG не следует использовать при печати, воспользуйтесь форматом PDF.
      </p>
      <div className={styles.documents}>
        {documents.map((document) => <DocumentLink href={document.href} />)}
      </div>
    </div>
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <img src={bannerImg} alt="banner" className={styles.image} />
      </div>
    </div>
  </TabWrapper>
);

export default BannerTab;
