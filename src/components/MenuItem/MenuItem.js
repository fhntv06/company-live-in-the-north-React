import React, { useMemo } from 'react';
import { string, node, bool } from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './MenuItem.module.scss';

const MenuItem = ({
  isOpen,
  children,
  href,
  type,
  dashedUnderline,
  ...otherProps
}) => {
  const innerContent = useMemo(() => (
    <>
      {children}
      <Icon name="dropdown-arrow" className={styles.icon} />
    </>
  ), [children]);

  const wrapper = useMemo(() => {
    const element = type === 'link'
      ? <NavLink to={href} className={`${styles.item} ${styles.link} ${isOpen ? styles.open : ''} ${dashedUnderline ? styles.dashedUnderline : ''}`} {...otherProps}>{children}</NavLink>
      : <button type="button" className={`${styles.item} ${styles.button} ${isOpen ? styles.open : ''}`} {...otherProps}>{innerContent}</button>;
    return element;
  }, [type]);

  return wrapper;
};

MenuItem.propTypes = {
  href: string,
  children: node,
  isOpen: bool,
  type: string,
  dashedUnderline: bool,
};

MenuItem.defaultProps = {
  children: null,
  isOpen: false,
  href: '',
  type: 'link',
  dashedUnderline: false,
};

export default MenuItem;
