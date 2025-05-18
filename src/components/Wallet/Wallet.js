import React, {
  useEffect, useMemo, useState, useRef,
} from 'react';
import {
  number, string, oneOfType, bool, func,
} from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Wallet.module.scss';
import { normalizeCost } from '../../helpers/format';

const Wallet = ({
  needPlus,
  balance,
  className,
  clickabel,
  storeGradient,
  label,
  onClick,
  animateOnChange,
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const isFirstRender = useRef(true);
  const prevBalance = useRef(balance);

  useEffect(() => {
    const cleanup = () => { prevBalance.current = balance; };

    if (!animateOnChange || prevBalance.current > balance) {
      setShowAnimation(false);
      return cleanup;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setShowAnimation(true);
    }

    return cleanup;
  }, [balance]);

  const content = useMemo(() => (
    <>
      {label && <div className={classnames(styles.label, 'wallet-label')}>{label}</div>}
      <Icon name="coin" className={styles.svg} />
      <span>{`${needPlus ? '+ ' : ''}${balance && normalizeCost(balance)}`}</span>
    </>
  ), [balance, needPlus]);

  const classes = classnames(styles.wallet, className, {
    [styles.storeGradient]: storeGradient,
    [styles.balanceChangeAnimation]: animateOnChange && showAnimation,
  });

  return clickabel ? (
    <Link to="/" className={classes}>{content}</Link>
  ) : (
    <button
      onClick={onClick}
      onAnimationEnd={() => {
        setShowAnimation(false);
      }}
      type="button"
      className={classes}
    >
      {content}

    </button>
  );
};

Wallet.propTypes = {
  balance: oneOfType([
    number,
    string,
  ]).isRequired,
  needPlus: bool,
  className: string,
  clickabel: bool.isRequired,
  label: string,
  onClick: func,
  storeGradient: bool,
  animateOnChange: bool,
};

Wallet.defaultProps = {
  className: '',
  needPlus: true,
  storeGradient: false,
  label: null,
  onClick: null,
  animateOnChange: false,
};

export default Wallet;
