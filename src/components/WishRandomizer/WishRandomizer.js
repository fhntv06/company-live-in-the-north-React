/* eslint-disable max-len */
import React, {
  useRef, useState, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import {
  bool, string, arrayOf, objectOf, shape, number, func,
} from 'prop-types';
import classNames from 'classnames';
import plural from 'plural-ru';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import Button from '../Button/Button';
import styles from './WishRandomizer.module.scss';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';
import ModalWish from '../ModalWish/ModalWish';
import Icon from '../Icon/Icon';

import { useGetAllMunicipalitiesQuery } from '../../services/municipalitiesApi';
import { selectPointByType } from '../../features/Municipality/municipalitySlice';
import { getUser } from '../../features/Auth/authSlice';
import useModal from '../../hooks/useModal';

const WishRandomizer = ({
  className, isAuth, wish, wishRefetch,
}) => {
  const navigate = useNavigate();
  const [animationStart, setAnimationStart] = useState(false);
  const animationRef = useRef();
  const [wishVisible, setWishVisible] = useState(false);
  const user = useSelector(getUser);

  const {
    isOpen, openModalHandler,
    closeModalHandler,
  } = useModal();

  const {
    data: municipalities,
  } = useGetAllMunicipalitiesQuery();

  const point = useSelector((state) => selectPointByType(state, 2));
  let userPoint;
  if (user) {
    userPoint = user.municipality.points.find((item) => item.type.value === 2);
  }

  const animate = (element) => {
    const handler = () => {
      setAnimationStart(false);
      element.classList.remove('animation');
      element.removeEventListener('animationend', handler);
      element.classList.add('show');
    };

    if (animationStart) {
      element.classList.add('animation');

      element.addEventListener('animationend', handler);
    }

    return () => {
      element.removeEventListener('animationend', handler);
    };
  };

  useEffect(() => {
    if (animationRef.current) animate(animationRef.current);
  }, [animationStart]);

  const setVisibleWish = () => {
    if (!wishVisible) {
      setWishVisible(true);
    }
  };
  const randomButton = useMemo(() => (
    wishVisible
      ? (
        <div className={styles.randomizeBtnWrapper}>
          <motion.div
            key={Math.random() + wish?.data.id}
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
              },
            }}
            exit={{
              y: 20,
              opacity: 0,
            }}
          >
            <button
              className={styles.randomizeBtn}
              type="button"
              onClick={() => {
                setAnimationStart(true);
                wishRefetch();
              }}
            >
              случайный ребенок
            </button>

          </motion.div>
        </div>
      ) : null
  ), [wishVisible]);

  const wishController = useMemo(() => (
    !wishVisible ? (
      <motion.div
        key={Math.random() + wish?.data.id}
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        exit={{
          y: 20,
          opacity: 0,
        }}
      >
        {wish && (
        <Button
          className={styles.fulfillBtn}
          onClick={() => (isAuth ? setVisibleWish() : navigate('/sign-in', { replace: true }))}
          typeButton="button-fill"
          disabled={wish && wish.unreservedWishesCount === 0}
        >
          ХОЧУ ИСПОЛНЯТЬ ЖЕЛАНИЯ
        </Button>
        )}
        {(!isAuth || (wish && wish.unreservedWishesCount === 0)) && (
        <div className={styles.attention}>
          <Icon name="attention" />
          <p className={styles.text}>
            {!isAuth ? parse('Дарить подарки могут только авторизованные пользователи&nbsp;&mdash; вы&nbsp;попадёте на&nbsp;форму входа')
              : 'Извините, но все подарки для выбора закончились'}
          </p>
        </div>
        )}
      </motion.div>
    ) : (
      <motion.div
        key={Math.random() + wish?.data.id}
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
          },
        }}
        exit={{
          y: 20,
          opacity: 0,
        }}
      >
        <Button
          className={styles.fulfillBtn}
          typeButton="button-fill"
          onClick={() => openModalHandler()}
        >
          Исполнить!
        </Button>
      </motion.div>
    )
  ), [wishVisible, wish]);

  return (
    <div className={classNames(
      styles.wrapper,
      className,
    )}
    >
      <VisibleWrapper className={styles.content}>
        <div className={styles.wishesLeft}>
          <span>
            осталось
            <br />
            не исполненных
            <br />
            желаний
          </span>
          <div className={styles.count}>
            {wish && wish?.unreservedWishesCount}
            {' '}
            <span>
              /
              {' '}
              600
            </span>
          </div>
        </div>
        <div className={styles.sequenceWrapper}>
          <div
            ref={animationRef}
            className={styles.sequence}
          />
          {randomButton}
        </div>
        <div className={styles.wishWrapper}>
          {wishVisible ? (
            <p className={
        classNames(
          styles.wishText,
          { [styles.blur]: animationStart },
        )
}
            >
              <span className={styles.wish}>
                {wish?.data.gift}
              </span>
              <br />
              <span className={styles.person}>
                {wish?.data.childFirstName}
                ,
                {' '}
                {wish?.data.age}
                {' '}
                {wish && wish.data && plural(wish?.data.age, 'год', 'года', 'лет')}
                {' '}
                {wish?.data.municipalityName}
              </span>
            </p>
          ) : null}
          {wishController}
        </div>
      </VisibleWrapper>
      <ModalWish
        isOpen={isOpen}
        onClose={closeModalHandler}
        municipalities={municipalities && municipalities.filtred && municipalities.filtred}
        wish={wish && wish.data && wish.data}
        point={user ? userPoint : point}
        user={user}
        isAuth={isAuth}
        setWishVisible={setWishVisible}
        refetch={wishRefetch}
      />
    </div>
  );
};

WishRandomizer.propTypes = {
  className: string,
  isAuth: bool,
  wish: arrayOf(objectOf(shape({
    data: objectOf(shape({
      childFirstName: string,
      age: number,
      gift: string,
    })),
    unreservedWishesCount: number,
  }))).isRequired,
  wishRefetch: func,
};
WishRandomizer.defaultProps = {
  className: '',
  isAuth: false,
  wishRefetch: () => {},
};

export default WishRandomizer;
