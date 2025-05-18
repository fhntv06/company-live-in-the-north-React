import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import MapContainer from '../MapContainer/MapContainer';
import styles from './ModalOrderAgree.module.scss';

const ModalOrderAgree = ({
  orderNumber, phone, adress, isOpen, onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.content}>
      <Button typeButton="none" className={styles.close} onClick={onClose}>
        <Icon name="close" />
      </Button>
      <h2 className={styles.header}>
        Заказ №
        {orderNumber}
        {' '}
        оформлен
      </h2>
      <p className={styles.info}>
        Вы сможете забрать ваш заказ в пункте выдачи после его обработки. Обычно это занимает
        от двух до семи рабочих дней. Отслеживать статус заказа вы можете в личном кабинете.
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
            пн–пт с 9 до 18:00, суббота с 9 до 16:00
          </div>
        </div>
        <div className={styles.right}>
          <a href={`tel:${phone}`} className={styles.phone}>
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
      {/* <WhereGetOrder
        info=""
        phone="+7 (234) 123-123-123"
        adress="улица Свердлова, д.48, кабинет 409"
      /> */}
    </div>
  </Modal>
);

ModalOrderAgree.propTypes = {
  orderNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  phone: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
ModalOrderAgree.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default ModalOrderAgree;
