import React from 'react';
import classnames from 'classnames';
import {
  string,
  arrayOf,
  bool,
  shape,
  objectOf,
  oneOfType,
  number,
} from 'prop-types';

import Icon from '../Icon/Icon';

import styles from './SocialIconsList.module.scss';

const SocialIconsList = ({
  className,
  links,
  linkProps,
  iconProps,
  iconClassName,
  contrast,
}) => (
  <div className={classnames(styles.socialList, className)}>
    {links.map(({ name, url, title }) => name && url && (
      <a
        key={name}
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        className={classnames(styles.linkIcon, { [styles.linkContrast]: contrast })}
        title={title}
        {...linkProps}
      >
        <Icon name={name?.includes('-social') ? name : `${name}-social`} className={classnames(styles.svg, iconClassName)} {...iconProps} />
      </a>
    ))}
  </div>
);

SocialIconsList.propTypes = {
  className: string,
  links: arrayOf(shape({
    name: string,
    url: string,
    title: string,
  })),
  linkProps: objectOf(oneOfType([
    number,
    string,
  ])),
  iconProps: objectOf(oneOfType([
    number,
    string,
  ])),
  contrast: bool,
  iconClassName: string,
};

SocialIconsList.defaultProps = {
  className: '',
  iconClassName: '',
  links: [
    {
      name: 'vkontakte-social',
      url: 'https://vk.com/zhivemnasevere',
      title: 'ВКонтакте',
    },
    {
      name: 'telegram-social',
      url: 'https://t.me/zhivem_na_severe',
      title: 'Telegram',
    },
    {
      name: 'odnoklassniki-social',
      url: 'https://ok.ru/group/53447323877518',
      title: 'Одноклассники',
    },
    {
      name: 'tik-tok-social',
      url: 'https://www.tiktok.com/@zhivem_na_severe',
      title: 'Tik-Tok',
    },
  ],
  linkProps: {},
  iconProps: {},
  contrast: false,
};

export default SocialIconsList;
