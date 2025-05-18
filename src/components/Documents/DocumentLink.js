import React from 'react';
import { bool, string } from 'prop-types';
import { getFileName, getFormat } from '../../helpers/getFileNameParts';

import styles from './DocumentLink.module.scss';

const DocumentLink = ({ className, href, openInNewTab }) => (
  <a
    download={!openInNewTab}
    href={href}
    target={openInNewTab ? '_blank' : null}
    className={`${styles.link} ${className}`}
    rel="noreferrer"
  >
    <div className={styles.format}>
      {getFormat(href)}
    </div>
    <div className={styles.name}>
      {getFileName(href)}
    </div>
  </a>
);

DocumentLink.propTypes = {
  href: string.isRequired,
  openInNewTab: bool,
  className: string,
};
DocumentLink.defaultProps = {
  className: '',
  openInNewTab: false,
};

export default DocumentLink;
