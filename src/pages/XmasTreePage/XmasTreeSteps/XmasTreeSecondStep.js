import React from 'react';
import PropTypes, { shape } from 'prop-types';
import parseHtml from 'html-react-parser';
import styles from './XmasTreeSecondStep.module.scss';
import { useGetRandomWishQuery } from '../../../services/xmasTreeApi';
import WishRandomizer from '../../../components/WishRandomizer/WishRandomizer';

const XmasTreeSecondStep = ({ step, isAuth }) => {
  const {
    data: wish,
    refetch,
  } = useGetRandomWishQuery();

  return (
    <div className={styles.wrapper}>
      <header className={styles.headerWrapper}>
        {step && wish && ((wish.mUnreservedWishesCount > 0)
          ? (
            <>
              <h2 className={styles.title}>{ step.id === 2 && step.name}</h2>
              {step.id === 2 && parseHtml(step.description)}
            </>
          ) : (
            <>
              <h2 className={styles.title}>
                Приём заявок окончен
              </h2>
              <p>
                Ямал славится добрыми людьми&nbsp;&mdash;
                {' '}
                для каждого юного северянина уже найден даритель.
                {' '}
                Спасибо за&nbsp;вашу отзывчивость и&nbsp;ждем Вас в&nbsp;следующем году!
              </p>
            </>
          ))}
      </header>
      {wish && wish.mUnreservedWishesCount > 0 && (
      <WishRandomizer
        wish={wish}
        wishRefetch={refetch}
        isAuth={isAuth}
        className={styles.wishbox}
      />
      )}
    </div>
  );
};

XmasTreeSecondStep.propTypes = {
  step: PropTypes.arrayOf(PropTypes.objectOf(shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }))).isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default XmasTreeSecondStep;
