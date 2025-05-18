/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styles from './DiscussionInnerPage.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';
import DiscussionHeaderContent from '../../layout/DiscussionHeaderContent/DiscussionHeaderContent';
import useMediaQuery from '../../hooks/useMediaQuery';
import DiscussionContent from './DiscussionContent/DiscussionContent';
import VotingContent from './DiscussionContent/VotingContent';
import ResultContent from './DiscussionContent/ResultContent';
// import { cards } from '../../features/DiscussionsResults/results'; // temporary
import { useGetDiscussionByIdQuery } from '../../services/discussionApi';
import { useGetVotingByIdQuery } from '../../services/votesApi';
import { useGetIdeasByIdQuery } from '../../services/ideasApi';
import { useGetResultsByIdQuery, useGetAllResultsQuery } from '../../services/resultsApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { getIsAuth, getUser } from '../../features/Auth/authSlice';

const DiscussionInnerPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isCozyYamal = pathname.includes('cozy-yamal');
  const type = pathname.split('/')[isCozyYamal ? 2 : 1];
  const limit = 6;
  // eslint-disable-next-line arrow-body-style
  const { data: discussion } = useGetDiscussionByIdQuery(id, { skip: type === 'votings' || type === 'results' });
  const { data: voting, refetch: refetchVoted } = useGetVotingByIdQuery(id, { skip: type === 'discussions' || type === 'results' });
  const { data: ideas, isLoading, refetch: refetchIdea } = useGetIdeasByIdQuery(id, { skip: type === 'votings' || type === 'results' });
  const { data: results } = useGetResultsByIdQuery(id, { skip: type === 'votings' || type === 'discussions' });
  const { data: resultsList } = useGetAllResultsQuery(limit, { skip: type === 'votings' || type === 'discussions' });
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const isSmall = useMediaQuery('(max-width: 767px)');
  const user = useSelector(getUser);

  useEffect(() => {
    if (type !== 'votings' && type !== 'results') {
      refetchIdea();
    }
    if (type !== 'discussions' && type !== 'results') {
      refetchVoted();
    }
  }, [id, type]);

  const renderContent = () => {
    switch (type) {
      case 'discussions':
        return <DiscussionContent loadData={isLoading} user={user} isAuth={isAuth} item={discussion} ideas={ideas} isCozyYamal={isCozyYamal} />;
      case 'votings':
        return <VotingContent user={user} isAuth={isAuth} item={voting} isCozyYamal={isCozyYamal} />;
      case 'results':
        return <ResultContent item={results} cards={resultsList} />;
      default:
        return null;
    }
  };

  if ((type === 'discussions' && !discussion) || (type === 'votings' && !voting) || (type === 'results' && !results)) {
    return <MainPreloader />;
  }

  return (
    <div className={styles.page}>
      <PageHeader
        withoutBackLink={isSmall && !isCozyYamal}
        withoutControls={!isCozyYamal}
        compact
        withoutOffset
        className={styles.header}
      >
        <DiscussionHeaderContent item={type === 'discussions' ? discussion : (type === 'votings' ? voting : results)} isAuth={isAuth} ideas={ideas} type={type} isCozyYamal={isCozyYamal} />
      </PageHeader>
      <main className={styles.main}>
        {renderContent()}
      </main>
    </div>
  );
};

export default DiscussionInnerPage;
