import React from 'react';
import { string, shape } from 'prop-types';

import Avatar from '../../Avatar/Avatar';
import Icon from '../../Icon/Icon';
import SocialIconsList from '../../SocialIconsList/SocialIconsList';
import styles from './ExpertSupport.module.scss';

const ExpertSupport = ({ user, className }) => {
  const {
    firstName,
    surname,
    avatar,
    socialLinks,
    roleDescription: post,
  } = user;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Avatar
            name={firstName}
            surname={surname}
            avatar={avatar}
            className={styles.avatar}
          />
        </div>
        <div className={styles.expertInfo}>
          <div className={styles.name}>
            {`${firstName} ${surname}`}
            <Icon name="expert-check" className={styles.icon} />
          </div>
          <div className={styles.post}>{post}</div>
          {socialLinks?.length && (
          <div className={styles.social}><SocialIconsList links={socialLinks} contrast /></div>
          )}
        </div>
      </div>
    </div>
  );
};

ExpertSupport.propTypes = {
  user: shape().isRequired,
  className: string,
};

ExpertSupport.defaultProps = {
  className: '',
};
export default ExpertSupport;
