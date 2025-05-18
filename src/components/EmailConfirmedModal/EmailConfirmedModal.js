import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmailConfirmedModal.module.scss';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';

const EmailConfirmedModal = ({
  isOpen, onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>
          Проверьте почтовый ящик
        </h3>
        <ModalCloseButton onClick={onClose} />
      </div>
      <p className={styles.text}>
        Чтобы обезопасить профиль и подтвердить,
        что Вы являетесь его владельцем, мы направили письмо на электронную почту.
      </p>
    </div>
  </Modal>
);

EmailConfirmedModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

EmailConfirmedModal.defaultProps = {
  isOpen: false,
};

export default EmailConfirmedModal;
