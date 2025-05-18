/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import Icon from '../Icon/Icon';

const ButtonLink = forwardRef(({
  to,
  isExternal,
  children,
  className,
  ...otherProps
}, ref) => {
  if (isExternal) {
    return (
      <a
        ref={ref}
        href={to}
        target="_blank"
        className={className}
        rel="noreferrer"
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      to={to}
      type="button"
      className={className}
      {...otherProps}
    >
      {children}
    </Link>
  );
});

const Button = forwardRef(({
  children,
  typeButton,
  iconName,
  iconProps,
  className,
  gradient,
  to,
  isExternal,
  ...otherProps
}, ref) => {
  let typeOfProps;
  let icon = iconName ?? null;
  switch (typeButton) {
    case 'button':
      typeOfProps = styles.button;
      break;
    case 'button--violet':
      typeOfProps = styles.button__violet;
      break;
    case 'button-fill':
      typeOfProps = styles.buttonFill;
      break;
    case 'button-fill--small':
      typeOfProps = styles.buttonFill__small;
      break;
    case 'button-white':
      typeOfProps = styles.buttonWhite;
      break;
    case 'button-close':
      typeOfProps = styles.buttonClose;
      icon = 'close';
      break;
    case 'button-close-tag':
      typeOfProps = styles.buttonCloseTag;
      icon = 'close';
      break;
    case 'button-search':
      typeOfProps = styles.buttonSearch;
      icon = 'search';
      break;
    case 'booksmark-btn':
      typeOfProps = styles.buttonBooksmark;
      icon = 'booksmark';
      break;
    case 'booksmark-btn-filled':
      typeOfProps = `${styles.buttonBooksmark} ${styles.filled}`;
      icon = 'booksmark';
      break;
    case 'share-color':
      typeOfProps = styles.button__shareColor;
      break;
    case 'button-gray':
      typeOfProps = styles.buttonGray;
      break;
    case 'button-gray-extra-light':
      typeOfProps = styles.buttonGrayExtraLight;
      break;
    default:
      typeOfProps = '';
  }

  if (to) {
    return (
      <ButtonLink
        to={to}
        ref={ref}
        isExternal={isExternal}
        className={classnames(typeOfProps, className)}
        {...otherProps}
      >
        {icon && (
        <Icon name={icon} className={styles.svg} {...iconProps}>
          {gradient && gradient}
        </Icon>
        )}
        {children && <span>{children}</span>}
      </ButtonLink>
    );
  }

  return (
    <button ref={ref} type="button" className={classnames(typeOfProps, className)} {...otherProps}>
      {icon && (
        <Icon name={icon} className={styles.svg} {...iconProps}>
          {gradient && gradient}
        </Icon>
      )}
      {children && <span>{children}</span>}
    </button>
  );
});

Button.propTypes = {
  typeButton: PropTypes.string,
  children: PropTypes.node,
  iconName: PropTypes.string,
  iconProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
  className: PropTypes.string,
  gradient: PropTypes.node,
  to: PropTypes.string,
  isExternal: PropTypes.bool,
};

Button.defaultProps = {
  typeButton: '',
  children: null,
  iconName: '',
  iconProps: {},
  className: '',
  gradient: null,
  to: null,
  isExternal: false,
};

export default Button;
