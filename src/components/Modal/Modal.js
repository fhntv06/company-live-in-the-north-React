import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import BottomSheet from './BottomSheet';
import useMediaQuery from '../../hooks/useMediaQuery';
import DesktopModal from './DesktopModal';

const Modal = ({
  isOpen,
  onClose,
  children,
  gradientBorder,
  narrow,
  extraNarrow,
  biggerOnKeyboardOpen,
  closeButtonClassName,
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const bottomSheetRef = useRef(null);
  const desktopModalRef = useRef(null);

  const options = {
    reserveScrollBarGap: true,
  };

  const scrollLockHandler = (ref) => {
    const storedRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = () => null;
    disableBodyScroll(ref.current, options);
    window.requestAnimationFrame = storedRequestAnimationFrame;
  };

  const scrollUnlockHandler = () => {
    clearAllBodyScrollLocks();
  };

  useEffect(() => {
    if (isOpen) {
      scrollLockHandler(isMobile ? bottomSheetRef : desktopModalRef);
    } else {
      scrollUnlockHandler();
    }
  }, [isOpen, isMobile]);

  return (
    <>
      {isMobile ? (
        <BottomSheet
          ref={bottomSheetRef}
          isOpen={isOpen}
          onClose={onClose}
          gradientBorder={gradientBorder}
          biggerOnKeyboardOpen={biggerOnKeyboardOpen}
        >
          {children}
        </BottomSheet>
      ) : (
        <DesktopModal
          ref={desktopModalRef}
          isOpen={isOpen}
          onClose={onClose}
          gradientBorder={gradientBorder}
          narrow={narrow}
          extraNarrow={extraNarrow}
          closeButtonClassName={closeButtonClassName}
        >
          {children}
        </DesktopModal>
      )}
    </>

  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  gradientBorder: PropTypes.bool,
  narrow: PropTypes.bool,
  extraNarrow: PropTypes.bool,
  biggerOnKeyboardOpen: PropTypes.bool,
  closeButtonClassName: PropTypes.bool,
};

Modal.defaultProps = {
  gradientBorder: false,
  narrow: false,
  extraNarrow: false,
  biggerOnKeyboardOpen: false,
  closeButtonClassName: '',
};

export default Modal;
