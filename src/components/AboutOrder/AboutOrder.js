import React from 'react';
import PropTypes from 'prop-types';
import plural from 'plural-ru';
import parse from 'html-react-parser';

import Icon from '../Icon/Icon';
import MapContainer from '../MapContainer/MapContainer';

import Qr from '../Profile/Qr/Qr';
import styles from './AboutOrder.module.scss';
import ModalCloseButton from '../Modal/ModalCloseButton';
import { getRawNumber } from '../../helpers/getRawNumber';
import useModal from '../../hooks/useModal';
import QRModal from '../QRModal/QRModal';

const AboutOrder = ({
  className,
  data,
  numberOrders,
  title,
  modal,
  closeModal,
  qr,
}) => {
  const {
    isOpen: isQRModalOpen, openModalHandler: openQRModalHandler,
    closeModalHandler: closeQRModalHandler,
  } = useModal();

  return (
    <div className={className}>
      <h4 className={styles.title}>
        {
          numberOrders
            ? `${plural(numberOrders.length, 'Заказ', 'Заказы')} № ${numberOrders.join(', ')} ${plural(numberOrders.length, 'оформлен', 'оформлены')}`
            : title
        }
        {modal
          && (
            <ModalCloseButton onClick={closeModal} />
          )}
      </h4>
      {
        modal
        && (
          <p className={styles.text}>
            Вы&nbsp;сможете забрать ваш заказ в&nbsp;пункте выдачи после его обработки.
            Обычно это занимает от&nbsp;двух до&nbsp;семи рабочих дней.
            Отслеживать статус заказа вы&nbsp;можете в&nbsp;личном кабинете.
          </p>
        )
      }
      <div className={styles.info}>
        {data.description && (
        <div className={styles.description}>
          <p className={styles.text}>
            {data.description}
          </p>
        </div>
        )}
        <div className={styles.left}>
          <p className={styles.text}>
            Пункт выдачи заказов
            {' '}
            находится по&nbsp;адресу:
            <br />
            {parse(data.address)}
          </p>
          <p>
            Время работы:
            <br />
            {data.workingHours}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.phones}>
            <a className={styles.phone} href={`tel:+${getRawNumber(data.phone)}`}>
              {data.phone}
            </a>
            {data.extraPhone && (
            <a className={styles.phone} href={`tel:+${getRawNumber(data.extraPhone)}`}>
              {data.extraPhone}
            </a>
            )}
          </div>

          {!!data.extraInfo && (
            <div className={styles.warning}>
              <Icon name="warning" className={styles.warningIcon} />
              <p>
                {parse(data.extraInfo)}
              </p>
            </div>
          )}
        </div>
        {
          qr
          && (
            <div className={styles.qrButtonWrapper}>
              <Qr className={styles.qrButton} onClick={openQRModalHandler} />
              <span className={styles.qrText}>Покажите QR-код сотруднику для получения заказа</span>
            </div>
          )
        }
      </div>
      {
        !modal
        && (
          <div className={styles.map}>
            <MapContainer mapCoord={data.coordinate} />
          </div>
        )
      }
      { qr && (
      <QRModal
        isOpen={isQRModalOpen}
        onClose={closeQRModalHandler}
        data={qr}
      />
      )}
    </div>
  );
};

AboutOrder.propTypes = {
  className: PropTypes.string,
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  data: PropTypes.shape(),
  numberOrders: PropTypes.string.isRequired,
  title: PropTypes.string,
  qr: PropTypes.string,
};
AboutOrder.defaultProps = {
  className: '',
  modal: false,
  closeModal: () => {},
  data: {},
  title: '',
  qr: '',
};
export default AboutOrder;
