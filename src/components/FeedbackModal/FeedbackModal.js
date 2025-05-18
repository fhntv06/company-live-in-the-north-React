import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import styles from './FeedbackModal.module.scss';
import Modal from '../Modal/Modal';
import FileUploadController from '../FileUpload/FileUploadController';
import Button from '../Button/Button';
import {
  getUser,
  setError,
  getError,
} from '../../features/Auth/authSlice';
import Checkbox from '../Checkbox/Checkbox';
import InputField from '../Inputs/InputField/InputField';
import { phoneRegex, cyrilicRegex } from '../../helpers/regex';
import Select from '../Select/Select';
import ModalCloseButton from '../Modal/ModalCloseButton';
import { useFeedbackMutation } from '../../services/feedbacksApi';
import { useGetAllMunicipalitiesQuery } from '../../services/municipalitiesApi';
import { formatPhoneForMask } from '../../helpers/format';
import { getRawNumber } from '../../helpers/getRawNumber';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

const FeedbackModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    data: municipalities,
    isLoading: isLoadingMunicipalities,
  } = useGetAllMunicipalitiesQuery();

  const filteredMunicipalities = municipalities && municipalities?.filtred;
  const user = useSelector(getUser);

  const [sendFeedback, { isLoading }] = useFeedbackMutation();

  const [confirm, setConfirm] = useState(false);
  const [files, setFiles] = useState();
  const [maxSize, setMaxSize] = useState(false);
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && user.municipality && filteredMunicipalities) {
      const defaultSelectedValue = filteredMunicipalities.filter(
        (item) => item.value === user.municipality.id,
      );
      setLocation(defaultSelectedValue);
    }
  }, [user, isLoadingMunicipalities]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      message: '',
      name: user ? `${`${user.firstName} ${user.surname}`}` : '',
      phone: user ? formatPhoneForMask(user.phone) : '',
      email: user ? user.email : '',
      municipality: user && location ? location : '',
    },
  });

  const errorMessage = useSelector((state) => getError(state.auth));

  useEffect(() => {
    if (location) {
      setValue('municipalityId', location);
    }
  }, [location]);

  const onSendSubmit = async (formData) => {
    dispatch(setError(null));
    const data = {
      userId: user ? user.id : null,
      message: formData.message,
      name: formData.name,
      phone: getRawNumber(formData.phone),
      email: formData.email,
      municipality: location[0].value,
      files,
    };
    try {
      const result = await sendFeedback(data).unwrap();
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      dispatch(setError(error.data?.message));
    }
  };

  const onFileSelect = (media) => {
    const oldArray = files;
    const newArray = media;
    const filesObj = { ...oldArray, ...newArray };
    setFiles(filesObj);
  };

  const onChecked = () => {
    setConfirm((prev) => {
      setValue('personalDataAgreement', !prev);
      if (!prev) clearErrors('personalDataAgreement');
      return !prev;
    });
  };

  const onChangeHandlerSelect = (name, option) => {
    setValue(name, option);
    const a = [];
    a.push(option);
    setLocation(a);
  };

  const sendingRender = () => (
    <div className={styles.loader}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}>
          <SpinnerLoader isLoading={isLoading} />
        </div>
        <h4 className={styles.title}>
          Не закрывайте окно, отправляем сообщение
        </h4>
      </div>
    </div>
  );

  const closeSuccess = () => {
    onClose();
    setSuccess(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={classnames(
            styles.row,
            styles.titleRow,
          )}
          >
            <h2>{success ? 'Спасибо' : 'Обратная связь'}</h2>
            <ModalCloseButton onClick={onClose} />
          </div>
          {!success ? (
            <div className={classnames(
              styles.row,
              styles.infoRow,
            )}
            >
              <div className={styles.info}>
                <p>
                  Здесь вы можете обратиться по вопросам технической поддержки сайта,
                  а также иным вопросам реализации проекта «Живём на Севере»
                </p>
              </div>
              <div className={styles.disclaimer}>
                <p>
                  Рассмотрение сообщений, поступивших в разделе
                  «Обратная связь» осуществляется вне порядка,
                  определенного Федеральным законом от 02 мая 2006 года № 59-ФЗ
                  «О порядке рассмотрения обращений граждан Российской Федерации».
                </p>
              </div>
            </div>
          ) : null}
          {isLoading ? sendingRender() : (
            !success
              ? (
                <form
                  className={classnames(
                    styles.row,
                    styles.form,
                  )}
                  onSubmit={handleSubmit(onSendSubmit)}
                >
                  <div className={styles.inputGroup}>
                    <InputField
                      value={watch('name')}
                      label="Имя"
                      error={errors.name?.message}
                      className="input-field"
                    >
                      <input
                        type="text"
                        {...register('name',
                          { required: 'Пожалуйста, введите имя' })}
                      />
                    </InputField>
                    <Controller
                      control={control}
                      name="phone"
                      rules={{
                        required: 'Пожалуйста, введите свой номер',
                        pattern: { value: phoneRegex, message: 'Некорректный номер телефона' },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label="Телефон"
                          value={watch('phone')}
                          error={errors.phone?.message}
                          className="input-field"
                        >
                          <InputMask
                            {...register('phone')}
                            mask="+7 999 999 9999"
                            value={value}
                            onChange={onChange}
                            type="tel"
                          />
                        </InputField>
                      )}
                    />
                    <InputField
                      value={watch('email')}
                      label="E-mail"
                      error={errors.email?.message}
                      className="input-field"
                    >
                      <input
                        type="email"
                        {...register('email',
                          { required: 'Пожалуйста, введите E-mail' })}
                      />
                    </InputField>
                    <InputField
                      value={watch('municipalityId')}
                      label=""
                      error={errors.municipalityId?.message}
                      className="input-field"
                    >
                      <Select
                        type="input"
                        className="select"
                        classIsOpen="select--is-open"
                        options={filteredMunicipalities}
                        isLoading={isLoadingMunicipalities}
                        value={location}
                        isDisabled={
                          isLoadingMunicipalities
                          || !filteredMunicipalities
                          || !filteredMunicipalities.length
}
                        isSearchable
                        label="Округ"
                        clearErrors={clearErrors}
                        register={register('municipalityId',
                          { required: 'Пожалуйста, выберите свой округ' })}
                        onChangeHandler={(selectOption) => {
                          onChangeHandlerSelect('municipalityId', selectOption);
                        }}
                      />
                    </InputField>
                    <InputField
                      value={watch('message')}
                      label="Текст обращения"
                      error={errors.idea?.message}
                      className={classnames('input-field', styles.textarea)}
                    >
                      <textarea
                        {...register('message',
                          {
                            required: 'Пожалуйста, введите текст обращения',
                            pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' },
                            minLength: { value: 10, message: 'Минимум 10 символов' },
                          })}
                      />
                    </InputField>
                  </div>
                  <div className={styles.lastRow}>
                    <div className={styles.additionalInputGroup}>
                      <FileUploadController
                        className={styles.files}
                        setMaxSize={setMaxSize}
                        onSelect={onFileSelect}
                        mergedFiles={files}
                        setMergedFiles={setFiles}
                      />
                      <InputField
                        className={styles.confirm}
                        value={watch('personalDataAgreement')}
                        error={errors.personalDataAgreement?.message}
                        errorClassName={styles.error}
                      >
                        <div className={styles.checkboxWrapper}>
                          <input
                            type="checkbox"
                            hidden
                            {...register('personalDataAgreement',
                              { required: 'Пожалуйста, подтвердите согласие' })}
                          />
                          <Checkbox checked={confirm} onClick={onChecked} />
                          <div>
                            Даю согласие на обработку моих
                            <a
                              href={`${process.env.PUBLIC_URL}/personal-data-processing.pdf`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {' '}
                              персональных данных
                            </a>
                          </div>
                        </div>
                      </InputField>
                    </div>
                    <div className={styles.submitButton}>
                      <Button type="submit" disabled={isLoading || maxSize || success} typeButton="button-fill">
                        Отправить
                      </Button>
                      {errorMessage && (
                      <div className={styles.errorWrapper}>
                        <ErrorMessage message={errorMessage} />
                      </div>
                      )}
                      {success && (
                      <div className={styles.successWrapper}>
                        Сообщение было успешно отправлено!
                      </div>
                      )}
                    </div>
                  </div>
                </form>
              )
              : (
                <>
                  <div className={classnames(
                    styles.row,
                    styles.textRow,
                  )}
                  >
                    <p>Ваше сообщение принято к рассмотрению</p>
                  </div>
                  <Button onClick={closeSuccess} typeButton="button">
                    Хорошо
                  </Button>
                </>
              )
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;

FeedbackModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
FeedbackModal.defaultProps = {
  isOpen: false,
};
