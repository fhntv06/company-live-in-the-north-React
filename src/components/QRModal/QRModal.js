import React from 'react';
import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import styles from './QRModal.module.scss';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

const QRModal = ({
  data, isLoading, isOpen, onClose,
}) => {
  const qrCodeValue = data?.qrCode;
  const orderNo = data?.orderNo;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal} extraNarrow>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Ваш QR-код</h3>
          <ModalCloseButton onClick={onClose} />
        </div>
        <p className={styles.description}>
          Предъявите этот код при получении заказа
          в точке выдачи
        </p>
        <div className={styles.qrCodeWrapper}>
          <SpinnerLoader isLoading={isLoading} className={styles.spinner} />
          {!isLoading && qrCodeValue && (
          <motion.div
            key="qr-code"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <QRCodeSVG
              value={qrCodeValue || ''}
              size="205"
            />
          </motion.div>
          )}
        </div>
        {!isLoading && orderNo && (
        <motion.span
          className={styles.orderNumber}
          key="order-no"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          №
          {' '}
          {orderNo}
        </motion.span>
        )}
      </div>
    </Modal>
  );
};

QRModal.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    orderNo: PropTypes.number,
    qrCode: PropTypes.string,
  })),
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

QRModal.defaultProps = {
  data: null,
  isOpen: false,
};

export default QRModal;
