import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AfishaPreview from '../../components/AfishaPreview/AfishaPreview';
import AfishaTabs from '../../components/AfishaTabs/AfishaTabs';
import AfishaAbout from '../../components/AfishaTabs/AfishaAbout/AfishaAbout';
import AfishaInfo from '../../components/AfishaTabs/AfishaInfo/AfishaInfo';
import AfishaSchedule from '../../components/AfishaTabs/AfishaShedule/AfishaSсhedule';
import AfishaReviews from '../../components/AfishaTabs/AfishaReviews/AfishaReviews';
import AfishaOtherEventsSlider from '../../components/AfishaOtherEventsSlider/AfishaOtherEventsSlider';
import AfishaSpecialOffersSlider from '../../components/AfishaSpecialOffersSlider/AfishaSpecialOffersSlider';
import MainAfishaSlider from '../../layout/MainPageSliders/MainAfishaSlider';
import styles from './AfishaEventPage.module.scss';
import { useGetEventByIdQuery, useGetPushkinCardEventsQuery, useGetSimilarEventsQuery } from '../../services/afishaApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import ShareModal from '../../components/ShareModal/ShareModal';
import Seo from '../../components/Seo/Seo';
import removeTags from '../../helpers/removeTags';
import useModal from '../../hooks/useModal';

const AfishaEventPage = () => {
  const { id } = useParams();
  const { data: event, isLoading, isFetching } = useGetEventByIdQuery(id);

  const { data: pushkinCardEvents } = useGetPushkinCardEventsQuery(event?.id, {
    selectFromResult: ({ data }) => ({
      data: data?.map((item, index) => ({
        ...item,
        type: 'event',
        variant: index === 0 ? 'soon' : 'actual',
      })),
    }),
    skip: !event,
  });
  const { data: similarEvents } = useGetSimilarEventsQuery(event?.afishaCategory.id, {
    skip: isLoading,
    selectFromResult: ({ data }) => {
      const filtered = data?.filter((item) => item.slug !== id);

      return {
        data: filtered?.map((item) => ({ ...item, type: 'event-small' })),
      };
    },
  });

  const [activeTab, setActiveTab] = useState(0);
  const scheduleRef = useRef(null);
  const scheduleScroll = useRef(false);

  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  const tabs = [
    {
      id: 0,
      name: 'о событии',
      smallName: 'событии',
      content: AfishaAbout,
      additionalProps: {
        sheduleRef: scheduleRef,
        sheduleScroll: scheduleScroll,
      },
    },
    {
      id: 1,
      name: 'подробно',
      content: AfishaInfo,
      additionalProps: {
        openShareModal: openShareModalHandler,
      },
      disabled: (
        event
        && !event.fullDescription
        && !event.fullDescriptionLead
        && !event.fullDescriptionMainMedia
        && !event.fullDescriptionSource
      ),
    },
    {
      id: 2,
      name: 'расписание',
      content: AfishaSchedule,
      additionalProps: {
        schedule: event ? event.afishaPlaces : [],
        organizer: event ? event.organizer : {},
        saleLink: event ? event.saleLink : null,
        price: event ? event.price : null,
        dateEnd: event ? event.dateEnd : null,
        dateStart: event ? event.dateStart : null,
      },
      disabled: event && (event.afishaPlaces.length === 0 || !event.afishaPlaces),
    },
    {
      id: 3,
      name: 'отзывы',
      cl: '',
      content: AfishaReviews,
      additionalProps: {},
    },
  ];

  const goToSchedule = (e) => {
    e.preventDefault();
    if (activeTab === 0 && scheduleRef.current) {
      const top = scheduleRef.current.offsetTop;
      window.scrollTo({
        left: 0,
        top,
        behavior: 'smooth',
      });
    } else {
      setActiveTab(2);
    }
  };

  if (isLoading || isFetching) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={event.name} description={removeTags(event.description ?? event.content)} />
      <AfishaPreview
        data={event}
        goToScheduleClick={goToSchedule}
        openShareModal={openShareModalHandler}
      />
      <AfishaTabs
        data={event}
        activeTab={activeTab}
        selectTab={setActiveTab}
        sheduleRef={scheduleRef}
        sheduleScroll={scheduleScroll}
        tabs={tabs}
      />
      <div className={styles.recommendations}>
        <VisibleWrapper className={styles.mask} />
        <div className={styles.slider}>
          {similarEvents && (
            <AfishaOtherEventsSlider data={similarEvents} />
          )}
        </div>
        {pushkinCardEvents && (
          <>
            <h2 className={styles.subtitle}>Пушкинская карта</h2>
            <div className={styles.slider}>
              <MainAfishaSlider events={pushkinCardEvents} />
            </div>
          </>
        )}
      </div>
      <AfishaSpecialOffersSlider />
      <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
    </>
  );
};

export default AfishaEventPage;
