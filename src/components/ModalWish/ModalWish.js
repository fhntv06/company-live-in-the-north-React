import React, { useState, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { inclineFirstname } from 'lvovich';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import htmlParser from 'html-react-parser';
import plural from 'plural-ru';
import Modal from '../Modal/Modal';
// import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import MapContainer from '../MapContainer/MapContainer';
import ModalCloseButton from '../Modal/ModalCloseButton';
import InputField from '../Inputs/InputField/InputField';
import Checkbox from '../Checkbox/Checkbox';
import { phoneRegex, cyrilicRegex } from '../../helpers/regex';
import Select from '../Select/Select';
import { formatPhoneForMask } from '../../helpers/format';
import { getRawNumber } from '../../helpers/getRawNumber';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getError, setError } from '../../features/Auth/authSlice';
import { useSendReserveWishMutation } from '../../services/xmasTreeApi';
import styles from './ModalWish.module.scss';

const ModalWish = ({
  point,
  wish,
  user,
  municipalities,
  isOpen,
  onClose,
  isAuth,
  setWishVisible,
  refetch,
}) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState('');
  const [confirmPersonalAgreement, setConfirmPersonalAgreement] = useState(false);
  const [confirmeventAgreement, setConfirmeventAgreement] = useState(false);

  const [sendReserveWish, { isLoading }] = useSendReserveWishMutation();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: user ? user.firstName : '',
      surname: user ? user.surname : '',
      patronymic: user && user.patronymic ? user.patronymic : '',
      phone: user ? formatPhoneForMask(user.phone) : '',
      email: user ? user.email : '',
      municipality: user && location ? location : '',
      personalDataAgreement: false,
      eventAgreement: false,
    },
  });

  useEffect(() => {
    if (user && user.municipality && municipalities) {
      const defaultSelectedValue = municipalities.filter(
        (item) => item.value === user.municipality.id,
      );
      setLocation(defaultSelectedValue[0]);
      setValue('municipalityId', defaultSelectedValue[0]);
    }
  }, [user, municipalities]);

  const onSendSubmit = async (formData) => {
    dispatch(setError(null));
    setSuccess(true);
    const data = {
      wishId: wish ? wish.id : null,
      firstName: formData.firstName,
      surname: formData.surname,
      patronymic: formData.patronymic,
      phone: getRawNumber(formData.phone),
      email: formData.email,
      municipality: location.value,
      personalDataAgreement: confirmPersonalAgreement,
      eventAgreement: confirmeventAgreement,
    };
    try {
      const result = await sendReserveWish(data).unwrap();
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      dispatch(setError(error.data?.message));
    }
  };

  const closeSuccess = () => {
    setSuccess(false);
    setWishVisible(false);
    refetch();
    onClose();
  };

  const onChecked = (type) => {
    const valueSetter = (prev) => {
      setValue(type, !prev);
      if (!prev) clearErrors(type);
      return !prev;
    };

    switch (type) {
      case 'eventAgreement':
        setConfirmeventAgreement((prev) => valueSetter(prev));
        break;
      case 'personalDataAgreement':
        setConfirmPersonalAgreement((prev) => valueSetter(prev));
        break;
      default:
    }
  };

  const errorMessage = useSelector((state) => getError(state.auth));

  return (
    <Modal isOpen={isOpen} onClose={closeSuccess}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={classNames(
            styles.row,
            styles.titleRow,
          )}
          >
            <h2>{success ? 'Спасибо' : 'Забронируйте желание'}</h2>
            <ModalCloseButton onClick={() => closeSuccess()} />
          </div>
          {!success ? (
            <div className={classNames(
              styles.row,
              styles.infoRow,
            )}
            >
              <div className={styles.info}>
                <p>
                  Вы бронируете «
                  {wish?.gift}
                  »
                  для
                  {' '}
                  {wish && wish.childFirstName && inclineFirstname(wish.childFirstName, 'genitive')}
                  ,
                  {' '}
                  {wish?.age}
                  {' '}
                  {wish && wish.age && plural(wish.age, 'год', 'года', 'лет')}
                </p>
              </div>
              <div className={styles.disclaimer}>
                <p>
                  После оформления заявки с вами свяжется волонтер для подтверждения.
                </p>
              </div>
            </div>
          ) : null}
          {success ? (
            <>
              <div className={classNames(
                styles.row,
                styles.textRow,
              )}
              >
                <p>Ваша заявка на бронирование желания отправлена.</p>
              </div>
            </>
          ) : (
            <form
              className={classNames(
                styles.row,
                styles.form,
              )}
              onSubmit={handleSubmit(onSendSubmit)}
            >
              <div className={styles.inputGroup}>
                <InputField
                  value={watch('surname')}
                  label="Фамилия"
                  error={errors.surname?.message}
                  className="input-field"
                >
                  <input
                    disabled
                    type="text"
                    {...register('surname',
                      { required: 'Пожалуйста, введите фамилию' })}
                  />
                </InputField>
                <InputField
                  value={watch('firstName')}
                  label="Имя"
                  error={errors.firstName?.message}
                  className="input-field"
                >
                  <input
                    disabled
                    type="text"
                    {...register('firstName',
                      { required: 'Пожалуйста, введите имя' })}
                  />
                </InputField>
                <InputField
                  value={watch('patronymic')}
                  label="Отчество"
                  error={errors.patronymic?.message}
                  className="input-field"
                >
                  <input
                    autoComplete="off"
                    id="patronymic"
                    {...register('patronymic',
                      { required: 'Пожалуйста, введите отчество', pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' }, minLength: { value: 3, message: 'Минимум 3 символа' } })}
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
                        disabled
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
                    disabled
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
                    options={municipalities}
                    isLoading={!municipalities}
                    value={location}
                    isDisabled
                    label="Округ"
                    clearErrors={clearErrors}
                    register={register('municipalityId',
                      { required: 'Пожалуйста, выберите свой округ' })}
                    onChangeHandler={(selectOption) => {
                      setValue('municipalityId', selectOption);
                      setLocation(selectOption);
                    }}
                  />
                </InputField>
              </div>
              <div className={styles.lastRow}>
                <div className={styles.additionalInputGroup}>
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
                      <Checkbox
                        checked={confirmPersonalAgreement}
                        onClick={() => { onChecked('personalDataAgreement'); }}
                      />
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
                  <InputField
                    className={styles.confirm}
                    value={watch('eventAgreement')}
                    error={errors.eventAgreement?.message}
                    errorClassName={styles.error}
                  >
                    <div className={styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        hidden
                        {...register('eventAgreement',
                          { required: 'Пожалуйста, подтвердите согласие' })}
                      />
                      <Checkbox
                        checked={confirmeventAgreement}
                        onClick={() => { onChecked('eventAgreement'); }}
                      />
                      <div>
                        Я согласен с
                        {' '}
                        <a rel="noreferrer" target="_blanc" href={`${process.env.PUBLIC_URL}/tree-of-care-regulation.pdf`}>
                          Правилами проведения акции
                        </a>
                        <br />
                      </div>
                    </div>

                  </InputField>
                </div>
                <div className={styles.submitButton}>
                  <Button
                    type="submit"
                    disabled={isLoading
                  || success
                  || !confirmPersonalAgreement
                  || !confirmeventAgreement
                  || !isAuth || watch('patronymic').length === 0}
                    typeButton="button-fill"
                  >
                    Отправить
                  </Button>
                  {errorMessage && (
                  <div className={styles.errorWrapper}>
                    <ErrorMessage message={errorMessage} />
                  </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
        {point ? (
          <div className={styles.contacts}>
            <div className={styles.left}>
              <h2>
                Пункт сбора подарков
              </h2>
              {point.workingHours && htmlParser(point.workingHours)}
              <p>
                {point.address && htmlParser(point.address)}
              </p>
            </div>
          </div>
        ) : null}
        {point && point.coordinate && (
        <div className={styles.map}>
          <MapContainer
            mapCoord={point.coordinate}
            placemarkCoords={[point.coordinate]}
          />
        </div>
        )}
      </div>
    </Modal>
  );
};

ModalWish.propTypes = {
  point: PropTypes.arrayOf(PropTypes.objectOf(shape({
    address: PropTypes.string,
    coordinate: PropTypes.string,
    workingHours: PropTypes.string,
  }))).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  wish: PropTypes.arrayOf(PropTypes.objectOf(shape({
    childFirstName: PropTypes.string,
    age: PropTypes.number,
    gift: PropTypes.string,
  }))).isRequired,
  user: PropTypes.arrayOf(PropTypes.objectOf(shape({
    firstName: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }))),
  municipalities: PropTypes.arrayOf(
    PropTypes.objectOf(
      shape(
        {
          value: PropTypes.number,
          label: PropTypes.string,
        },
      ),
    ),
  ),
  isAuth: PropTypes.bool,
  setWishVisible: PropTypes.func,
  refetch: PropTypes.func,
};

ModalWish.defaultProps = {
  isOpen: false,
  user: null,
  municipalities: null,
  isAuth: false,
  setWishVisible: () => {},
  refetch: () => {},
};

export default ModalWish;
