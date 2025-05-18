import React from 'react';
import { useSelector } from 'react-redux';
import Faq from '../../components/Faq/Faq';
import styles from './StorePage.module.scss';
import { useGetStoreFaqsQuery } from '../../services/storeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import FaqCard from '../../components/FaqCard/FaqCard';
import AboutOrder from '../../components/AboutOrder/AboutOrder';
import Seo from '../../components/Seo/Seo';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';

const StorePage = () => {
  const { data: faqs, isLoading } = useGetStoreFaqsQuery();
  const point = useSelector((state) => selectPointByType(state, 3));

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Вопросы и ответы | Живём на севере'} description={'Обменивайте YAMALCOIN на товары'} />
      <div className={styles.pageContent}>
        <Faq
          questions={faqs}
          className={styles.faqWrapper}
        >
          {!!point && (
            <FaqCard title="Как и где получить заказ?">
              <AboutOrder data={point} />
            </FaqCard>
          )}
        </Faq>
      </div>
    </>

  );
};

export default StorePage;
