import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from '../MapContainer/MapContainer';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './Questions.module.scss';

const WhereGetOrder = ({
  phone, info, adress, workTime, onClick,
}) => (
  <div className={styles.content}>
    <p className={styles.info}>
      {info && info}
    </p>
    <div className={styles.contacts}>
      <div className={styles.left}>
        <p className={styles.text}>
          Пункт выдачи заказов в Новом Уренгое находится по адресу:
          {' '}
          {adress}
        </p>
        <div className={styles.text}>
          Время работы:
          <br />
          {workTime}
        </div>
      </div>
      <div className={styles.right}>
        <a href="tel:+7234123123123" className={styles.phone}>
          {phone}
        </a>
        <div className={styles.attention}>
          <Icon name="attention" />
          <p className={styles.text}>
            Перед приездом необходимо позвонить
            по указанному номеру. При себе иметь паспорт
            и код, полученный в СМС-подтверждении
          </p>
        </div>
      </div>
    </div>
    <div className={styles.map}>
      <MapContainer />
    </div>
    {onClick && (
      <div className={styles.bottom}>
        <Button typeButton="button">
          пункты выдачи в других муниципалитетах
        </Button>
      </div>
    )}
  </div>
);

WhereGetOrder.propTypes = {
  phone: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  workTime: PropTypes.string,
  info: PropTypes.string,
  onClick: PropTypes.func,
};

WhereGetOrder.defaultProps = {
  onClick: null,
  info: '',
  workTime: 'пн–пт с 9 до 18:00, суббота с 9 до 16:00',
};

export default WhereGetOrder;
