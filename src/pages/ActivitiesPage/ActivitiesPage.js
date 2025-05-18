import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styles from './ActivitiesPage.module.scss';

import DiscussionCard from '../../components/Discussion/DiscussionCard/DiscussionCard';

import { useGetAllDiscussionsByUserQuery } from '../../services/discussionApi';
import { useGetAllvotingsByUserQuery } from '../../services/votesApi';
import Seo from '../../components/Seo/Seo';
import PageHeader from '../../components/PageHeader/PageHeader';
import TabButton from '../../components/TabButton/TabButton';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';

const tabs = [
  {
    id: 0,
    name: 'все',
    types: [],
  },
  {
    id: 1,
    name: 'обсуждения',
    types: ['discussion'],
  },
  {
    id: 2,
    name: 'Голосования',
    types: ['votes'],
  },
];

const viewItem = (item) => (
  <DiscussionCard
    key={item.id}
    isActivity
    type={(!item.voteAnswerGroups || !item.voteAnswers) ? 'discussion' : 'voting'}
    className={classnames(
      styles.activityCard,
      { [styles.withBorder]: !item.voteAnswerGroups || !item.voteAnswers },
    )}
    data={item}
  />
);

const ActivitiesPage = () => {
  const [sortedData, setSortedDate] = useState();

  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const limit = 999;

  const {
    data: discussionsData,
    isLoading: discussionLoading,
  } = useGetAllDiscussionsByUserQuery({ limit });
  const {
    data: votingsData,
    isLoading: votingsLoading,
  } = useGetAllvotingsByUserQuery({ limit });

  useEffect(() => {
    if (!discussionLoading && !votingsLoading) {
      switch (activeTab) {
        case 0:
          setSortedDate([...discussionsData, ...votingsData]);
          break;
        case 1:
          setSortedDate(discussionsData);
          break;
        default:
          setSortedDate(votingsData);
      }
    }
  }, [discussionLoading, votingsLoading, votingsData, discussionsData, activeTab]);

  return (
    <>
      <Seo title={'Активности | Живём на севере'} description={'Активности пользователя'} />
      <PageHeader
        withoutControls
        compact
      >
        <h1>Активности</h1>
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
              <div className={classnames(styles.view, { [styles.viewPlaces]: tabs[activeTab].name === 'места' })}>
                {(votingsLoading && discussionLoading && !sortedData)
                  ? <SpinnerLoader isLoading={votingsLoading && discussionLoading} />
                  : (
                    <>
                      {sortedData && sortedData.length > 0 ? (
                        sortedData.map((item) => viewItem(item))
                      ) : (
                        <h2 className={styles.notFound}>
                          Ничего не найдено
                        </h2>
                      )}
                    </>
                  )}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default ActivitiesPage;
