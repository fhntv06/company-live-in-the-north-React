import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStep,
  setStep,
  FormType,
  getPhoneRegister,
} from '../../features/Auth/authSlice';
import LoginForm from '../../components/AuthForms/LoginForm/LoginForm';
import Seo from '../../components/Seo/Seo';
import styles from './AuthPage.module.scss';

const SignInPage = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => getStep(state.auth));
  const phoneIsRegister = useSelector((state) => getPhoneRegister(state.auth));
  const resetSteps = ['VERIFITYEMAIL', 'VERIFITYEMAILFINAL', 'RESETEMAIL', 'RESETPHONE', 'RESETFINAL', 'FINAL', 'REGISTRATION'];

  useEffect(() => {
    if (resetSteps.includes(step)) {
      dispatch(setStep(FormType.CODE));
    }
  }, [step]);

  return (
    <>
      <Seo title={'Вход в личный кабинет | Живём на севере'} description="Вход в личный кабинет пользователя" />
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              Вход в личный кабинет
            </h2>
            {phoneIsRegister
            && (
            <div className={styles.description}>
              Номер телефона уже зарегистрирован.
              Пожалуйста, авторизуйтесь или воспользуйтесь восстановлением пароля.
            </div>
            )}
          </div>
          <LoginForm
            lostPassHandler={() => { }}
          />
        </div>
      </div>
    </>

  );
};

export default SignInPage;
