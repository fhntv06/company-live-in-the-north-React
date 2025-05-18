import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './ReservedGifts.module.scss';
import { useGetCareExecutionsQuery } from '../../services/xmasTreeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import Seo from '../../components/Seo/Seo';
import ReservedGift from '../../components/ReservedGift/ReservedGift';

const ReservedGifts = () => {
  const { data: execution, isLoading } = useGetCareExecutionsQuery();

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Забронированные подарки | Живём на севере'} description={'Личный кабинет пользователя'} />
      <PageHeader
        withoutControls
        compact
      >
        <h1 className={styles.title}>забронированные подарки</h1>
      </PageHeader>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          {execution?.map((item) => (
            <ReservedGift key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservedGifts;
