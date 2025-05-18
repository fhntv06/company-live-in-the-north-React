import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../../Icon/Icon';
import Avatar from '../../Avatar/Avatar';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import Spoiler from '../../Spoiler/Spoiler';
import styles from './AfishaReviews.module.scss';
import { getIsAuth, getUser } from '../../../features/Auth/authSlice';
import { useCreateReviewMutation } from '../../../services/afishaApi';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import PushNotification from '../../PushNotification/PushNotification';
import AfishaReviewFormModal from '../../AfishaReviewFormModal/AfishaReviewFormModal';
import useMediaQuery from '../../../hooks/useMediaQuery';

const MAX_SHOW_REVIEWS = 5;

const AfishaReviews = ({ data }) => {
  const [value, setValue] = useState('');
  const [offset, setOffset] = useState(1);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const textareaRef = useRef(null);

  const {
    isOpen:
    isSuccessModalOpen,
    openModalHandler: openSuccessModal,
    closeModalHandler: closeSuccessModal,
  } = useModal();
  const {
    isOpen: isReviewModalOpen,
    openModalHandler: openReviewModal,
    closeModalHandler: closeReviewModal,
  } = useModal();

  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const user = useSelector(getUser);

  const [createReview] = useCreateReviewMutation();

  useEffect(() => {
    if (isMobile) return;

    closeReviewModal();
  }, [isMobile]);

  const onCreateReview = async (modalValue) => {
    try {
      const reviewData = {
        afisha_event_id: data.id,
        review_text: isMobile ? modalValue : value,
      };

      await createReview(reviewData).unwrap();
      setValue('');

      if (isMobile) {
        closeReviewModal();
      }

      openSuccessModal();
    } catch (e) {
      console.log(e);
    }
  };

  const onInput = () => {
    const fixedHeight = isMobile ? '48px' : '58px';

    textareaRef.current.style.height = fixedHeight;

    const newHeight = `${textareaRef.current.scrollHeight}px`;

    textareaRef.current.style.height = newHeight;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>
          Отзывы
        </h2>
        <div className={styles.bonuses}>
          <strong>
            Поделитесь своими впечатлениями и&nbsp;получите YAMALCOIN
          </strong>
          <span>
            <Icon name="coin" />
            +20
          </span>
        </div>
        <div
          role="presentation"
          onClick={isMobile ? () => {
            openReviewModal();
            textareaRef.current.blur();
          } : null}
          className={styles.inputField}
        >
          {isAuth && user ? (
            <>
              <Avatar avatar={user.avatar?.url} name={user.firstName} surname={user.surname} />
              <InputField
                label="Расскажите, что вы думаете"
                value={value}
                className={`${styles.input} input-field`}
              >
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onInput={onInput}
                  ref={textareaRef}
                />
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={onCreateReview}
                >
                  <Icon name="plane" className={styles.planeIcon} />
                </button>
              </InputField>
            </>
          ) : (
            <PushNotification type="warning">
              <p>
                Оценивать и&nbsp;оставлять отзывы могут только авторизованные пользователи.
                {' '}
                <Link to="/sign-in" className={styles.signInLink}>
                  Зарегистрироваться?
                </Link>
              </p>
            </PushNotification>
          )}
        </div>
        {data.afishaEventReviews.length ? (
          <>
            <div className={styles.comments}>
              {data.afishaEventReviews.slice(0, MAX_SHOW_REVIEWS * offset).map((comment) => (
                <div className={styles.comment}>
                  <div className={styles.commentHead}>
                    <Avatar
                      avatar={comment.avatar?.url}
                      name={comment.userName ? comment.userName.split(' ')[0] : ''}
                    />
                    <span>
                      {comment.userName}
                    </span>
                  </div>
                  <Spoiler maxLines={4} className={styles.text}>
                    <p>{comment.reviewText}</p>
                  </Spoiler>
                </div>
              ))}
            </div>
            {offset * MAX_SHOW_REVIEWS < data.afishaEventReviews.length && (
              <Button
                typeButton="button"
                className={styles.allComments}
                onClick={() => setOffset((prev) => prev + 1)}
              >
                ещё отзывы
              </Button>
            )}
          </>
        ) : (
          <div className={styles.withoutComments}>
            Нет комментариев
          </div>
        )}
      </div>
      <AfishaReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onSendData={onCreateReview}
      />
      <Modal isOpen={isSuccessModalOpen} onClose={closeSuccessModal}>
        <div className={styles.modalWrapper}>
          <h1 className={styles.modalTitle}>Отзыв отправлен</h1>
          <p className={styles.modalText}>
            Благодарим за проявленную активность.
            Ваш отзыв будет рассмотрен администрацией портала и размещен после модерации.
          </p>
          <Button typeButton="button" onClick={closeSuccessModal} className={styles.modalButton}>Спасибо</Button>
        </div>
      </Modal>
    </>
  );
};

AfishaReviews.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    afishaEventReviews: PropTypes.arrayOf(),
  }).isRequired,
};

export default AfishaReviews;
