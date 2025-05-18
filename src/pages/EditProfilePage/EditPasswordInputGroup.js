import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditProfile.module.scss';
import Button from '../../components/Button/Button';
import InputField from '../../components/Inputs/InputField/InputField';

const EditPasswordInputGroup = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <>
      <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Смена пароля</p>
        <InputField
          value={watch('password')}
          label="Пароль"
          error={errors.password?.message}
          className="input-field"
        >
          <input
            type="password"
            {...register('password',
              { required: 'Пожалуйста, введите пароль' })}
          />
        </InputField>
        <InputField
          value={watch('newPassword')}
          label="Новый пароль"
          error={errors.newPassword?.message}
          className="input-field"
        >
          <input
            type="password"
            {...register('password',
              { required: 'Пожалуйста, повторите пароль' })}
          />
        </InputField>
      </div>
      <div className={styles.submitButton}>
        <Button typeButton="button-fill">
          Подтвердить
        </Button>
      </div>
    </>
  );
};

export default EditPasswordInputGroup;
