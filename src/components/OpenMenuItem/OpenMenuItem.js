import React from 'react';
import PropTypes from 'prop-types';
import MenuLink from '../MenuLink/MenuLink';
import Icon from '../Icon/Icon';
import styles from './OpenMenuItem.module.scss';

const OpenMenuItem = ({ item, onClick }) => (
  <div className={styles.wrapper}>
    <div className={styles.link}>
      <span>
        {item.text}
        <Icon name="dropdown-arrow" className={styles.icon} />
      </span>
    </div>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pointer} />
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.title}>
              {item.text}
            </div>
          </div>
          <div className={styles.right}>
            {item.subitems.map(({
              sublink, subtype, subtext, operationType, newWindow,
            }, index) => (
              operationType && operationType === 'button' ? <button className={styles.submenuButton} type="button" onClick={onClick}>{subtext}</button>
                : (
                  <MenuLink
                    key={sublink + index}
                    newWindow={newWindow}
                    link={sublink}
                    type={subtype}
                  >
                    {subtext}
                  </MenuLink>
                )
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

OpenMenuItem.propTypes = {
  item: PropTypes.shape([]).isRequired,
  onClick: PropTypes.func,
};

OpenMenuItem.defaultProps = {
  onClick: () => {},
};

export default OpenMenuItem;
