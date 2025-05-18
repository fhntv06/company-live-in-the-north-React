import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesDiscussionTab.module.scss';
import { useGetAllDiscussionsQuery } from '../../../../services/discussionApi';
import DiscussionCard from '../../../../components/Discussion/DiscussionCard/DiscussionCard';
import { getIsAuth } from '../../../../features/Auth/authSlice';
import Button from '../../../../components/Button/Button';
import TabWrapper from '../TabWrapper';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import DiscussionItem from '../../../../components/Discussion/DiscussionItem/DiscussionItem';
import TabLoader from '../TabLoader';

const ServicesDiscussionTab = () => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const {
    data: discussionsData,
    isLoading: isLoadingDiscussion,
    isFetching: isFetchingDiscussion,
  } = useGetAllDiscussionsQuery({
    limit: 2,
  });

  return (
    <TabWrapper disableAnimation={isLoadingDiscussion || isFetchingDiscussion}>
      <div className={styles.info}>
        <h3 className={styles.title}>
          Благодаря сервису «Обсуждения» можно направлять предложения, отмечать лучшие и отслеживать
          их&nbsp;реализацию
        </h3>
        <p className={styles.infoText}>
          На первом этапе муниципалитеты задают темы.
          Пользователи сайта предлагают свои идеи и
          инициативы в рамках заданной темы, оценивают предложения других.
        </p>
      </div>
      <TabLoader isLoading={isLoadingDiscussion || isFetchingDiscussion} />
      <div className={styles.cards}>
        {discussionsData && discussionsData?.map((discussion) => (
          <>
            {!isMobile ? (
              <DiscussionCard
                key={discussion.id}
                className={styles.card}
                data={discussion}
                type="discussion"
                isAuth={isAuth}
              />
            ) : (
              <DiscussionItem
                key={discussion.id}
                className={styles.card}
                data={discussion}
                type="discussion"
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
          Все обсуждения
        </Button>
      </div>
    </TabWrapper>
  );
};

export default ServicesDiscussionTab;
