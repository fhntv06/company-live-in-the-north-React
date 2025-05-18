import React from 'react';
import { bool, number, string } from 'prop-types';
import Wallet from '../Wallet/Wallet';
import { swiperExternalLink } from '../../helpers/swiperExternalLink';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './SpecialCard.module.scss';

const SpecialCard = ({
  children,
  icon,
  balance,
  addShapes,
  link,
  ...otherProps
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  let specialIcon = null;

  switch (icon) {
    case 'telegram_special':
      specialIcon = (
        <svg id="telegram_special" className={styles.icon} width="80" height="66" viewBox="0 0 80 66" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paint0_linear_1276_5529" x1="50" y1="15.5" x2="75" y2="49.5" gradientUnits="userSpaceOnUse">
              <stop offset="0.089314" stopColor="white" />
              <stop offset="0.187175" stopColor="#A4C5FF" />
              <stop offset="0.241422" stopColor="#92B5F4" />
              <stop offset="0.681421" stopColor="#ABC9FF" />
              <stop offset="1" stopColor="#C6DAFF" />
            </linearGradient>
          </defs>
          <path d="M5.49958 28.0757C26.9744 18.872 41.2943 12.8044 48.4593 9.87278C68.9168 1.50253 73.1677 0.0485239 75.9383 0.000511914C76.5477 -0.0100478 77.9103 0.138514 78.7928 0.843001C79.5381 1.43786 79.7431 2.24142 79.8413 2.80541C79.9394 3.3694 80.0616 4.65418 79.9644 5.65807C78.8558 17.1163 74.0589 44.9224 71.6186 57.7558C70.5859 63.1861 68.5527 65.0069 66.5843 65.1851C62.3064 65.5723 59.058 62.4041 54.9147 59.7324C48.4312 55.5517 44.7685 52.9492 38.4751 48.8696C31.2021 44.1549 35.9169 41.5636 40.0618 37.3288C41.1465 36.2205 59.9949 19.356 60.3597 17.8261C60.4053 17.6348 60.4476 16.9216 60.0169 16.545C59.5862 16.1684 58.9505 16.2972 58.4917 16.3996C57.8414 16.5448 47.484 23.279 27.4195 36.6023C24.4795 38.5882 21.8167 39.5558 19.4308 39.5051C16.8006 39.4492 11.7411 38.0422 7.97991 36.8395C3.36664 35.3643 -0.299892 34.5844 0.0193807 32.0792C0.185678 30.7743 2.01241 29.4398 5.49958 28.0757Z" fill="url(#paint0_linear_1276_5529)" />
        </svg>
      );
      break;
  }

  const content = (
    <div className={`${styles.card} ${addShapes ? styles.card__shapes : ''}`}>
      <div className={styles.card__header}>
        {balance && <Wallet balance={balance} className={styles.wallet} />}
      </div>
      <div className={styles.card__main}>
        {children}
        {icon && <div className={styles.wrapper_icon}>{specialIcon}</div>}
      </div>
    </div>
  );

  const handleSlideClick = (url) => {
    if (isMobile) {
      swiperExternalLink(url);
    }
  };

  return (
    <>
      {
        link ? (
          <a onClick={() => handleSlideClick(link)} href={link} target="_blank" rel="noreferrer" className={styles.wrapper} {...otherProps}>
            {content}
          </a>
        ) : (
          <div className={styles.wrapper} {...otherProps}>
            {content}
          </div>
        )
      }
    </>
  );
};

SpecialCard.propTypes = {
  children: string.isRequired,
  balance: number.isRequired,
  icon: string,
  addShapes: bool,
  link: string,
};

SpecialCard.defaultProps = {
  icon: '',
  addShapes: false,
  link: null,
};

export default SpecialCard;
