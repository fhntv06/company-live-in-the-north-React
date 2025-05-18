import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import {
  getUser,
  setError,
  getError,
} from '../../features/Auth/authSlice';
import Checkbox from '../Checkbox/Checkbox';
import InputField from '../Inputs/InputField/InputField';
import ModalCloseButton from '../Modal/ModalCloseButton';
import { useUpdateSubscriptionMutation } from '../../services/profileApi';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import styles from '../FeedbackModal/FeedbackModal.module.scss';

const SubscribeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [sendSubscribe, { isLoading }] = useUpdateSubscriptionMutation();
  const [checkedNews, setCheckedNews] = useState(user.isNewsSubscribed);
  const [checkedAfisha, setCheckedAfisha] = useState(user.isAfishaSubscribed);
  const [success, setSuccess] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    // changeHandler,
    setValue,
    // clearErrors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      isNewsSubscribed: user.isNewsSubscribed,
      isAfishaSubscribed: user.isAfishaSubscribed,
    },
  });

  const errorMessage = useSelector((state) => getError(state.auth));

  const onSendSubmit = async (formData) => {
    dispatch(setError(null));
    const data = {
      isNewsSubscribed: formData.isNewsSubscribed === true ? 1 : 0,
      isAfishaSubscribed: formData.isAfishaSubscribed === true ? 1 : 0,
    };
    try {
      const result = await sendSubscribe(data).unwrap();
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      dispatch(setError(error.data?.message));
    }
  };

  const onCheckedNews = () => {
    setCheckedNews((prev) => {
      setValue('isNewsSubscribed', !prev);
      return !prev;
    });
  };

  const onCheckedAfisha = () => {
    setCheckedAfisha((prev) => {
      setValue('isAfishaSubscribed', !prev);
      return !prev;
    });
  };

  const sendingRender = () => (
    <div className={styles.loader}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}>
          <SpinnerLoader isLoading={isLoading} />
        </div>
        <h4 className={styles.title}>
          Отправляем данные
        </h4>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={classnames(
            styles.row,
            styles.titleRow,
          )}
          >
            <h2>Ваши подписки</h2>
            <ModalCloseButton onClick={onClose} />
          </div>
          <div className={classnames(
            styles.row,
            styles.infoRow,
          )}
          >
            <div className={styles.info}>
              <p>
                Здесь вы можете подписаться на рассылки
                {' '}
                новостных дайджестов проекта «Живём на Севере».
              </p>
            </div>
          </div>
          {isLoading ? sendingRender() : (
            <form
              className={classnames(
                styles.row,
                styles.form,
              )}
              onSubmit={handleSubmit(onSendSubmit)}
            >
              <div className={styles.inputGroup}>
                <InputField
                  className={styles.confirm}
                  value={watch('isNewsSubscribed')}
                  error={errors.isNewsSubscribed?.message}
                  errorClassName={styles.error}
                >
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      hidden
                      {...register('isNewsSubscribed')}
                    />
                    <Checkbox checked={checkedNews} onClick={onCheckedNews} />
                    <div>
                      Я хочу получать новости от &quot;Живём на Севере&ldquo;
                    </div>
                  </div>
                </InputField>
                <InputField
                  className={styles.confirm}
                  value={watch('isAfishaSubscribed')}
                  error={errors.isAfishaSubscribed?.message}
                  errorClassName={styles.error}
                >
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      hidden
                      {...register('isAfishaSubscribed')}
                    />
                    <Checkbox checked={checkedAfisha} onClick={onCheckedAfisha} />
                    <div>
                      Я хочу получать новости из раздела &quot;Афиша&ldquo;
                    </div>
                  </div>
                </InputField>
              </div>
              <div className={styles.lastRow}>
                <div className={styles.submitButton}>
                  <Button type="submit" disabled={isLoading || success} typeButton="button-fill">
                    Сохранить
                  </Button>
                  {errorMessage && (
                  <div className={styles.errorWrapper}>
                    <ErrorMessage message={errorMessage} />
                  </div>
                  )}
                  {success && (
                  <div className={styles.successWrapper}>
                    Состояние подписок было успешно сохранено!
                  </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SubscribeModal;

SubscribeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
SubscribeModal.defaultProps = {
  isOpen: false,
};
