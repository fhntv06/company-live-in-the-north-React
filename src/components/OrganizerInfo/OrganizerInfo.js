import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SocialIconsList from '../SocialIconsList/SocialIconsList';
import styles from './OrganizerInfo.module.scss';

const OrganizerInfo = ({ organizer }) => {
  const links = useMemo(() => ({
    webLinks: [organizer.siteLink, organizer.rtLink].map((link) => {
      if (!link || !link.length) return null;

      return {
        name: link.replace(/^https?:\/\/|\/$/g, ''),
        link,
      };
    }),
    socialLinks: [
      { name: 'telegram-social', url: organizer.tgLink, title: organizer.tgLink },
      { name: 'vkontakte-social', url: organizer.vkLink, title: organizer.vkLink },
      { name: 'odnoklassniki-social', url: organizer.okLink, title: organizer.okLink },
    ],
  }), []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Организатор</p>
      <div className={styles.row}>
        <p className={styles.name}>{organizer.name}</p>
        <div className={styles.contacts}>
          <p className={styles.address}>{organizer.address}</p>
          {organizer.phones.length > 0 && (
            organizer.phones.map((phone) => (
              <a className={styles.link} href={`tel: ${phone.phone}`}>{phone.phone}</a>
            ))
          )}
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.links}>
            {links.webLinks.map((link) => (
              link && (
                <a className={styles.link} href={link.link}>{link.name}</a>
              )
            ))}
          </div>
          <SocialIconsList
            links={links.socialLinks}
            iconClassName={styles.socialIcons}
          />
        </div>
      </div>
    </div>
  );
};

OrganizerInfo.propTypes = {
  organizer: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phones: PropTypes.arrayOf({
      phone: PropTypes.string,
    }),
    vkLink: PropTypes.string,
    okLink: PropTypes.string,
    tgLink: PropTypes.string,
    siteLink: PropTypes.string,
    rtLink: PropTypes.string,
  }).isRequired,
};

export default OrganizerInfo;
