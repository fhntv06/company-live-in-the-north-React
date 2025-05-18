import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Sheet from 'react-modal-sheet';
import classnames from 'classnames';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';
import styles from './Modal.module.scss';

const BottomSheet = React.forwardRef(({
  isOpen, onClose, children, biggerOnKeyboardOpen, gradientBorder,
}, ref) => {
  const isIOS = useMemo(() => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, []);
  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      detent={isIOS && biggerOnKeyboardOpen && isKeyboardOpen ? 'full-height' : 'content-height'}
    >
      <Sheet.Container className={classnames(
        { 'react-modal-sheet-gradient-border': gradientBorder },
      )}
      >
        <div className={styles.headerWrapper}>
          <Sheet.Header />
        </div>
        <Sheet.Content
          disableDrag
        >
          <Sheet.Scroller
            disableDrag
            ref={ref}
          >
            {children}
          </Sheet.Scroller>

        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onClick={onClose} />
    </Sheet>
  );
});

BottomSheet.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  gradientBorder: PropTypes.bool,
  biggerOnKeyboardOpen: PropTypes.bool,
};

BottomSheet.defaultProps = {
  gradientBorder: false,
  biggerOnKeyboardOpen: false,
};

export default BottomSheet;
