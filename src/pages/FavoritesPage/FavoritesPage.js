import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import styles from './FavoritesPage.module.scss';

import DiscussionCard from '../../components/Discussion/DiscussionCard/DiscussionCard';
import DiscussionItem from '../../components/Discussion/DiscussionItem/DiscussionItem';
import EventCardSmall from '../../components/Event/EventCardSmall/EventCardSmall';
import ProductCard from '../../components/ProductCard/ProductCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import TabButton from '../../components/TabButton/TabButton';
import useMediaQuery from '../../hooks/useMediaQuery';
import { getIsAuth } from '../../features/Auth/authSlice';
import Seo from '../../components/Seo/Seo';
import { useGetFavoritesQuery } from '../../services/profileApi';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';

const tabs = [
  {
    id: 0,
    name: 'обсуждения',
    types: ['activities'],
  },
  {
    id: 1,
    name: 'события',
    types: ['event'],
  },
  {
    id: 2,
    name: 'товары',
    types: ['product'],
  },
  {
    id: 3,
    name: 'места',
    types: ['place'],
  },
];

const viewItem = (item, isAuth, index, isMobile) => {
  switch (item.favorableType) {
    case 'Discussion':
    case 'Voting':
      return (
        <>
          {isMobile ? (
            <DiscussionItem
              key={item.favorable.id}
              className={classnames(
                styles.card,
                { [styles.discussionItem]: item.favorableType === 'Discussion' },
              )}
              data={item.favorable}
              type={item.favorableType.toLowerCase()}
              isAuth={isAuth}
            />
          ) : (
            <DiscussionCard
              key={item.favorable.id}
              isAuth={isAuth}
              type={item.favorableType.toLowerCase()}
              data={item.favorable}
              className={classnames(
                styles.card,
                { [styles.discussionCard]: item.favorableType === 'Discussion' },
              )}
            />
          )}
        </>

      );
    case 'AfishaEvent':
      return (
        <EventCardSmall
          key={item.favorable.id}
          data={item.favorable}
          type={!item.favorable.mainImage && index % 2 !== 0 && 'gradient'}
          className={styles.card}
        />
      );
    case 'AfishaPlace':
      return (
        <PlaceCard
          key={item.favorable.id}
          data={item.favorable}
          link={`/afisha/place/${item.favorable.id}`}
          className={styles.card}
          desktopMode
        />
      );
    case 'WarehouseProduct':
      return (
        <ProductCard
          key={item.favorable.id}
          product={item.favorable}
          className={styles.card}
        />
      );
  }
  return null;
};

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const isMobile = useMediaQuery('(max-width: 757px)');
  const containerRef = useRef(null);

  const {
    data: favorites, isLoading, isSuccess, refetch,
  } = useGetFavoritesQuery();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      switch (activeTab) {
        case 0:
          setSortedData(favorites.activities);
          break;
        case 1:
          setSortedData(favorites.events);
          break;
        case 2:
          setSortedData(favorites.products);
          break;
        case 3:
          setSortedData(favorites.places);
          break;
        default:
          setSortedData([]);
      }
    }
  }, [favorites, activeTab]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Seo title={'Избранное | Живём на севере'} description={'Избранное пользователя'} />
      <PageHeader
        withoutControls
        compact
      >
        <h1 className={styles.title}>Избранное</h1>
      </PageHeader>
      <div className={classnames('container', 'page-content', styles.container)}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <TabButton
              name={tab.name}
              isActive={tab.id === activeTab}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        <SwitchTransition>
          <CSSTransition
            key={activeTab}
            classNames="fadeIn"
            nodeRef={containerRef}
            timeout={200}
          >
            <div className={styles.content} ref={containerRef}>
              <div className={classnames(styles.view, {
                [styles.viewActivities]: activeTab === 0,
                [styles.viewEvents]: activeTab === 1,
                [styles.viewProducts]: activeTab === 2,
                [styles.viewPlaces]: activeTab === 3,
              })}
              >
                {' '}
                {isLoading ? <SpinnerLoader isLoading={isLoading} /> : (sortedData?.length > 0 ? (
                  sortedData.map((item, index) => viewItem(item, isAuth, index, isMobile))
                ) : (
                  <h2 className={styles.notFound}>
                    Ничего не найдено
                  </h2>
                ))}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default FavoritesPage;
