import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import IdeaForm from '../IdeaForm/IdeaForm';
import styles from './GotAnIdea.module.scss';
import BottomSheet from '../Modal/BottomSheet';

const GotAnIdea = ({
  isOpen, onClose, onSubmit, disabled, id,
}) => {
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const swipeHandler = (e) => {
    touchEndRef.current = e.changedTouches[0].screenY;

    // eslint-disable-next-line no-use-before-define
    closeOnSwipeHandler();
  };

  const closeOnSwipeHandler = () => {
    if (touchStartRef.current + 100 > touchEndRef.current) return;
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} biggerOnKeyboardOpen>
      <IdeaForm
        onClose={onClose}
        className={styles.modalIdeaForm}
        onSubmit={onSubmit}
        disabled={disabled}
        id={id}
      />
      <button
        type="button"
        className={styles.swipeHandleWrapper}
        onTouchStart={(e) => {
          touchStartRef.current = e.changedTouches[0].screenY;
        }}
        onTouchEnd={swipeHandler}
      >
        <div
          className={styles.swipeHandle}
        />
      </button>
    </BottomSheet>
  );
};

GotAnIdea.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.number,
};
GotAnIdea.defaultProps = {
  isOpen: false,
  disabled: true,
  id: null,
};

export default GotAnIdea;
