import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './InfoModal.module.scss';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import useMediaQuery from '../../hooks/useMediaQuery';
import Button from '../Button/Button';

const InfoModal = ({
  isOpen, onClose, title, description, onSubmit,
}) => {
  const isLarge = useMediaQuery('(max-width: 1278px)');

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal} narrow>
      <div className={styles.wrapper}>
        <div className={classnames(
          styles.row,
          styles.titleRow,
        )}
        >
          <h4 className={styles.title}>
            {title}
          </h4>
          {isLarge && <ModalCloseButton className={styles.close} onClick={onClose} showOnDesktop />}
        </div>
        {description && (
        <div className={classnames(
          styles.row,
          styles.textRow,
        )}
        >
          <p>{description}</p>
        </div>
        )}
        <div className={classnames(
          styles.row,
          styles.socialRow,
        )}
        >
          <Button
            typeButton="button-fill"
            onClick={onSubmit}
          >
            Да
          </Button>
          <Button
            onClick={onClose}
            type="submit"
            typeButton="button"
          >
            Нет
          </Button>
        </div>
      </div>
    </Modal>
  );
};

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
};

InfoModal.defaultProps = {
  isOpen: false,
  description: '',
  onSubmit: () => {},
};

export default InfoModal;
