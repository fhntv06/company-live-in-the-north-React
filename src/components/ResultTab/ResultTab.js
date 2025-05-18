/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cityIn } from 'lvovich';
import {
  getMunicipalityName,
} from '../../features/Municipality/municipalitySlice';
import Button from '../Button/Button';
import ResultGraphSlider from '../ResultGraphSlider/ResultGraphSlider';
import styles from './ResultTab.module.scss';
import ResultCardSlider from '../ResultCardSlider/ResultCardSlider';
import useModal from '../../hooks/useModal';
import { useGetAllResultsQuery } from '../../services/resultsApi';
import SubscribeModal from '../SubscribeModal/SubscribeModal';
import { getIsAuth } from '../../features/Auth/authSlice';

const ResultTab = ({
  data,
  className,
  noDiscussion,
  selectedType,
}) => {
  const limit = 6;
  const currentMunicipality = useSelector(getMunicipalityName);
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const {
    isOpen: isSubscribeModalOpen, openModalHandler: openSubscribeModalHandler,
    closeModalHandler: closeSubscribeModalHandler,
  } = useModal();

  const currentCity = cityIn(currentMunicipality.replace('г. ', ''));
  const navigate = useNavigate();
  const changeNavigate = () => {
    navigate('/results', { replace: true });
  };

  const {
    data: resultsData,
  } = useGetAllResultsQuery({
    limit,
  });

  return (
    <div className={`${styles.result} ${className}`}>
      <div className={`${styles.wrapper} animation`}>
        {noDiscussion && (
        <>
          <div className={styles.noDiscussion}>
            В
            {' '}
            {currentCity}
            {' '}
            <br />
            <span>
              сейчас нет активных
              {' '}
              {selectedType === 'vote' ? 'голосований' : 'обсуждений'}
            </span>
            ,
            {' '}
            <br />
            но&nbsp;они скоро появятся&nbsp;&mdash; подпишитесь на&nbsp;рассылку, чтобы ничего не&nbsp;пропустить.
          </div>
          <div className={styles.subscribeButton}>
            <Button
              onClick={isAuth
                ? openSubscribeModalHandler
                : () => navigate('/sign-in', { replace: true })}
              typeButton="button-white"
            >
              подписаться на рассылку
            </Button>
          </div>
        </>
        )}
        {data && data.years.length > 0 && (
          <p className={styles.text}>
            Статистика за
            {' '}
            {data.years[0]}
            {' '}
            год.
          </p>
        )}
        <ResultGraphSlider
          className={styles.graphSlider}
          topValues="округ"
          bottomValues={currentMunicipality.replace('г. ', '')}
          data={data.results}
          byCities
        />
        {resultsData && resultsData.length > 0
        && (
        <>
          <h4 className={styles.title}>
            Реализовано
            {' '}
            в
            {' '}
            {currentCity}
          </h4>
          <ResultCardSlider cardList={resultsData} className={styles.cardSlider} />
          <div className={styles.moreBtn}>
            <Button onClick={changeNavigate} typeButton="button">больше результатов</Button>
          </div>
        </>
        )}
      </div>
      {isAuth
      && (
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={closeSubscribeModalHandler}
      />
      )}
    </div>
  );
};

ResultTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  className: PropTypes.string,
  noDiscussion: PropTypes.bool,
  selectedType: PropTypes.string,
};
ResultTab.defaultProps = {
  className: '',
  noDiscussion: false,
  selectedType: null,
};

export default ResultTab;
