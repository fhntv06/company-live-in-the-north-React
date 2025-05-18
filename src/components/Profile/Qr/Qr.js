import React from 'react';
import classnames from 'classnames';
import { func, string } from 'prop-types';
import { GradientLight } from '../../../helpers/gradients';
import styles from './Qr.module.scss';
import useMediaQuery from '../../../hooks/useMediaQuery';

// вынесено отдельной фукцией т.к. url навешивются не на svg, а на path
const SvgBorder = () => (
  <svg viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M91 1H107C115.837 1 123 8.16344 123 17V33" stroke="url(#paint0_linear_2802_53541)" strokeWidth="2" />
    <path d="M1 33L0.999999 17C0.999999 8.16344 8.16344 1 17 0.999999L33 0.999999" stroke="url(#paint1_linear_2802_53541)" strokeWidth="2" />
    <path d="M33 123L17 123C8.16344 123 0.999999 115.837 0.999999 107L0.999997 91" stroke="url(#paint2_linear_2802_53541)" strokeWidth="2" />
    <path d="M123 91L123 107C123 115.837 115.837 123 107 123L91 123" stroke="url(#paint3_linear_2802_53541)" strokeWidth="2" />
    <defs>
      {GradientLight('paint0_linear_2802_53541', -20, 144, -5.00004, -5.00004)}
      {GradientLight('paint1_linear_2802_53541', -26, 156, 1, 0.999988)}
      {GradientLight('paint2_linear_2802_53541', -17, 143, 123, 123)}
      {GradientLight('paint3_linear_2802_53541', -26, 146.5, 123, 123)}
    </defs>
  </svg>
);

const Qr = ({ className, onClick }) => {
  const isMobile = useMediaQuery('(max-width: 757px)');
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={classnames(styles.wrapper, className)}
    >
      <div className={styles.icon}>
        <SvgBorder />
      </div>
      <div className={styles.title}>
        <p className={styles.text}>QR-КОД</p>
      </div>
      <div className={styles.text}>
        {isMobile ? 'для получения заказа' : 'предъявите код при получении заказа в точке выдачи'}
      </div>
    </button>
  );
};

Qr.propTypes = {
  className: string,
  onClick: func,
};

Qr.defaultProps = {
  className: '',
  onClick: null,
};

export default Qr;
