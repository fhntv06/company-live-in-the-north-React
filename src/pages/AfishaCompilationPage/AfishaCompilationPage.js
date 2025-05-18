/* eslint-disable max-len */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import PageHeader from '../../components/PageHeader/PageHeader';
import CalendarMini from '../../components/Calendar/CalendarMini/CalendarMini';
import styles from './AfishaCompilationPage.module.scss';
import Button from '../../components/Button/Button';
import AfishaCompilationItem from '../../components/AfishaRecomendation/AfishaCompilationItem';
import AfishaCompilation from '../../components/AfishaRecomendation/AfishaCompilation';
import MainAfishaSlider from '../../layout/MainPageSliders/MainAfishaSlider';
import AfishaSpecialOffersSlider from '../../components/AfishaSpecialOffersSlider/AfishaSpecialOffersSlider';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useGetAllCompilationsQuery, useGetCompilationByIdQuery, useGetMainEventsQuery } from '../../services/afishaApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import ShareModal from '../../components/ShareModal/ShareModal';
import Seo from '../../components/Seo/Seo';
import useModal from '../../hooks/useModal';

const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

const AfishaCompilationPage = () => {
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  // eslint-disable-next-line no-unused-vars
  const [select, setSelect] = useState({
    firstSelect: date,
    secondSelect: 0,
  });

  const { data: compilation, isLoading } = useGetCompilationByIdQuery(id);
  const {
    data: otherCompilations,
    isLoading: isOtherCompilationLoading,
  } = useGetAllCompilationsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((item) => item.id !== parseInt(id, 10)),
    }),
  });
  const { data: events, isLoading: isAfishaLoading } = useGetMainEventsQuery();

  if (isLoading || isAfishaLoading || isOtherCompilationLoading) {
    return <MainPreloader />;
  }

  const dates = {
    dateStart: compilation && compilation.dateStartText ? `${moment(compilation.dateStartText).format('DD MMMM')}`.split(' ') : null,
    dateEnd: compilation && compilation.dateEndText ? `${moment(compilation.dateEndText).format('DD MMMM')}`.split(' ') : 0,
  };

  return (
    <>
      <Seo title={'Подборки мероприятий | Живём на севере'} description={'Подборки предложений специально для вас'} />
      <PageHeader
        withoutOffset
        withoutFavoriteButton
        className={styles.header}
        dontMark
      >
        {compilation && compilation.dateStartText && (
          <CalendarMini
            dates={dates}
            select={select}
            className={styles.calendar}
          />
        )}
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{compilation?.name}</h1>
          <p className={styles.titleDesc}>{compilation && compilation.description && parse(compilation.description)}</p>
        </div>
        {!isMobile && (
        <div className={styles.buttonWrapper}>
          <Button
            typeButton="button-white"
            iconName="share"
            onClick={openShareModalHandler}
          >
            поделиться
          </Button>
        </div>
        )}
      </PageHeader>
      <div className={styles.list}>
        {compilation && compilation.offers && compilation.offers.length > 0 && compilation.offers.map((item, index) => (
          <AfishaCompilationItem key={item.id} number={index + 1} item={item} />
        ))}
      </div>
      {(events.length > 0 || otherCompilations.length > 0) && (
        <div className={styles.recommendations}>
          {otherCompilations.length > 0 && (
            <AfishaCompilation
              events={otherCompilations}
              title="Другие подборки"
              description="Подборки предложений специально для вас"
            />
          )}
          {events.length > 0 && (
            <>
              <div className={styles.subtitleRow}>
                <h2 className={styles.subtitle}>Ближайшие мероприятия</h2>
              </div>
              <MainAfishaSlider events={events} />
              <VisibleWrapper className={styles.mask} />
            </>
          )}
        </div>
      )}
      <AfishaSpecialOffersSlider />
      <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
    </>
  );
};

export default AfishaCompilationPage;
