/* eslint-disable indent */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import Checkbox from '../../Checkbox/Checkbox';
import {
  getPhone,
  setStep,
  FormType,
  setError,
  getError,
} from '../../../features/Auth/authSlice';
import { passwordRegex, emailRegex, cyrilicRegex } from '../../../helpers/regex';
import { useRegisterMutation } from '../../../services/authApi';
import { useGetAllMunicipalitiesQuery } from '../../../services/municipalitiesApi';
import { getRawNumber } from '../../../helpers/getRawNumber';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import styles from '../AuthForms.module.scss';
import Icon from '../../Icon/Icon';
import useResize from '../../../hooks/useResize';
import { isPersonYoungAdult } from '../../../helpers/isPersonAdult';

export const getBirthDateTimestamp = (value) => {
  const [day, month, year] = value.split('.');
  return Date.parse(`${month}/${day}/${year}`);
};

const RegistrationForm = ({ referralCode }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const phoneValue = useSelector((state) => getPhone(state.auth));
  const errorMessage = useSelector((state) => getError(state.auth));
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState();
  const resize = useResize();
  const btnWrapperRef = useRef();
  const referalWrapperRef = useRef();
  const [locationMO, setLocationMO] = useState();

  useEffect(() => {
    if (!(btnWrapperRef.current && referalWrapperRef.current)) return;

    const btnWrapperHeight = btnWrapperRef.current.clientHeight;
    const referalWrapperHeight = referalWrapperRef.current.clientHeight;

    referalWrapperRef.current.style.setProperty('--btn-wrapper-height', `${btnWrapperHeight}px`);
    referalWrapperRef.current.style.setProperty('--referal-wrapper-height', `${referalWrapperHeight}px`);
  }, [resize, btnWrapperRef.current, referalWrapperRef.current]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: phoneValue,
      newPassword: '',
      passwordConfirmation: '',
      surname: '',
      firstName: '',
      patronymic: '',
      email: '',
      birthDate: '',
      municipalityId: '',
      municipalityLocation: '',
      referralCode: referralCode || '',
      personalDataAgreement: false,
    },
  });

  const onChecked = () => {
    setConfirm((prev) => {
      setValue('personalDataAgreement', !prev);
      if (!prev) clearErrors('personalDataAgreement');
      return !prev;
    });
  };

  const showPass = (e) => {
    const input = e.target.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  const [registration, { isLoading }] = useRegisterMutation();
  const {
    data: municipalities,
    isLoading: isLoadingMunicipalities,
  } = useGetAllMunicipalitiesQuery();

  const filteredMunicipalities = municipalities && municipalities?.filtred;
  const onSubmitRegistration = async (formData) => {
    const data = {
      phone: getRawNumber(formData.phone),
      password: formData.newPassword,
      email: formData.email,
      first_name: formData.firstName,
      surname: formData.surname,
      patronymic: formData.patronymic,
      municipality_id: locationMO.value,
      municipality_location_id: locationId.value,
      referrer_code: formData.referralCode,
      personal_data_agreement: 1,
      password_confirmation: formData.passwordConfirmation,
      birth_date: formData.birthDate,
    };
    dispatch(setError(null));

    try {
      const result = await registration(data).unwrap();
      if (result.success) {
        dispatch(setStep(FormType.FINAL));
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
    }
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

  return (
    <form className={`${styles.form} ${styles.registerForm}`} autoComplete="off" onSubmit={handleSubmit(onSubmitRegistration)}>
      <div className={styles.inputsWrapper}>
        <div className={styles.section}>
          <h5 className={styles.sectionHeader}>
            Придумайте пароль
          </h5>
          <input
            style={{ display: 'none' }}
            autoComplete="password"
            type="password"
            id="password"
          />
          <InputField
            value={watch('newPassword')}
            label="Пароль"
            error={errors.newPassword?.message}
            className="input-field"
          >
            <input
              autoComplete="new-password"
              type="password"
              id="newPassword"
              {...register('newPassword',
                {
                  required: 'Пожалуйста, введите пароль',
                  pattern: {
                    value: passwordRegex,
                    message: 'Должны присутствовать цифры и латинские буквы большого и малого регистра',
                  },
                  minLength: {
                    value: 8,
                    message: 'Минимум 8 символов',
                  },
                })}
            />
            <button type="button" onClick={showPass} className={styles.showPass}>
              <Icon name="show-pass" />
            </button>
          </InputField>
          <InputField
            value={watch('passwordConfirmation')}
            label="Повторите пароль"
            error={errors.passwordConfirmation?.message}
            className="input-field"
          >
            <input
              autoComplete="off"
              type="password"
              id="passwordConfirmation"
              {...register('passwordConfirmation',
                {
                  required: 'Пожалуйста, введите пароль повторно',
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Пароли должны совпадать';
                    }
                    return null;
                  },
                })}
            />
            <button type="button" onClick={showPass} className={styles.showPass}>
              <Icon name="show-pass" />
            </button>
          </InputField>
        </div>
        <div className={styles.section}>
          <h5 className={styles.sectionHeader}>
            Представьтесь, пожалуйста
          </h5>
          <InputField
            value={watch('surname')}
            label="Фамилия"
            error={errors.surname?.message}
            className="input-field"
          >
            <input
              autoComplete="off"
              id="surname"
              {...register('surname',
                { required: 'Пожалуйста, введите свою фамилию', pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' }, minLength: { value: 3, message: 'Минимум 3 символа' } })}
            />
          </InputField>
          <InputField
            value={watch('firstName')}
            label="Имя"
            error={errors.firstName?.message}
            className="input-field"
          >
            <input
              autoComplete="off"
              id="firstName"
              {...register('firstName',
                { required: 'Пожалуйста, введите своё имя', pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' }, minLength: { value: 3, message: 'Минимум 3 символа' } })}
            />
          </InputField>
          <InputField
            value={watch('patronymic')}
            label="Отчество (не обязательно)"
            error={errors.patronymic?.message}
            className="input-field"
          >
            <input
              autoComplete="off"
              id="patronymic"
              {...register('patronymic',
                { pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' }, minLength: { value: 3, message: 'Минимум 3 символа' } })}
            />
          </InputField>
          <InputField
            label="E-mail"
            value={watch('email')}
            error={errors.email?.message}
            className="input-field"
          >
            <input
              autoComplete="off"
              id="email"
              {...register('email',
                { required: 'Пожалуйста, введите свой E-mail', pattern: { value: emailRegex, message: 'Некорректный E-mail' } })}
            />
          </InputField>
          <div className={styles.columnsField}>
            <InputField
              label="Дата рождения"
              value={watch('birthDate')}
              error={errors.birthDate?.message}
              className="input-field"
            >
              <InputMask
                autoComplete="off"
                mask="99.99.9999"
                id="birthDate"
                {...register('birthDate', {
                  validate: (value) => {
                    const timestamp = getBirthDateTimestamp(value);
                    const isDateValid = !Number.isNaN(timestamp);
                    const currentDate = new Date();
                    const valueDate = new Date(timestamp);
                    const isYoungAdult = isPersonYoungAdult(value.replaceAll('.', '-'));
                    const isDateBeforeCurrent = valueDate.getTime() <= currentDate.getTime();
                    if (!isDateValid) {
                      return 'Пожалуйста, введите дату рождения в формате ДД.ММ.ГГГГ';
                    }
                    if (!isDateBeforeCurrent) {
                      return 'Дата рождения не может быть больше текущей даты';
                    }
                    if (!isYoungAdult) {
                      return 'Для регистрации, вы должны быть старше 14 лет';
                    }
                    return true;
                  },
                })}
              />
            </InputField>
            <div className={styles.inputDescription}>
              Чтобы вы могли участвовать в обсуждениях
              и голосованиях, вам должно исполниться 18 лет
            </div>
          </div>

        </div>
        <div className={styles.section}>
          <h5 className={styles.sectionHeader}>
            Где вы проживаете?
          </h5>

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
              value={locationMO}
              isLoading={isLoadingMunicipalities}
              isDisabled={
                isLoadingMunicipalities || !filteredMunicipalities || !filteredMunicipalities.length
              }
              isSearchable={false}
              label="Округ"
              clearErrors={clearErrors}
              id="municipalityId"
              register={register('municipalityId',
                { required: 'Пожалуйста, выберите свой округ' })}
              onChangeHandler={(selectOption) => {
                onSelectChange('municipalityId', selectOption);
                setLocationMO(selectOption);
              }}
            />
          </InputField>
          <InputField
            value={watch('municipalityLocation')}
            label=""
            error={errors.municipalityLocation?.message}
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
              isDisabled={
                isLoadingMunicipalities || !filteredMunicipalities || !filteredMunicipalities.length
              }
              isSearchable
              label="Населенный пункт"
              clearErrors={clearErrors}
              id="municipalityLocation"
              register={register('municipalityLocation',
                { required: 'Пожалуйста, выберите свой населённый пункт' })}
              onChangeHandler={(selectOption) => {
                setLocationId(selectOption);
              }}
            />
          </InputField>
          <div className={styles.referalWrapper} ref={referalWrapperRef}>
            <InputField
              label="Есть реферальный код"
              value={watch('referralCode')}
              error={errors.referralCode?.message}
              className={`input-field ${styles.referalField}`}
            >
              <input
                id="referralCode"
                autoComplete="off"
                {...register('referralCode')}
              />
            </InputField>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper} ref={btnWrapperRef}>
        <Button
          disabled={watch('newPassword').length === 0
         || isLoading
         || watch('surname').length === 0
         || watch('firstName').length === 0
         || watch('email').length === 0
         || watch('birthDate').length < 6
         || !watch('municipalityId')
         || !watch('municipalityLocation')
         || !watch('personalDataAgreement')}
          type="submit"
          className={styles.submit}
          typeButton="button-fill"
        >
          зарегистрироваться
        </Button>
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
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  referralCode: PropTypes.string,
};

RegistrationForm.defaultProps = {
  referralCode: null,
};

export default RegistrationForm;
