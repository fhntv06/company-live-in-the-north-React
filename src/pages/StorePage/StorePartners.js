import React from 'react';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import styles from './StorePage.module.scss';
import { useGetPartnersQuery } from '../../services/storeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import Seo from '../../components/Seo/Seo';

const StorePage = () => {
  const { data: partners, isLoading } = useGetPartnersQuery();

  if (isLoading) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Партнёры магазина | Живём на севере'} description={'Обменивайте YAMALCOIN на товары'} />
      <div className={styles.pagePartners}>
        <div className={styles.cards}>
          {partners.map((partner) => (
            <PlaceCard
              key={partner.id}
              data={partner}
              className={styles.partnerCard}
              dontMark
              withoutLink
              withoutMark
            />
          ))}
        </div>
      </div>
    </>

  );
};

export default StorePage;
