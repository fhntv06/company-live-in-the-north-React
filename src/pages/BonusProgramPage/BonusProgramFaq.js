import React from 'react';
import Faq from '../../components/Faq/Faq';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { useGetBonusesFaqsQuery } from '../../services/profileApi';
import styles from './BonusProgramPage.module.scss';

const BonusProgramFaq = () => {
  const { data: faqs, isLoading } = useGetBonusesFaqsQuery();

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <div className={styles.pageContent}>
      <Faq
        questions={faqs}
      >
        <h1 className={styles.faqTitle}>вопрос-ответ</h1>
      </Faq>
    </div>
  );
};

export default BonusProgramFaq;
