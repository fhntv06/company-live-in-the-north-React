import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ServicesVotingTab.module.scss';
import TabWrapper from '../TabWrapper';
import Button from '../../../../components/Button/Button';
import { useGetAllVotesQuery } from '../../../../services/votesApi';
import { getIsAuth } from '../../../../features/Auth/authSlice';
import DiscussionCard from '../../../../components/Discussion/DiscussionCard/DiscussionCard';
import DiscussionItem from '../../../../components/Discussion/DiscussionItem/DiscussionItem';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import TabLoader from '../TabLoader';

const ServicesVotingTab = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const {
    data: votesData,
    isLoading: isLoadingVoting,
    isFetching: isFetchingVoting,
  } = useGetAllVotesQuery({
    limit: 2,
  });

  return (
    <TabWrapper disableAnimation={isLoadingVoting || isFetchingVoting}>
      <div className={styles.info}>
        <h3 className={styles.title}>
          Благодаря сервису «Голосования» можно
          выбирать лучшие из&nbsp;предложенных идеи для&nbsp;реализации
        </h3>
        <p className={styles.infoText}>
          На втором этапе муниципалитеты выбирают несколько идей,
          получивших наибольшую поддержку от пользователей портала,
          и выносят их на&nbsp;голосование.
        </p>
      </div>
      <TabLoader isLoading={isLoadingVoting || isFetchingVoting} />
      <div className={styles.cards}>
        {votesData && votesData?.map((voting) => (
          <>
            {!isMobile ? (
              <DiscussionCard
                key={voting.id}
                className={styles.card}
                data={voting}
                type="voting"
                isAuth={isAuth}
              />
            ) : (
              <DiscussionItem
                key={voting.id}
                className={styles.card}
                data={voting}
                type="voting"
                isAuth={isAuth}
              />
            )}
          </>
        ))}
      </div>
      <div className={styles.actions}>
        <Button
          typeButton="button"
          className={styles.button}
          onClick={() => {
            navigate('/discussions');
          }}
        >
          Все голосования
        </Button>
      </div>
    </TabWrapper>
  );
};

export default ServicesVotingTab;
