/* eslint-disable max-len */
import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import parser from 'html-react-parser';
import CodeForm from '../../components/AuthForms/CodeForm/CodeForm';
import ResetPasswordForm from '../../components/AuthForms/ResetPasswordForm/ResetPasswordForm';
import EmailForm from '../../components/AuthForms/EmailForm/EmailForm';
import Button from '../../components/Button/Button';
import {
  getStep, setStep, FormType, getUser,
} from '../../features/Auth/authSlice';
import useGetParams from '../../hooks/useGetParams';
import Seo from '../../components/Seo/Seo';
import styles from './AuthPage.module.scss';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step = useSelector((state) => getStep(state.auth));
  const urlLocation = useGetParams();
  const resetSteps = ['PHONECONFIRM', 'FINAL'];
  const user = useSelector(getUser);

  useEffect(() => {
    if (resetSteps.includes(step)) {
      dispatch(setStep(FormType.CODE));
    }
  }, [step]);

  useEffect(() => {
    if (Object.keys(urlLocation)[0] === 'email') {
      dispatch(setStep(FormType.RESETEMAIL));
    }
  }, []);

  const { pathname } = useLocation();

  let titleText = '';
  let type = '';
  let subtitle = null;
  switch (pathname) {
    case '/update-email':
      titleText = 'Смена EMAIL';
      type = 'updateEmail';
      break;
    case '/update-phone':
      titleText = 'Изменить телефон';
      type = 'updatePhone';
      break;
    case '/update-password':
      titleText = 'Изменить пароль';
      type = 'reset';
      break;
    case '/recovery-account':
      titleText = 'Восстановление профиля';
      type = 'reset';
      subtitle = 'Профиль был удалён. Для восстановления профиля заполните форму.';
      break;
    default:
      titleText = 'Восстановление пароля';
      type = 'reset';
      break;
  }

  const typeOfRender = useMemo(() => {
    let registrationComponent;
    let title;
    let description;
    switch (step) {
      case 'CODE':
        title = titleText;
        description = 'На ваш номер поступит звонок - не отвечайте на него. Введите последние 4 цифры номера в форму';
        registrationComponent = (
          <>
            <CodeForm
              type={type}
              userInfo={user}
              buttonTitle={type = 'reset' && 'Сменить по e-mail'}
            />
          </>
        );
        break;
      case 'UPDATEEMAIL':
      case 'VERIFITYEMAIL':
        title = titleText;
        description = null;
        registrationComponent = (
          <>
            <EmailForm
              type={type}
              userInfo={user}
              buttonTitle={type = 'reset' && 'Сменить по телефону'}
            />
          </>
        );
        break;
      case 'VERIFITYEMAILFINAL':
        title = titleText;
        description = type === 'reset' ? 'Проверьте свой почтовый ящик — мы отправили вам письмо со ссылкой на изменение пароля.' : 'Проверьте свой почтовый ящик — мы отправили вам письмо со ссылкой на подтверждение новой почты.';
        registrationComponent = (
          <div className={styles.complete}>
            <Button
              typeButton="button"
              onClick={
                () => {
                  navigate('/', { replace: true });
                  dispatch(setStep(FormType.CODE));
                }
              }
              className={styles.completeBtn}
            >
              хорошо
            </Button>
          </div>
        );
        break;
      case 'RESETEMAIL':
      case 'RESETPHONE':
        title = titleText;
        description = null;
        registrationComponent = <ResetPasswordForm type={step} />;
        break;
      case 'RESETFINAL':
        title = 'Пароль изменен';
        subtitle = null;
        description = 'Пожалуйста, запомните новый пароль от&nbsp;вашего профиля, не&nbsp;передавайте его посторонним людям.';
        registrationComponent = (
          <div className={styles.complete}>
            <Button typeButton="button" onClick={() => navigate('/', { replace: true })} className={styles.completeBtn}>
              Спасибо
            </Button>
          </div>
        );
        break;
    }
    return {
      title,
      description,
      component: registrationComponent,
      subtitle,
    };
  }, [step]);

  return (
    <>
      <Seo title={`${titleText} | Живём на севере`} description="Живём на севере" />
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              {typeOfRender && typeOfRender.title && parser(typeOfRender.title)}
            </h2>
            {typeOfRender.subtitle
            && (
            <div className={styles.description}>
              {parser(typeOfRender.subtitle)}
            </div>
            )}
            {typeOfRender.description
            && (
            <div className={styles.description}>
              {parser(typeOfRender.description)}
            </div>
            )}
          </div>
          {typeOfRender.component}
        </div>
      </div>
    </>

  );
};

export default ResetPasswordPage;
