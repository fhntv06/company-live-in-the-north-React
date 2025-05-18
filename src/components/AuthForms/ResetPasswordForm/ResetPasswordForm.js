import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import {
  getPhone,
  setStep,
  FormType,
  setError,
  getError,
} from '../../../features/Auth/authSlice';
import { passwordRegex } from '../../../helpers/regex';
import { usePasswordUpdatePhoneMutation, usePasswordUpdateEmailMutation } from '../../../services/authApi';
import { getRawNumber } from '../../../helpers/getRawNumber';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import useGetParams from '../../../hooks/useGetParams';
import styles from '../AuthForms.module.scss';
import Icon from '../../Icon/Icon';

const ResetPasswordForm = ({ type }) => {
  const dispatch = useDispatch();
  const phoneValue = useSelector((state) => getPhone(state.auth));
  const errorMessage = useSelector((state) => getError(state.auth));
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: phoneValue,
      password: '',
      passwordConfirmation: '',
    },
  });

  const showPass = (e) => {
    const input = e.target.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  const urlParams = useGetParams();

  const [resetPassword, { isLoading }] = type === 'RESETPHONE' ? usePasswordUpdatePhoneMutation() : usePasswordUpdateEmailMutation();
  const onSubmitRegistration = async (formData) => {
    const data = {
      phone: getRawNumber(formData.phone),
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      email: urlParams?.email,
      // expires: urlParams?.expires,
      signature: urlParams?.signature,
    };
    dispatch(setError(null));
    try {
      const result = await resetPassword(data).unwrap();
      if (result) {
        if (result) {
          if (result.success) {
            dispatch(setStep(FormType.RESETFINAL));
          }
        }
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
    }
  };

  const changeStep = () => {
    dispatch(setStep(type === 'RESETPHONE' ? FormType.VERIFITYEMAIL : FormType.CODE));
  };

  const buttonLink = (
    <div className={`${styles.bottom} ${styles.bottomLink} ${styles.singleBottomLink}`}>
      <button type="button" onClick={changeStep}>
        {type === 'RESETPHONE' ? 'Восстановить по e-mail' : 'Восстановить по телефону'}
      </button>
    </div>
  );

  return (
    <form className={`${styles.form} ${styles.registerForm}`} onSubmit={handleSubmit(onSubmitRegistration)}>
      <div className={styles.inputsWrapper}>
        <div className={styles.section}>
          <InputField
            value={watch('password')}
            label="Пароль"
            error={errors.password?.message}
            className="input-field"
          >
            <input
              autoComplete="new-password"
              type="password"
              {...register('password',
                {
                  required: 'Пожалуйста, введите пароль',
                  pattern: {
                    value: passwordRegex,
                    message: 'Должны присутствовать цифры и буквы большого и малого регистра',
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
              {...register('passwordConfirmation',
                {
                  required: 'Пожалуйста, введите пароль повторно',
                  validate: (val) => {
                    if (watch('password') !== val) {
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
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          disabled={(watch('password').length === 0 && watch('passwordConfirmation') !== watch('password'))
         || isLoading}
          type="submit"
          className={styles.submit}
          typeButton="button-fill"
        >
          подтвердить
        </Button>
      </div>
      {buttonLink}
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
};

ResetPasswordForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
