import React, { useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';
import { useNavigate, NavLink } from 'react-router-dom';
import Checkbox from '../../Checkbox/Checkbox';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import { useLoginMutation } from '../../../services/authApi';
import { phoneRegex } from '../../../helpers/regex';
import {
  setError,
  getError,
  loginAction,
} from '../../../features/Auth/authSlice';
import Icon from '../../Icon/Icon';
import { getRawNumber } from '../../../helpers/getRawNumber';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import styles from '../AuthForms.module.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '',
      password: '',
      authConfirm: false,
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const errorMessage = useSelector((state) => getError(state.auth));
  // const isAuth = useSelector((state) => getIsAuth(state.auth));
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => document.body.click(), 1000);

    return () => clearTimeout(timer);
  }, []);

  const onSubmitLogin = async ({ phone, password }) => {
    dispatch(setError(null));
    const data = {
      phone: getRawNumber(phone),
      password,
    };
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        dispatch(loginAction(result));
        navigate('/', { replace: true });
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
      console.log(error.status === 410);
      if (error.status === 410) {
        dispatch(setError(null));
        navigate('/recovery-account', { replace: true });
      }
    }
  };

  const onChecked = () => {
    setConfirm((prev) => {
      setValue('authConfirm', !prev);
      if (!prev) clearErrors('authConfirm');
      return !prev;
    });
  };

  const showPass = (e) => {
    const input = e.target.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  return (
    <form className={`${styles.form} ${styles.loginForm}`} onSubmit={handleSubmit(onSubmitLogin)}>
      <div className={styles.inputsWrapper}>
        <Controller
          control={control}
          name="phone"
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
          value={watch('password')}
          label="Пароль"
          error={errors.password?.message}
          className="input-field"
        >
          <input
            autoComplete="new-password"
            type="password"
            {...register('password',
              { required: 'Пожалуйста, введите пароль' })}
          />
          <button type="button" onClick={showPass} className={styles.showPass}>
            <Icon name="show-pass" />
          </button>
        </InputField>
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit" className={styles.submit} disabled={(watch('phone').length === 0 || watch('password').length === 0) || isLoading} typeButton="button-fill">
          войти
        </Button>
      </div>
      <div className={styles.formBottomWrapper}>
        <div className={`${styles.bottom} ${styles.bottomCheckbox}`}>
          <InputField
            className={styles.confirm}
            value={watch('authConfirm')}
            error={errors.authConfirm?.message}
            errorClassName={styles.error}
          >
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                hidden
                {...register('authConfirm',
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
        <div className={`${styles.bottom} ${styles.bottomLink}`}>
          <NavLink to="/reset-password">
            Забыли пароль?
          </NavLink>
        </div>
        <div className={`${styles.bottom} ${styles.bottomLink}`}>
          <NavLink to="/sign-up">
            Зарегистрироваться
          </NavLink>
        </div>
      </div>
      { errorMessage && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
};

export default LoginForm;
