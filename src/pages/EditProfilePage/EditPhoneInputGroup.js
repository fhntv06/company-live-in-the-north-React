import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import styles from './EditProfile.module.scss';
import Button from '../../components/Button/Button';
import InputField from '../../components/Inputs/InputField/InputField';
import { phoneRegex } from '../../helpers/regex';

const EditPasswordInputGroup = () => {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <>
      <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Смена пароля</p>
        <Controller
          control={control}
          name="authPhone"
          defaultValue=""
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
                {...register('authPhone')}
                mask="+7 999 999 9999"
                value={value}
                onChange={onChange}
                type="tel"
              />
            </InputField>
          )}
        />
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
