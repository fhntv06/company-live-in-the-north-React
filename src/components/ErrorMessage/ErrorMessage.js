import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { GradientLight } from '../../helpers/gradients';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ message }) => (
  <div className={styles.wrapper}>
    <Icon name="warning-icon" className={styles.icon} fill="url(#warning-gradient)" stroke="url(#warning-gradient)">
      {GradientLight('warning-gradient', 24.277, 0, 0.277, 0)}
    </Icon>
    <p className={styles.text}>{message}</p>
  </div>

);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
