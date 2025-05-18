import React from 'react';
import styles from './GuidelineTab.module.scss';
import DocumentLink from '../../../../components/Documents/DocumentLink';
import TabWrapper from '../TabWrapper';

const documents = [
  {
    href: `${process.env.PUBLIC_URL}/images/Гайдлайн.pdf`,
  },

];

const GuidelineTab = () => (
  <TabWrapper>
    <div className={styles.info}>
      <h3 className={styles.title}>
        Гайдлайн призван помочь дизайнерам использовать фирменный стиль портала
      </h3>
      <p className={styles.text}>
        В файле представлены как примеры оформления внешних рекламных поверхностей,
        таких как билборд и ролл-ап, так и примеры
        использования фирменного стиля в цифровой среде и на сувенирной продукции.
      </p>
      <div className={styles.documents}>
        {documents.map((document) => <DocumentLink href={document.href} />)}
      </div>
    </div>
  </TabWrapper>
);

export default GuidelineTab;
