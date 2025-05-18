import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ModalCloseButton.module.scss';

const ModalCloseButton = ({
  onClick, className, showOnDesktop, white,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={classnames(
      styles.closeButton,
      {
        [styles.showOnDesktop]: showOnDesktop,
        [styles.white]: white,
      },
      className,
    )}
  >
    <Icon name="close" />
  </button>
);

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  showOnDesktop: PropTypes.bool,
  white: PropTypes.bool,
};

ModalCloseButton.defaultProps = {
  className: '',
  showOnDesktop: false,
  white: false,
};

export default ModalCloseButton;
