import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './TickerPrice.module.scss';

const TickerPrice = ({
  price,
  href,
  backgroundColor,
  className,
  small,
  freeText,
  ...otherProps
}) => {
  const backgroundClass = useMemo(() => {
    let styleBackground;
    switch (backgroundColor) {
      case 'violet':
        styleBackground = styles.violet;
        break;
      case 'bluemarin':
        styleBackground = styles.bluemarin;
        break;
      case 'blue':
        styleBackground = styles.blue;
        break;
      case 'pink':
        styleBackground = styles.pink;
        break;
      case 'orange':
        styleBackground = styles.orange;
        break;
    }
    return styleBackground;
  }, [backgroundColor]);

  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className={classnames(
        styles.container,
        backgroundClass,
        className,
        { [styles.small]: small },
      )}
      {...otherProps}
    >
      {!small && (
        <div className={classnames(styles.icons, 'ticker__price-icons')}>
          <Icon name="ticker" className={styles.svg} />
          <Icon name="ticker" className={styles.svg} />
        </div>
      )}
      {price ? (
        <span>
          от
          {' '}
          <strong>
            {price}
            {' '}
            &#8381;
          </strong>
        </span>
      ) : (
        <span className={styles.withoutPrice}>
          {freeText}
        </span>
      )}
    </a>
  );
};

TickerPrice.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  small: PropTypes.bool,
  href: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  freeText: PropTypes.string,
};

TickerPrice.defaultProps = {
  price: null,
  small: false,
  backgroundColor: null,
  className: '',
  freeText: 'Купить билеты',
};

export default TickerPrice;
