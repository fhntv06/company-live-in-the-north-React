/* eslint-disable max-len */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeForm from '../../components/AuthForms/CodeForm/CodeForm';
import RegistrationForm from '../../components/AuthForms/RegistrationForm/RegistrationForm';
import Button from '../../components/Button/Button';
import { getStep, setStep, FormType } from '../../features/Auth/authSlice';
import useGetParams from '../../hooks/useGetParams';
import Seo from '../../components/Seo/Seo';
import styles from './AuthPage.module.scss';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState();
  const step = useSelector((state) => getStep(state.auth));
  const [firstVisit, setFirstVisit] = useState(true);
  const resetSteps = ['VERIFITYEMAIL', 'VERIFITYEMAILFINAL', 'RESETEMAIL', 'RESETPHONE', 'RESETFINAL'];

  useEffect(() => {
    if (firstVisit) {
      dispatch(setStep(FormType.CODE));
      setFirstVisit(false);
    }
  }, []);

  useEffect(() => {
    if (resetSteps.includes(step)) {
      dispatch(setStep(FormType.CODE));
    }
  }, [step]);

  const urlLocation = useGetParams();
  useEffect(() => {
    if (Object.keys(urlLocation)[0] === 'referralCode') {
      setReferralCode(urlLocation.referralCode);
    }
  }, []);

  const typeOfRender = useMemo(() => {
    let registrationComponent;
    let title;
    let description;
    switch (step) {
      case 'CODE':
        title = 'Регистрация';
        description = 'На ваш номер поступит звонок - не отвечайте на него. Введите последние 4 цифры номера в форму';
        registrationComponent = (
          <>
            <CodeForm
              lostPassHandler={() => { }}
            />
          </>
        );
        break;
      case 'REGISTRATION':
        title = 'Регистрация';
        description = null;
        registrationComponent = <RegistrationForm referralCode={referralCode} />;
        break;
      case 'FINAL':
        title = 'Спасибо';
        description = 'Вы удачно зарегистрировались на портале «Живём на Севере». Проверьте свой почтовый ящик — мы отправили вам письмо со ссылкой для завершения регистрации.';
        registrationComponent = (
          <div className={styles.complete}>
            <Button typeButton="button" onClick={() => navigate('/sign-in', { replace: true })} className={styles.completeBtn}>
              войти
            </Button>
          </div>
        );
        break;
    }
    return {
      title,
      description,
      component: registrationComponent,
    };
  }, [step]);

  return (
    <>
      <Seo title={'Регистрация | Живём на севере'} description="Регистрация пользователя" />
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              {typeOfRender.title}
            </h2>
            {typeOfRender.description
            && (
            <div className={styles.description}>
              {typeOfRender.description}
            </div>
            )}
          </div>
          {typeOfRender.component}
        </div>
      </div>
    </>

  );
};

export default SignUpPage;
