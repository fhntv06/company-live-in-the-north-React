import React, { useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuLink.module.scss';

const MenuLink = ({
  link,
  children,
  type,
  newWindow,
  ...otherProps
}) => {
  const typeOfProps = useMemo(() => {
    let styleClass;
    switch (type) {
      case 'link':
        styleClass = styles.link;
        break;
      case 'link-big-bold':
        styleClass = styles.link__bigBold;
        break;
      case 'burger-link':
        styleClass = styles.burger__link;
        break;
      case 'menu-link':
        styleClass = styles.menu__link;
        break;
      case 'medium-link':
        styleClass = styles.medium__link;
        break;
      case 'submenu-link':
        styleClass = styles.submenu__link;
        break;
    }
    return styleClass;
  }, [type]);

  return (
    <>
      {newWindow ? (
        <Link
          to={link}
          target="_blank"
          rel="noopener noreferrer"
          className={typeOfProps}
          {...otherProps}
        >
          {children}
        </Link>
      ) : (
        <NavLink to={link} className={typeOfProps} {...otherProps}>
          {children}
        </NavLink>
      )}
    </>
  );
};

MenuLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  newWindow: PropTypes.bool,
};

MenuLink.defaultProps = {
  link: null,
  children: null,
  type: 'link',
  newWindow: false,
};

export default MenuLink;
