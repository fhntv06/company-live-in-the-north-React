import React from 'react';
import Faq from '../../components/Faq/Faq';
import styles from './TreeOfCareFaq.module.scss';
import { useGetXmasFaqsQuery } from '../../services/xmasTreeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import PageHeader from '../../components/PageHeader/PageHeader';
import Seo from '../../components/Seo/Seo';

const TreeOfCareFaq = () => {
  const {
    data: faqs, isLoading,
  } = useGetXmasFaqsQuery();

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Ёлка заботы - вопросы и ответы | Живём на севере'} description={'Делай добрые дела в преддверии настоящего северного праздника'} />
      <PageHeader
        withoutControls
        compact
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            Вопросы и ответы
          </h1>
        </div>
      </PageHeader>
      <div className={styles.pageContent}>
        <Faq
          questions={faqs}
        />
      </div>
    </>
  );
};

export default TreeOfCareFaq;
