import React, { useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { cityIn } from 'lvovich';
import styles from './DiscussionContent.module.scss';
import useGetLocation from '../../../hooks/useGetLocation';
import PushNotification from '../../../components/PushNotification/PushNotification';

const DiscussionWarning = ({
  item,
  isAuth,
  user,
  setDisabled,
}) => {
  const {
    municipalityId, city, id,
  } = item;

  const otherMunicipality = municipalityId
  && isAuth && !(user && user.municipality.id === municipalityId);

  const otherCity = () => {
    let otherCityStatus = false;
    if (id && city.length > 0 && isAuth) {
      for (let i = 0; i < city.length; i++) {
        if (city[i].id === user.municipalityLocation.id) {
          otherCityStatus = false;
          break;
        }
        otherCityStatus = city[i].id !== user.municipalityLocation.id;
      }
    }
    return otherCityStatus;
  };

  const visibleWarning = !isAuth
  || otherMunicipality
  || otherCity()
  || (user && !user.emailVerifiedAt);
  const notificationType = otherCity()
    ? 'otherCity'
    : (otherMunicipality ? 'otherMunicipality' : (user && !user.emailVerifiedAt ? 'emailVerified' : 'warning'));
  const municipalityLocation = notificationType && municipalityId && useGetLocation(municipalityId);

  useEffect(() => {
    if (visibleWarning) {
      setDisabled(true);
    }
  }, [visibleWarning]);

  let notificationContent;
  switch (notificationType) {
    case 'warning':
      notificationContent = (
        <p>
          Только авторизованные пользователи могут голосовать и оставлять идеи.
          {' '}
          <Link to="/sign-in" className={styles.signInLink}>
            Зарегистрироваться
          </Link>
          ?
        </p>
      );
      break;
    case 'otherMunicipality':
      notificationContent = (
        <p>
          Только пользователи, проживающие
          в муниципальном образовании
          {' '}
          <span className={styles.location}>{municipalityLocation}</span>
          ,
          {' '}
          могут участвовать в обсуждении
        </p>
      );
      break;
    case 'otherCity':
      notificationContent = (
        <p>
          Только пользователи, проживающие в
          {' '}
          {city.length > 0 && city.map((cityItem) => (
            <>
              <span className={styles.location}>
                {cityIn(cityItem.name)}
              </span>
              ,
              {' '}
            </>
          ))}
          могут участвовать в обсуждении
        </p>
      );
      break;
    case 'emailVerified':
      notificationContent = (
        <p>
          Только пользователи с подтверждённым email могут голосовать и оставлять идеи.
          {' '}
          <Link to="/profile" className={styles.signInLink}>
            Подтвердить
          </Link>
          ?
        </p>
      );
  }

  return (
    <>
      {visibleWarning ? (
        <PushNotification
          className={styles.push}
          type="warning"
        >
          {notificationContent}
        </PushNotification>
      ) : null}
    </>
  );
};

DiscussionWarning.propTypes = {
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  isAuth: PropTypes.bool,
  user: PropTypes.objectOf(shape({})),
  setDisabled: PropTypes.func,
};

DiscussionWarning.defaultProps = {
  isAuth: false,
  user: null,
  setDisabled: () => {},
};

export default DiscussionWarning;
