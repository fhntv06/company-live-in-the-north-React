import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './TabButton.module.scss';

const TabButton = ({
  to,
  name,
  smallName,
  children,
  onClick,
  isActive,
  className,
}) => {
  if (to) {
    return (
      <NavLink
        to={to}
        className={classnames(
          styles.tab,
          {
            [styles.active]: isActive,
          },
          className,
        )}
        data-name={name}
        data-small-name={smallName}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      className={classnames(
        styles.tab,
        {
          [styles.active]: isActive,
          // eslint-disable-next-line quote-props
          'active-tab-button': isActive,
        },
        className,
      )}
      data-name={name}
      data-small-name={smallName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

TabButton.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  smallName: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

TabButton.defaultProps = {
  to: '',
  name: '',
  smallName: '',
  children: null,
  onClick: null,
  className: '',
  isActive: false,
};

export default TabButton;
