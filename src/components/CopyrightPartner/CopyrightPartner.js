import React from 'react';
import {
  arrayOf, shape, string,
} from 'prop-types';

import SocialIconsList from '../SocialIconsList/SocialIconsList';

import styles from './CopyrightPartner.module.scss';

const CopyrightPartner = ({ className, partner }) => {
  const links = [
    { name: 'telegram-social', url: partner.tgLink, title: partner.tgLink },
    { name: 'vkontakte-social', url: partner.vkLink, title: partner.vkLink },
    { name: 'odnoklassniki-social', url: partner.okLink, title: partner.okLink },
    { name: 'tik-tok-social', url: partner.ttLink, title: partner.ttLink },
  ];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <p className={styles.text}>
        {partner.id !== 1 && (
          <span>партнер: </span>
        )}
        {partner.name}
      </p>
      {
        links.length > 0 && (
        <SocialIconsList
          className={styles.socialList}
          links={links}
        />
        )
      }
    </div>
  );
};

CopyrightPartner.propTypes = {
  className: string,
  partner: arrayOf(shape({
    name: string,
    links: arrayOf(shape({
      name: string,
      url: string,
      title: string,
    })),
  })).isRequired,
};

CopyrightPartner.defaultProps = {
  className: '',
};

export default CopyrightPartner;
