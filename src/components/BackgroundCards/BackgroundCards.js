import React from 'react';
import { string } from 'prop-types';
import styles from './BackgroundCards.module.scss';

const BackgroundCards = ({ className, position }) => (
  <div
    className={`${styles.background}
    ${className}
    ${position === 'right' ? styles.right : styles.left}`}
  />
);

BackgroundCards.propTypes = {
  className: string,
  position: string,
};

BackgroundCards.defaultProps = {
  position: 'left',
  className: '',
};

export default BackgroundCards;
