import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './BonusCard.module.scss';

const BonusCard = ({
  typeTitle,
  title,
  description,
  link,
  className,
  ...otherProps
}) => (
  <Link to={link} className={classnames(styles.bonuses, className)} {...otherProps}>
    <Icon name="shape" className={styles.icon} />
    <div className={styles.header}>
      {typeTitle}
    </div>
    <div className={styles.main}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  </Link>
);

BonusCard.propTypes = {
  typeTitle: string.isRequired,
  title: string.isRequired,
  description: string,
  className: string,
  link: string,
};

BonusCard.defaultProps = {
  description: '',
  className: '',
  link: '/',
};

export default BonusCard;
