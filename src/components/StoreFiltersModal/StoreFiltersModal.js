import React from 'react';
import PropTypes from 'prop-types';
import styles from './StoreFiltersModal.module.scss';
import Modal from '../Modal/Modal';
import Range from '../Range/Range';
import ModalCloseButton from '../Modal/ModalCloseButton';

const StoreFiltersModal = ({
  isOpen, onClose, onPriceFilter, userBalance, min, max,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h4 className={styles.title}>Цена в ямалкоинах</h4>
        <ModalCloseButton onClick={onClose} />
      </div>
      <Range
        className={styles.range}
        onClick={onPriceFilter}
        userBall={userBalance}
        closeModal={onClose}
        min={min}
        max={max}
        modalMode
      />
    </div>
  </Modal>
);

StoreFiltersModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onPriceFilter: PropTypes.func.isRequired,
  userBalance: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

StoreFiltersModal.defaultProps = {
  isOpen: false,
};

export default StoreFiltersModal;
