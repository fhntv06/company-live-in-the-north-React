import React from 'react';
import { useNavigate } from 'react-router-dom';
import TabWrapper from '../TabWrapper';
import styles from './ServicesResultTab.module.scss';
import Button from '../../../../components/Button/Button';
import { useGetAllResultsQuery } from '../../../../services/resultsApi';
import TabLoader from '../TabLoader';
import ResultCard from '../../../../components/ResultCard/ResultCard';

const ServicesResultTab = () => {
  // console.log('ServicesCozyYamalTab');
  const navigate = useNavigate();

  const {
    data: resultsData,
    isLoading: isLoadingResults,
    isFetching: isFetchingResults,
  } = useGetAllResultsQuery({
    limit: 2,
  });

  return (
    <TabWrapper>
      <div className={styles.info}>
        <h3 className={styles.title}>
          Благодаря сервису «Результаты» можно следить за
          реализацией идей, предложенных пользователями портала
        </h3>
        <p className={styles.infoText}>
          На третьем этапе муниципалитеты размещают информацию о проектах
        </p>
      </div>
      <TabLoader isLoading={isLoadingResults || isFetchingResults} />
      <div className={styles.cards}>
        {resultsData && resultsData.map((result) => (
          <ResultCard
            key={result.id}
            className={styles.card}
            data={result}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <Button
          typeButton="button"
          className={styles.button}
          onClick={() => {
            navigate('/results');
          }}
        >
          Все результаты
        </Button>
      </div>
    </TabWrapper>
  );
};

export default ServicesResultTab;
