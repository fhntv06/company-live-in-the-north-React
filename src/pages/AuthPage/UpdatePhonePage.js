import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getStep, setStep, FormType, getUser,
} from '../../features/Auth/authSlice';
import Button from '../../components/Button/Button';
import CodeForm from '../../components/AuthForms/CodeForm/CodeForm';
import useGetParams from '../../hooks/useGetParams';
// import EmailForm from '../../components/AuthForms/EmailForm/EmailForm';
import { usePhoneChangeVerifyEmailMutation } from '../../services/authApi';
import Seo from '../../components/Seo/Seo';
import styles from './AuthPage.module.scss';

const UpdatePhonePage = () => {
  const step = useSelector((state) => getStep(state.auth));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlLocation = useGetParams();
  const [confirmEmail] = usePhoneChangeVerifyEmailMutation();
  const user = useSelector(getUser);

  const onSubmit = async () => {
    try {
      await confirmEmail().unwrap();
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    if (Object.keys(urlLocation)[0] === 'expires' || Object.keys(urlLocation)[0] === 'signature') {
      dispatch(setStep(FormType.PHONECONFIRM));
    } else if (step === FormType.CODE) {
      onSubmit();
    }
  }, []);

  const typeOfRender = useMemo(() => {
    let registrationComponent;
    let title;
    let description;
    switch (step) {
      case 'CODE':
        title = 'Смена телефона';
        description = `Проверьте свой почтовый ящик ${user && `${user.email.substring(0, 1)}*****${user.email.slice(-2)}`} — мы отправили вам письмо со ссылкой на изменение телефона.`;
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
      case 'PHONECONFIRM':
        title = 'Введите новый номер телефона';
        description = 'На ваш номер поступит звонок - не отвечайте на него. Введите последние 4 цифры номера в форму';
        registrationComponent = (
          <>
            <CodeForm
              type="updatePhone"
            />
          </>
        );
        break;
      case 'FINAL':
        title = 'Телефонный номер изменен';
        description = 'Вы удачно сменили ваш телфонный номер на портале «Живём на Севере». Используйте его при следующей авторизации';
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
    }
    return {
      title,
      description,
      component: registrationComponent,
    };
  }, [step]);

  return (
    <>
      <Seo title={'Изменить телефон | Живём на севере'} description="Изменить телефон пользователя" />
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

export default UpdatePhonePage;
