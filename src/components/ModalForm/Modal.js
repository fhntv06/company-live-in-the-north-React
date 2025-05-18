import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

import styles from './Modal.module.scss';

const Modal = ({
  isOpen,
  onClose,
  children,
  colorful,
  scrollDisabled,
}) => {
  const ref = useRef();
  const contentRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (scrollDisabled) {
      if (isOpen) {
        document.body.style.top = `-${window.scrollY}px`;
        disableBodyScroll(ref.current, {
          reserveScrollBarGap: true,
          allowTouchMove: (element) => {
            let el = element;
            while (el && el !== document.body) {
              if (el === contentRef.current) {
                return true;
              }
              el = el.parentElement;
            }
            return false;
          },
        });
      } else {
        enableBodyScroll(ref.current);
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
      return () => {
        enableBodyScroll(ref.current);
      };
    }
  }, [isOpen]);

  return (
    <ReactModal
      ref={ref}
      className={styles.modal}
      overlayClassName="step-form--overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div ref={contentRef} className={`step-form__wrapper ${colorful}`}>
        {children}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  // fullScreen: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  colorful: PropTypes.string,
  scrollDisabled: PropTypes.bool,
};

Modal.defaultProps = {
  colorful: '',
  // fullScreen: false,
  scrollDisabled: true,
};

export default Modal;
