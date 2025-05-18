import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import Avatar from '../../components/Avatar/Avatar';
import styles from './EditProfile.module.scss';
import InputField from '../../components/Inputs/InputField/InputField';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import { getUser } from '../../features/Auth/authSlice';
import useModal from '../../hooks/useModal';
import { useUpdateAvatarMutation, useUpdateUserMutation, useDeleteAvatarMutation } from '../../services/authApi';
import { useGetAllMunicipalitiesQuery } from '../../services/municipalitiesApi';
import { formatPhone } from '../../helpers/format';
import InfoModal from '../../components/InfoModal/InfoModal';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Icon from '../../components/Icon/Icon';

// const genders = [
//   { value: 0, label: 'Муж.' },
//   { value: 1, label: 'Жен.' },
// ];

const MainEditInputGroup = () => {
  const user = useSelector(getUser);

  const {
    isOpen, openModalHandler,
    closeModalHandler,
  } = useModal();

  const {
    firstName,
    surname,
    patronymic,
    email,
    birthDate,
    phone,
    gender,
    municipality,
    municipalityLocation,
    municipalityUpdatableDate,
    avatar,
  } = user;

  const {
    register,
    watch,
    formState: { errors },
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      surname,
      firstName,
      patronymic,
      birthDate,
      email,
      phone,
      gender,
      municipality: { value: municipality.id, label: municipality.name },
      municipalityLocation: { value: municipalityLocation.id, label: municipalityLocation.name },
      password: '123456',
    },

    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const [deleteAvatar] = useDeleteAvatarMutation();

  const [location, setLocation] = useState([{ value: municipality.id, label: municipality.name }]);
  // eslint-disable-next-line max-len
  const [locationMO, setLocationMO] = useState([{ value: municipality.id, label: municipality.name }]);
  const [locationId, setLocationId] = useState(
    { value: municipalityLocation.id, label: municipalityLocation.name },
  );
  const [municipalityDisabled, setMunicipalityDisabled] = useState(false);
  const [municipalityChanges, setMunicipalityChanges] = useState(false);
  const [warningMunicipality, setWarningMunicipality] = useState();
  const [selectedAvatar] = useUpdateAvatarMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const getDate = (date, day) => {
    let updateDate = new Date(date);
    updateDate = moment(updateDate).utc().format('DD.MM.YYYY');
    if (day) {
      const currentDate = moment();
      const newDate = currentDate.add(day, 'days');
      updateDate = moment(newDate).utc().format('DD.MM.YYYY');
    }
    return updateDate;
  };

  useEffect(() => {
    if (municipalityUpdatableDate) {
      const dateLastUpdate = new Date(municipalityUpdatableDate);
      const currentDate = new Date(new Date());
      const convertDateLastUpdate = new Date(dateLastUpdate);
      if (convertDateLastUpdate.getTime() >= currentDate.getTime()) {
        setMunicipalityDisabled(true);
        setWarningMunicipality(`Сейчас изменить муниципалитет нельзя! В следующий раз можно будет изменить ${getDate(municipalityUpdatableDate)}`);
      }
    }
  }, [municipalityUpdatableDate]);

  useEffect(() => {
    if (location[0].value !== municipality.id
      || locationId.value !== municipalityLocation.id) {
      setMunicipalityChanges(true);
    } else {
      setMunicipalityChanges(false);
    }
  }, [location, locationId]);

  const {
    data: municipalities,
    isLoading: isLoadingMunicipalities,
  } = useGetAllMunicipalitiesQuery();

  const onChangeAvatarSubmit = async (image) => {
    try {
      const result = await selectedAvatar(image).unwrap();
      if (result.success) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAvatarHandler = async () => {
    if (!avatar) return;

    try {
      const result = await deleteAvatar().unwrap();

      if (result.success) {
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onUpdateUser = async (formData) => {
    closeModalHandler();
    const data = {
      first_name: formData.firstName,
      surname: formData.surname,
      patronymic: formData.patronymic,
      municipality_id: municipality.id !== locationMO.value
        ? locationMO.value : null,
      municipality_location_id: municipalityLocation.id !== locationId.value
        ? locationId.value : null,
    };
    try {
      const result = await updateUser(data).unwrap();
      if (result.success) {
        window.location.reload(false);
      }
    } catch (error) {
      console.log('');
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

  const filteredMunicipalities = municipalities && municipalities?.filtred;

  return (
    <form className={`${styles.form} ${styles.registerForm}`} onSubmit={handleSubmit(onUpdateUser)}>
      <Avatar
        name={firstName}
        surname={surname}
        big
        onChange={onChangeAvatarSubmit}
        onDelete={deleteAvatarHandler}
        className={styles.avatar}
        wrapperClassName={styles.avatarWrapper}
        showDeleteButton
        avatar={avatar && avatar?.url}
      />
      <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Общая информация</p>
        <InputField
          value={watch('surname')}
          label="Фамилия"
          error={errors.surname?.message}
          className="input-field"
        >
          <input
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
            type="text"
            {...register('firstName',
              { required: 'Пожалуйста, введите имя' })}
          />
        </InputField>
        <InputField
          value={watch('patronymic')}
          label="Отчество(не обязательно)"
          // error={errors.patronymic?.message}
          className="input-field"
        >
          <input
            type="text"
            {...register('patronymic')}
          />
        </InputField>
        <InputField
          value={watch('birthDate')}
          label="Дата рождения"
          error={errors.birthDate?.message}
          className="input-field"
        >
          <input
            disabled
            type="birthdate"
            {...register('birthDate',
              { required: 'Пожалуйста, введите дату рождения' })}
          />
        </InputField>
        <InputField
          value={watch('password')}
          label="Пароль"
          error={errors.password?.message}
          className={classNames(
            'input-field',
            styles.disabledInputField,
          )}
        >
          <input
            disabled
            type="password"
            {...register('password',
              { required: 'Пожалуйста, введите пароль' })}
          />
          <Link className={styles.link} to="/update-password">
            <Icon name="edit" className={styles.editIcon} />
          </Link>
        </InputField>
        <InputField
          value={watch('email')}
          label="E-mail"
          error={errors.email?.message}
          className={classNames(
            'input-field',
            styles.disabledInputField,
          )}
        >
          <input
            disabled
            type="email"
            {...register('email',
              { required: 'Пожалуйста, введите E-mail' })}
          />
          <Link className={styles.link} to="/update-email">
            <Icon name="edit" className={styles.editIcon} />
          </Link>
        </InputField>
        <InputField
          label="Телефон"
          value={watch('phone')}
          error={errors.phone?.message}
          className={classNames(
            'input-field',
            styles.disabledInputField,
          )}
        >
          <input
            disabled
            value={formatPhone(phone)}
            type="tel"
            {...register('phone',
              { required: 'Пожалуйста, введите E-mail' })}
          />
          <Link className={styles.link} to="/update-phone">
            <Icon name="edit" className={styles.editIcon} />
          </Link>
        </InputField>
      </div>
      <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Адрес проживания</p>
        <InputField
          value={watch('municipality')}
          label=""
          error={errors.municipality?.message}
          className="input-field"
        >
          <Select
            type="input"
            className="select"
            classIsOpen="select--is-open"
            options={filteredMunicipalities}
            isLoading={isLoadingMunicipalities}
            value={locationMO}
            isDisabled={
                isLoadingMunicipalities
                || !filteredMunicipalities
                || !filteredMunicipalities.length
                || municipalityDisabled
              }
            isSearchable={false}
            label="Округ"
            clearErrors={clearErrors}
            register={register('municipality',
              { required: 'Пожалуйста, выберите свой округ' })}
            onChangeHandler={(selectOption) => {
              onSelectChange('municipality', selectOption);
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
            className="select"
            classIsOpen="select--is-open"
            options={location && location}
            isLoading={isLoadingMunicipalities}
            value={locationId}
            isDisabled={
                isLoadingMunicipalities
                || !filteredMunicipalities
                || !filteredMunicipalities.length
                || municipalityDisabled
              }
            isSearchable={false}
            label="Населенный пункт"
            clearErrors={clearErrors}
            register={register('municipalityLocation',
              { required: 'Пожалуйста, выберите свой населённый пункт' })}
            onChangeHandler={(selectOption) => {
              setLocationId(selectOption);
            }}
          />
        </InputField>
        {warningMunicipality && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={warningMunicipality} />
        </div>
        )}
        {/* <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Дополнительная информация</p>
        <InputField
          value={watch('gender')}
          label=""
          error={errors.gender?.message}
          className="input-field"
        >
          <Select
            type="input"
            className="select"
            classIsOpen="select--is-open"
            options={genders}
            isSearchable
            label="Пол"
            clearErrors={clearErrors}
            register={register('gender',
              { required: 'Пожалуйста, выберите свой пол' })}
            setValue={setValue}
          />
        </InputField>
        <InputField
          value={watch('vkLink')}
          label="Аккаунт в VK"
          error={errors.vkLink?.message}
          className="input-field"
        >
          <input
            type="text"
            {...register('vkLink',
              { required: 'Пожалуйста, введите ссылку в VK' })}
          />
        </InputField> */}
      </div>
      <div className={styles.submitButton}>
        <Button
          type={municipalityChanges ? 'button' : 'submit'}
          className={styles.confirmButton}
          onClick={municipalityChanges ? openModalHandler : handleSubmit(onUpdateUser)}
          disabled={
            watch('surname').length === 0
             || isLoading
         || watch('firstName').length === 0
}
          typeButton="button-fill"
        >
          Подтвердить
        </Button>
      </div>
      <InfoModal
        isOpen={isOpen}
        onClose={closeModalHandler}
        onSubmit={handleSubmit(onUpdateUser)}
        title="Вы уверены?"
        description={`При смене муниципалитета все незавершенные/не выданные заказы будут аннулированы. В следующий раз муниципалитет можно будет изменить ${getDate(new Date(), 30)}`}
      />
    </form>
  );
};

export default MainEditInputGroup;
