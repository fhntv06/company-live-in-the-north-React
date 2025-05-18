/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesAfishaTab.module.scss';
import Button from '../../../../components/Button/Button';
import { useGetAllEventsQuery } from '../../../../services/afishaApi';
import EventCardSmall from '../../../../components/Event/EventCardSmall/EventCardSmall';
import TabWrapper from '../TabWrapper';
import TabLoader from '../TabLoader';

const ServicesAfishaTab = () => {
  const navigate = useNavigate();

  const {
    data: eventsData,
    isFetching: isFetchingEvents,
    isLoading: isLoadingEvents,
  } = useGetAllEventsQuery({
    limit: 2,
  });

  return (
    <TabWrapper disableAnimation={isFetchingEvents || isLoadingEvents}>
      <div className={styles.info}>
        <h3 className={styles.title}>
          В «Афише» публикуются культурные, развлекательные и спортивные мероприятия со всего Ямала.
        </h3>
        <p className={styles.infoText}>
          События распределены по населенным пунктам и тематическим категориям, имеют подробное описание и ссылку на покупку билетов онлайн.
        </p>
        <p className={styles.infoText}>
          Заявку на публикацию мероприятия в Афише может подать любой организатор с помощью специальной формы.
        </p>
      </div>
      <TabLoader isLoading={isFetchingEvents || isLoadingEvents} />
      <div className={styles.cards}>
        <>
          {eventsData && eventsData?.data?.map((event, index) => (
            <EventCardSmall
              data={event}
              type={!event.mainImage && index % 2 !== 0 && 'gradient'}
              typeEvent={event.type}
              className={styles.card}
            />
          ))}
        </>
      </div>
      <div className={styles.actions}>
        <Button
          typeButton="button"
          className={styles.button}
          onClick={() => {
            navigate('/afisha');
          }}
        >
          Все события
        </Button>
      </div>
    </TabWrapper>
  );
};

export default ServicesAfishaTab;
