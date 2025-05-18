/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parseHtml from 'html-react-parser';
import styles from './XmasTreeFirstStep.module.scss';
import InputField from '../../../components/Inputs/InputField/InputField';
import { cyrilicRegex, emailRegex } from '../../../helpers/regex';
import { getBirthDateTimestamp } from '../../../components/AuthForms/RegistrationForm/RegistrationForm';
import Select from '../../../components/Select/Select';
import { useGetAllMunicipalitiesQuery } from '../../../services/municipalitiesApi';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Button from '../../../components/Button/Button';
import unitedRussiaImg from '../../../images/united_russia.svg';
import {
  getIsAuth, getUser, setError, getError,
} from '../../../features/Auth/authSlice';
import FileUploadController from '../../../components/FileUpload/FileUploadController';
import { isPersonAdult } from '../../../helpers/isPersonAdult';
import {
  useGetGiftTypesQuery,
  useSendWishMutation,
  useGetLimitQuery,
} from '../../../services/xmasTreeApi';
import { getRawNumber } from '../../../helpers/getRawNumber';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { formatPhone } from '../../../helpers/format';
import Icon from '../../../components/Icon/Icon';
import PushNotification from '../../../components/PushNotification/PushNotification';

const causeOptions = [
  {
    value: 1,
    label: 'Инвалидность',
  },
  {
    value: 2,
    label: 'Ребенок участника СВО',
  },
];

const autoCompleteUserInfo = (userInfo) => (userInfo || '');

const XmasTreeFirstStep = ({ step }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const user = useSelector(getUser);

  const [files, setFiles] = useState();
  const [maxSize, setMaxSize] = useState(false);
  const [willAttendMatinee, setwillAttendMatinee] = useState(false);
  const [confirmPersonalAgreement, setConfirmPersonalAgreement] = useState(false);
  const [confirmeventAgreement, setConfirmeventAgreement] = useState(false);
  const [cause, setCause] = useState();
  const [gift, setGift] = useState();
  const errorMessages = useSelector((state) => getError(state.auth));
  const [susccesForm, setSuccesForm] = useState(false);
  const [disabledField, setDisabledField] = useState(!isAuth);

  useEffect(() => {
    if (!isAuth) {
      setDisabledField(!isAuth);
    }
  }, [isAuth]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      childFirstName: '',
      childSurname: '',
      childPatronymic: '',
      childBirthDate: '',
      willAttendMatinee: false,
      municipalityId: { value: user?.municipality.id, label: user?.municipality.name },
      municipalityLocationId: { value: user?.municipalityLocation.id, label: user?.municipalityLocation.name },
      cause: '',
      snils: '',
      gift: '',
      wish: '',
      parentFirstName: autoCompleteUserInfo(user?.firstName),
      parentSurname: autoCompleteUserInfo(user?.surname),
      parentPatronymic: autoCompleteUserInfo(user?.patronymic),
      parentBirthDate: autoCompleteUserInfo(user?.birthDate),
      parentPhone: autoCompleteUserInfo(user?.phone),
      parentEmail: autoCompleteUserInfo(user?.email),
      address: '',
      personalDataAgreement: false,
      eventAgreement: false,
    },
  });

  const {
    data: municipalities,
    isLoading: isLoadingMunicipalities,
  } = useGetAllMunicipalitiesQuery();

  const {
    data: gifts,
  } = useGetGiftTypesQuery();

  const {
    data: limit,
  } = useGetLimitQuery();

  const filteredMunicipalities = municipalities && municipalities?.filtred;

  const [location, setLocation] = useState([{ value: user?.municipality.id, label: user?.municipality.name }]);
  const [locationMO, setLocationMO] = useState([{ value: user?.municipality.id, label: user?.municipality.name }]);
  const [locationId, setLocationId] = useState(
    { value: user?.municipalityLocation.id, label: user?.municipalityLocation.name },
  );

  const [sendWish, { isLoading }] = useSendWishMutation();

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
      case 'willAttendMatinee':
        setwillAttendMatinee((prev) => valueSetter(prev));
        break;
      default:
    }
  };

  useEffect(() => {
    dispatch(setError());
  }, []);

  const onFileSelect = (media) => {
    const oldArray = files;
    const newArray = media;
    const filesObj = { ...oldArray, ...newArray };
    setFiles(filesObj);
  };

  const onChangeHandlerSelect = (name, option) => {
    setValue(name, option);
  };

  const onSelectChange = (name, e) => {
    if (municipalities) {
      const municipalitiesData = municipalities.data.filter((item) => item.id === e.value);
      const firstMunicipalitiesLocations = municipalitiesData[0].municipalityLocations;
      const optionsMunicipalitiesLocations = firstMunicipalitiesLocations.map((item) => ({
        value: item.id, label: item.name,
      })).sort((a, b) => a.value - b.value);
      setLocation(optionsMunicipalitiesLocations);
      setLocationId(optionsMunicipalitiesLocations[0]);
      onChangeHandlerSelect(name, e);
      onChangeHandlerSelect('municipalityLocation', optionsMunicipalitiesLocations[0]);
    }
  };

  const renderNameSurnamePatronymicInputs = (field, label, errorMessage, disabled) => (
    <InputField
      value={watch(field)}
      label={label}
      error={errors[field]?.message}
      className="input-field"

    >
      <input
        disabled={disabled || disabledField}
        {...register(field,
          { required: errorMessage, pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' }, minLength: { value: 3, message: 'Минимум 3 символа' } })}
      />
    </InputField>
  );

  const renderBirthDateInput = (field, child, adult) => (
    <InputField
      label="Дата рождения"
      value={watch(field)}
      error={errors[field]?.message}
      className="input-field"
    >
      <InputMask
        disabled={disabledField}
        mask="99.99.9999"
        {...register(field, {
          validate: (value) => {
            const timestamp = getBirthDateTimestamp(value);
            const isDateValid = !Number.isNaN(timestamp);
            const currentDate = new Date();
            const valueDate = new Date(timestamp);
            const isAdult = isPersonAdult(value.replaceAll('.', '-'));
            const isDateBeforeCurrent = valueDate.getTime() <= currentDate.getTime();
            if (!isDateValid) {
              return 'Пожалуйста, введите дату рождения в формате ДД.ММ.ГГГГ';
            }
            if (!isDateBeforeCurrent) {
              return 'Дата рождения не может быть больше текущей даты';
            }
            if (isAdult && child) {
              return 'Ребенок не может быть старше 18-ти';
            }
            if (!isAdult && adult) {
              return 'Заявитель не может быть младще 18-ти';
            }
            return true;
          },
        })}
      />
    </InputField>
  );

  const onSubmitWish = async (formData) => {
    const data = {
      childFirstName: formData.childFirstName,
      childSurname: formData.childSurname,
      childPatronymic: formData.childPatronymic,
      childBirthDate: formData.childBirthDate,
      willAttendMatinee: formData.willAttendMatinee,
      municipalityId: formData.municipalityId.value,
      municipalityLocationId: formData.municipalityLocationId.value,
      cause: formData.cause.label,
      snils: formData.snils.toString(),
      gift: formData.gift.value,
      wish: formData.wish,
      parentFirstName: formData.parentFirstName,
      parentSurname: formData.parentSurname,
      parentPatronymic: formData.parentPatronymic,
      parentBirthDate: formData.parentBirthDate,
      parentPhone: getRawNumber(formData.parentPhone),
      parentEmail: formData.parentEmail,
      address: formData.address,
      personalDataAgreement: true,
      eventAgreement: true,
      files,
    };
    dispatch(setError(null));

    try {
      const result = await sendWish(data).unwrap();
      if (result.success) {
        setSuccesForm(true);
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
    }
  };

  const form = (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitWish)}>
      <div className={styles.formInnerWrapper}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Данные ребенка</h3>
          {renderNameSurnamePatronymicInputs('childSurname', 'Фамилия ребенка', 'Пожалуйста, введите фамилию ребенка')}
          {renderNameSurnamePatronymicInputs('childFirstName', 'Имя ребенка', 'Пожалуйста, введите имя ребенка')}
          {renderNameSurnamePatronymicInputs('childPatronymic', 'Отчество ребенка', 'Пожалуйста, введите отчество ребенка')}
          {renderBirthDateInput('childBirthDate', true, false)}
          <Controller
            control={control}
            name="snils"
            defaultValue=""
            rules={{
              required: 'Пожалуйста, введите СНИЛС ребёнка',
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                label="СНИЛС"
                value={watch('snils')}
                error={errors.snils?.message}
                className="input-field"
              >
                <InputMask
                  mask="999-999-999 99"
                  value={value}
                  onChange={onChange}
                  disabled={disabledField}
                  {...register('snils',
                    {
                      required: 'Это обязательное поле',
                      validate: (snilsValue) => {
                        const regex = /_/;
                        if (regex.test(snilsValue)) {
                          return 'Некорректный номер СНИЛС';
                        }
                        return true;
                      },
                    })}
                />
              </InputField>
            )}
          />
          <InputField
            value={watch('cause')}
            label=""
            error={errors.cause?.message}
            className="input-field"
          >
            <Select
              type="input"
              className={classNames(
                'select',
                styles.select,
              )}
              classIsOpen="select--is-open"
              options={causeOptions}
              isDisabled={disabledField}
              value={cause}
              isSearchable={false}
              label="Почему нуждается в исполнении желания?"
              clearErrors={clearErrors}
              register={register('cause',
                { required: 'Пожалуйста, ответьте на вопрос' })}
              onChangeHandler={(selectOption) => {
                setCause(selectOption);
                onChangeHandlerSelect('cause', selectOption);
              }}
            />
          </InputField>
          <InputField
            className={styles.willAttendMatinee}
            value={watch('willAttendMatinee')}
            error={errors.willAttendMatinee?.message}
            errorClassName={styles.error}
          >
            <input
              type="checkbox"
              hidden
              {...register('willAttendMatinee')}
            />
            <div className={styles.confirmTextWrapper}>
              <Checkbox
                checked={willAttendMatinee}
                onClick={() => { onChecked('willAttendMatinee'); }}
                className={styles.checkbox}
                disabled={disabledField}
              />
              <div className={styles.confirmText}>
                Ребёнок идёт на утренник
              </div>
            </div>
          </InputField>

          <InputField
            value={watch('gift')}
            label=""
            error={errors.gift?.message}
            className="input-field"
          >
            <Select
              type="input"
              className={classNames(
                'select',
                styles.select,
              )}
              classIsOpen="select--is-open"
              options={gifts}
              value={gift}
              isSearchable={false}
              isDisabled={disabledField}
              label="Выберите подарок"
              clearErrors={clearErrors}
              register={register('gift',
                { required: 'Пожалуйста, ответьте на вопрос' })}
              onChangeHandler={(selectOption) => {
                setGift(selectOption);
                onChangeHandlerSelect('gift', selectOption);
              }}
            />
          </InputField>
          <InputField
            value={watch('wish')}
            label="Коротко опишите ваше желание"
            error={errors.wish?.message}
            className="input-field"
          >
            <textarea
              disabled={disabledField}
              {...register('wish',
                {
                  required: 'Пожалуйста, опишите ваше желание',
                  pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' },
                  minLength: { value: 10, message: 'Минимум 10 символов' },
                })}
            />
          </InputField>
          <FileUploadController
            className={styles.fileUploader}
            setMaxSize={setMaxSize}
            onSelect={onFileSelect}
            mergedFiles={files}
            setMergedFiles={setFiles}
            disabled={disabledField}
          />
        </div>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Ваши данные</h3>
          {renderNameSurnamePatronymicInputs('parentSurname', 'Фамилия', 'Пожалуйста, введите Вашу фамилию', true)}
          {renderNameSurnamePatronymicInputs('parentFirstName', 'Имя', 'Пожалуйста, введите Ваше имя', true)}
          {renderNameSurnamePatronymicInputs('parentPatronymic', 'Отчество', 'Пожалуйста, введите Ваше отчество')}
          {renderBirthDateInput('parentBirthDate', false, true)}
          <Controller
            control={control}
            name="parentPhone"
            defaultValue=""
            rules={{
              required: 'Пожалуйста, введите свой номер',
            }}
            render={({ field: { value } }) => (
              <InputField
                label="Телефон"
                value={watch('parentPhone')}
                error={errors.parentPhone?.message}
                className="input-field"
              >
                <input
                  disabled
                  value={formatPhone(value)}
                  type="tel"
                  {...register('parentPhone',
                    { required: 'Пожалуйста, введите номер телефона' })}
                />
              </InputField>
            )}
          />
          <InputField
            label="E-mail"
            value={watch('parentEmail')}
            error={errors.parentEmail?.message}
            className="input-field"
          >
            <input
              disabled
              {...register('parentEmail',
                { required: 'Пожалуйста, введите свой E-mail', pattern: { value: emailRegex, message: 'Не корректный E-mail' } })}
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
              className={classNames(
                'select',
                styles.select,
              )}
              classIsOpen="select--is-open"
              options={filteredMunicipalities}
              isLoading={isLoadingMunicipalities}
              value={locationMO}
              isDisabled
              isSearchable={false}
              label="Округ"
              clearErrors={clearErrors}
              register={register('municipalityId',
                { required: 'Пожалуйста, выберите свой округ' })}
              onChangeHandler={(selectOption) => {
                onSelectChange('municipality', selectOption);
                setLocationMO(selectOption);
              }}
            />
          </InputField>
          <InputField
            value={watch('municipalityLocationId')}
            label=""
            error={errors.municipalityLocationId?.message}
            className="input-field"
          >
            <Select
              type="input"
              className={classNames(
                'select',
                styles.select,
              )}
              classIsOpen="select--is-open"
              options={location && location}
              isLoading={isLoadingMunicipalities}
              value={locationId}
              isDisabled
              isSearchable
              label="Населенный пункт"
              clearErrors={clearErrors}
              register={register('municipalityLocationId',
                { required: 'Пожалуйста, выберите свой населённый пункт' })}
              onChangeHandler={(selectOption) => {
                setLocationId(selectOption);
              }}
            />
          </InputField>
          <Controller
            control={control}
            name="address"
            rules={{
              required: 'Пожалуйста, введите адрес',
              pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={watch('address')}
                label="Адрес"
                error={errors.address?.message}
                className="input-field"
              >
                <input
                  value={value}
                  onChange={onChange}
                  disabled={disabledField}
                />
              </InputField>
            )}
          />
        </div>
      </div>

      <div className={styles.aside}>
        <div className={styles.disclaimer}>
          {isAuth ? (
            <>
              Корректно заполните все поля формы, только так исполнение желания станет возможным
              <span className>
                После оформления заявки
                с вами свяжется волонтер для подтверждения.
              </span>
            </>
          )
            : (
              <PushNotification type="warning">
                <p>
                  Чтобы оставить заявку на подарок ребенку Вам необходимо
                  {' '}
                  <Link to="/sign-in" className={styles.signInLink}>
                    авторизоваться?
                  </Link>
                </p>
              </PushNotification>
            )}
        </div>
        <div className={styles.unitedRussia}>
          <img src={unitedRussiaImg} alt="Единая Россия" className={styles.unitedRussiaImg} />
          <p>
            Мы вместе можем подарить ребенку приятные мгновения
            исполнения желания в преддверии волшебного праздника
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.checkboxWrapper}>
          <InputField
            className={styles.confirm}
            value={watch('eventAgreement')}
            error={errors.eventAgreement?.message}
            errorClassName={styles.error}
          >
            <input
              type="checkbox"
              hidden
              {...register('eventAgreement',
                { required: 'Пожалуйста, подтвердите согласие' })}
            />
            <div className={styles.confirmTextWrapper}>
              <Checkbox
                checked={confirmeventAgreement}
                onClick={() => { onChecked('eventAgreement'); }}
                className={styles.checkbox}
                disabled={disabledField}
              />
              <div className={styles.confirmText}>
                Я согласен с
                {' '}
                <a rel="noreferrer" target="_blanc" href={`${process.env.PUBLIC_URL}/tree-of-care-regulation.pdf`}>
                  Правилами проведения акции
                </a>
                <br />
              </div>
            </div>
          </InputField>
          <InputField
            className={styles.confirm}
            value={watch('personalDataAgreement')}
            error={errors.personalDataAgreement?.message}
            errorClassName={styles.error}
          >
            <input
              type="checkbox"
              hidden
              {...register('personalDataAgreement',
                { required: 'Пожалуйста, подтвердите согласие' })}
            />
            <div className={styles.confirmTextWrapper}>
              <Checkbox
                checked={confirmPersonalAgreement}
                onClick={() => { onChecked('personalDataAgreement'); }}
                className={styles.checkbox}
                disabled={disabledField}
              />
              <div className={styles.confirmText}>
                Я согласен с
                {' '}
                <a
                  href={`${process.env.PUBLIC_URL}/personal-data-processing.pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Правилами обработки персональных данных
                </a>
              </div>
            </div>
          </InputField>
        </div>
        <Button
          disabled={
        watch('childSurname').length === 0
        || watch('childFirstName').length === 0
        || watch('childPatronymic').length === 0
        || watch('childBirthDate').length < 6
        || watch('wish').length < 10
        || maxSize
        || watch('parentFirstName').length === 0
        || watch('parentSurname').length === 0
        || watch('parentPatronymic').length === 0
        || watch('parentBirthDate').length < 6
        || watch('parentPhone').length === 0
        || watch('parentEmail').length < 4 || errors.email
        || isLoadingMunicipalities
        || !watch('municipalityId')
        || watch('address').length < 4
        || !watch('eventAgreement')
        || !watch('personalDataAgreement')
        || isLoading
      }
          type="submit"
          className={styles.submit}
          typeButton="button-fill"
        >
          подтвердить
        </Button>
      </div>
      {errorMessages && (
      <div className={styles.errorWrapper}>
        <ErrorMessage message={errorMessages} />
      </div>
      )}
    </form>
  );

  return (
    <div className={styles.pageContent}>
      {susccesForm ? (
        <div className={styles.pageInfo}>
          <h2 className={styles.pageTitle}>
            ЗАЯВКА ОТПРАВЛЕНА
          </h2>
          <p>
            Ваша заявка в течение двух рабочих дней проходит модерацию и проверку. В процессе модерации с Вами могут связаться для уточнения описания подарка (модель, форма, цвет, другие характеристики).
          </p>
        </div>
      ) : (
        <>
          <div className={styles.pageInfo}>
            <h2 className={styles.pageTitle}>
              {(limit && limit[0]) ? 'Поступило более 600 заявок'
                : step && step.id === 1 && step.name}
            </h2>
            {limit && limit[0] ? (
              <div className={styles.warningDescription}>
                <Icon name="warning" className={styles.icon} />
                <p>
                  Приём заявок временно приостановлен, нам нужно ещё немного времени чтобы всё проверить. Если некоторые заявки будут отклонены, то приём возобновится.
                </p>
              </div>
            ) : (
              step && step.id === 1 && parseHtml(step.description)
            )}
          </div>
          {limit && !limit[0] && form}
        </>
      )}
    </div>
  );
};

XmasTreeFirstStep.propTypes = {
  step: PropTypes.arrayOf(PropTypes.objectOf(shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }))).isRequired,
};

export default XmasTreeFirstStep;
