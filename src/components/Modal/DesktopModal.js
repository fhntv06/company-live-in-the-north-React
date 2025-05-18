import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import classnames from 'classnames';
import styles from './Modal.module.scss';
import ModalCloseButton from './ModalCloseButton';

const DesktopModal = React.forwardRef(({
  isOpen,
  onClose,
  children,
  gradientBorder,
  className,
  narrow,
  extraNarrow,
  closeButtonClassName,
}, ref) => createPortal((
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.overlay}
          onClick={onClose}
        />
        <motion.div
          ref={ref}
          className={classnames(
            styles.content,
            { [styles.gradientBorder]: gradientBorder },
            { [styles.narrow]: narrow },
            { [styles.extraNarrow]: extraNarrow },
            className,
          )}
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0%)' }}
          exit={{ transform: 'translateY(100%)' }}
        >
          {children}
          <ModalCloseButton
            onClick={onClose}
            showOnDesktop
            className={classnames(styles.closeBtn, closeButtonClassName)}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
), document.body));

DesktopModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  gradientBorder: PropTypes.bool,
  className: PropTypes.string,
  narrow: PropTypes.bool,
  extraNarrow: PropTypes.bool,
  closeButtonClassName: PropTypes.string,
};

DesktopModal.defaultProps = {
  gradientBorder: false,
  className: '',
  narrow: false,
  extraNarrow: false,
  closeButtonClassName: '',
};

export default DesktopModal;
