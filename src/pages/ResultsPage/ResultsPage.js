import React, {
  useEffect,
  useState,
} from 'react';
import Select from '../../components/Select/Select';
import ResultsMain from '../../layout/ResultsMain/ResultsMain';
import styles from './ResultsPage.module.scss';
import { useGetAllMunicipalitiesQuery } from '../../services/municipalitiesApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import { useGetAllResultsQuery, useGetYearResultsQuery } from '../../services/resultsApi';
import { findSelectCity } from '../../features/DiscussionData/formingData';

const ALL_CITIES = { label: 'Все города', value: null };
const LIMIT = 9;
let STEP = 0;

const ResultsPage = () => {
  const [city, setCity] = useState(ALL_CITIES);
  const [offset, setOffset] = useState(0);
  const [cards, setCards] = useState([]);

  const {
    options,
    isMunicipalitiesLoading,
  } = useGetAllMunicipalitiesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      const allOptions = data ? data.filtred : [];
      return {
        options: [
          ALL_CITIES,
          ...allOptions,
        ],
        isMunicipalitiesLoading: isLoading,
      };
    },
  });

  const { data: results, isLoading } = useGetYearResultsQuery(city.value);
  const { data: resultCards, isLoadingResultCards } = useGetAllResultsQuery({
    limit: offset > 0 ? LIMIT : LIMIT * 2,
    skip: offset,
    municipality: city.value,
  });

  const changeCity = (value) => {
    setCity(findSelectCity(options, value));
    setCards([]);
  };

  const handleMore = () => {
    const limit = offset > 0 ? LIMIT : LIMIT * 2;
    setOffset((prev) => prev + limit);
    STEP++;
  };

  useEffect(() => {
    if (resultCards) {
      setCards([
        ...cards,
        ...resultCards,
      ]);
    }
  }, [resultCards]);

  if (isMunicipalitiesLoading || isLoading || isLoadingResultCards) {
    return <MainPreloader />;
  }

  const hiddenMore = resultCards && STEP === 0 ? resultCards.length <= LIMIT : resultCards < LIMIT;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>результаты</h1>
          <div className="select__button">
            <Select
              type="button--color"
              options={options}
              className="select--button"
              classIsOpen="select--button--is-open"
              defaultValue={options[0]}
              isSearchable={false}
              setSortId={changeCity}
            />
          </div>
        </div>
      </header>
      {results && (
        <ResultsMain
          data={results}
          resultCards={cards.slice(0, LIMIT + STEP)}
          city={city}
          hiddenMore={hiddenMore}
          handleMore={handleMore}
        />
      )}
    </div>
  );
};

export default ResultsPage;
