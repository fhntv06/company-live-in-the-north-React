import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './OldModal.module.scss';

const OldModal = ({
  children, className, isOpen, onClose,
}) => {
  const contentRef = useRef();
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const swipeHandler = (e) => {
    touchEndRef.current = e.changedTouches[0].screenY;

    // eslint-disable-next-line no-use-before-define
    closeOnSwipeHandler();
  };

  const closeOnSwipeHandler = () => {
    if (touchStartRef.current + 30 > touchEndRef.current) return;
    onClose();
  };

  useEffect(() => {
    const handlerClose = (e) => {
      e.stopPropagation();
      if (onClose && e.target.classList.contains(styles.modal)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handlerClose);
    }
    return () => {
      document.removeEventListener('click', handlerClose);
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={contentRef}
      timeout={500}
      classNames="modal-animation"
      unmountOnExit
      onExit={() => document.body.classList.remove('scroll-block')}
      onEnter={() => document.body.classList.add('scroll-block')}
    >
      <div ref={contentRef} className={styles.modal}>
        <div className={`${styles.content} ${className}`}>
          {children}
          <button
            type="button"
            className={styles.swipeHandleWrapper}
            onTouchStart={(e) => {
              touchStartRef.current = e.changedTouches[0].screenY;
            }}
            onTouchEnd={swipeHandler}
          >
            <input
              type="button"
              className={styles.swipeHandle}
            />
          </button>

        </div>
      </div>
    </CSSTransition>, document.body,
  );
};

OldModal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
OldModal.defaultProps = {
  children: null,
  className: '',
  isOpen: false,
  onClose: null,
};

export default OldModal;
