import React, {
  useMemo,
} from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {
  arrayOf, bool,
  func,
  string,
} from 'prop-types';
import ResultGraphSlider from '../../components/ResultGraphSlider/ResultGraphSlider';
import ResultCard from '../../components/ResultCard/ResultCard';
import Button from '../../components/Button/Button';
import styles from './ResultsMain.module.scss';

const ResultsMain = ({
  data,
  resultCards,
  hiddenMore,
  city,
  handleMore,
}) => {
  const labels = useMemo(() => ({
    top: city.value ? 'ЯНАО' : data.years[0],
    bottom: city.value ? city.label.replace('г. ', '') : data.years[1],
  }), [city]);

  return (
    <main className={styles.main}>
      <p className={styles.text}>
        Статистика за
        {' '}
        {data.years[0]}
        {' '}
        год.
      </p>
      <ResultGraphSlider
        className={styles.graphSlider}
        topValues={labels.top}
        bottomValues={labels.bottom}
        data={data.results}
        byCities={!!city.value}
      />
      {resultCards && resultCards.length > 0 && (
        <div className={styles.wrapper}>
          <h3>Что мы уже реализовали</h3>
          <SwitchTransition>
            <CSSTransition
              key={city}
              classNames="fadeIn"
              timeout={200}
            >
              <div className={styles.container}>
                {resultCards.map((item) => <ResultCard className={styles.card} data={item} />)}
              </div>
            </CSSTransition>
          </SwitchTransition>
          {!hiddenMore && (
            <div className={styles.more}>
              <Button typeButton="button" onClick={handleMore}>
                больше обсуждений
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ResultsMain;

ResultsMain.propTypes = {
  data: arrayOf().isRequired,
  city: string.isRequired,
  resultCards: arrayOf().isRequired,
  handleMore: func.isRequired,
  hiddenMore: bool.isRequired,
};
