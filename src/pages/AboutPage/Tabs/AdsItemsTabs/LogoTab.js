import React from 'react';
import styles from './LogoTab.module.scss';
import bearsImg from '../../../../images/zhns_bears.png';
import DocumentLink from '../../../../components/Documents/DocumentLink';
import TabWrapper from '../TabWrapper';

const documents = [
  {
    href: `${process.env.PUBLIC_URL}/images/Логотип.png`,
  },
  {
    href: `${process.env.PUBLIC_URL}/images/Логотип.pdf`,
  },
  {
    href: `${process.env.PUBLIC_URL}/images/Логотип.svg`,
  },
  {
    href: `${process.env.PUBLIC_URL}/images/Логотип.eps`,
  },
];

const LogoTab = () => (
  <TabWrapper>
    <div className={styles.info}>
      <h3 className={styles.title}>
        Логотип представляется в трех форматах: векторные SVG, EPS
        и растровый PNG.
      </h3>
      <p className={styles.text}>
        PNG не следует использовать при печати, воспользуйтесь одним
        из векторых форматов.
      </p>
      <div className={styles.documents}>
        {documents.map((document) => <DocumentLink href={document.href} />)}
      </div>
    </div>
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <img src={bearsImg} alt="zhns_bears" className={styles.image} />
      </div>
    </div>
  </TabWrapper>
);

export default LogoTab;
