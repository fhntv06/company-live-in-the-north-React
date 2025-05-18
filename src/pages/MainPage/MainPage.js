import React from 'react';
import classnames from 'classnames';
import OversizedLink from '../../components/OversizedLink/OversizedLink';
import MainProjestSlider from '../../layout/MainPageSliders/MainProjestSlider';
import MainAfishaSlider from '../../layout/MainPageSliders/MainAfishaSlider';
import MainOtherSlider from '../../layout/MainPageSliders/MainOtherSlider';
import OfferFirst from '../../components/OfferFirst/OfferFirst';
import AllEvents from '../../components/AllEvents/AllEvents';
import Button from '../../components/Button/Button';
import DiscussionSortedList from '../../components/Discussion/DiscussionSortedList/DiscussionSortedList';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import styles from './MainPage.module.scss';
import {
  useGetAllCompilationsQuery,
  useGetMainEventsQuery,
} from '../../services/afishaApi';
import MunicipalityDropdown from '../../components/MunicipalityDropdown/MunicipalityDropdown';
import { useGetBannersQuery } from '../../services/bannersApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import Seo from '../../components/Seo/Seo';

const MainPage = () => {
  const { data: sliderEvents } = useGetMainEventsQuery();
  const { data: compilations } = useGetAllCompilationsQuery();
  const {
    data: banners,
    isFetching: isFetchingBanners,
    isLoading: isLoadingBanners,
  } = useGetBannersQuery();

  if (isFetchingBanners || isLoadingBanners) {
    return <MainPreloader />;
  }

  return (
    <>
      <Seo title={'Главная | Живём на Севере - сообщество активных жителей Ямала'} description={'Живём на севере'} />
      <div className={styles.mainPage}>
        <VisibleWrapper className={styles.mainContainerWrapper}>
          <div
            className={styles.container}
          >
            {banners && banners.main && (
            <MainProjestSlider data={banners?.main} />
            )}
          </div>
        </VisibleWrapper>
        {((sliderEvents
        && sliderEvents.length > 0)
        || (compilations
          && compilations.length > 0))
          && (
          <>
            <div className="container">
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  <OversizedLink type="link-big-bold" link="/afisha">Афиша</OversizedLink>
                  <div className={`select__button ${styles.selectButtonWrapper}`}>
                    <MunicipalityDropdown gradient />
                  </div>
                </div>
              </div>
            </div>
            {sliderEvents && <MainAfishaSlider events={sliderEvents} />}
            <div className={`${styles.containerWrapper} container`}>
              <div className={styles.offsetWrapper}>
                {compilations && compilations.length > 0 && (
                <>
                  {compilations.map((item, index) => (
                    <div
                      className={classnames(
                        styles.offset,
                        { [styles.single]: compilations.length === 1 },
                      )}
                    >
                      <OfferFirst
                        to={`/afisha/compilation/${item.id}`}
                        data={item}
                        className={styles.offer}
                        type={index === 0 ? 'color' : 'gray'}
                        size="thin"
                      />
                    </div>
                  ))}
                  <div className={styles.mobilebuttonWrapper}>
                    <Button
                      typeButton="button"
                      className={styles.more}
                      to="/afisha"
                    >
                      все события
                    </Button>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <AllEvents href="/afisha" />
                  </div>
                </>
                )}
              </div>
            </div>
          </>
          )}
        <DiscussionSortedList />
        <div className={`${styles.otherSliderWrapper}`}>
          <div className={styles.mobileTitle}>
            Вы можете быть полезны прямо сейчас
          </div>
          <div className={styles.sliderWrapper}>
            {banners?.project.length && <MainOtherSlider projects={banners.project} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
