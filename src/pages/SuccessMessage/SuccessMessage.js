import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Seo from '../../components/Seo/Seo';
import styles from '../AuthPage/AuthPage.module.scss';
import { useLazyGetUserQuery } from '../../services/authApi';

const UpdatePhonePage = () => {
  const [triggerGetUser] = useLazyGetUserQuery();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    // if (pathname !== '/email-confirmed') return;

    const getUser = async () => {
      try {
        const response = triggerGetUser().unwrap();

        if (!response.success) {
          throw new Error('Что-то пошло не так');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [pathname]);

  let titleText = '';
  let description = '';
  switch (pathname) {
    case '/email-updated':
      titleText = 'Ваш email изменён';
      description = 'Адрес вашей новой электронной почты подтверждён.';
      break;
    default:
      titleText = 'Ваш email подтверждён';
      description = 'Теперь вы можете пользоваться своим почтовым ящиком для получения уведомлений от портала «Живём на Севере»';
  }

  return (
    <>
      <Seo title="Успех | Живём на севере" description="Живём на севере" />
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              {titleText}
            </h2>
            {description
            && (
            <div className={styles.description}>
              {description}
            </div>
            )}
          </div>
          <div className={styles.complete}>
            <Button
              typeButton="button"
              onClick={
                () => {
                  navigate('/', { replace: true });
                }
              }
              className={styles.completeBtn}
            >
              хорошо
            </Button>
          </div>
        </div>
      </div>
    </>

  );
};

export default UpdatePhonePage;
