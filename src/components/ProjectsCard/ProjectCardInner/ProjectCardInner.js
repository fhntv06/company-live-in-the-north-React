import React from 'react';
import { bool, string } from 'prop-types';
import htmlParser from 'html-react-parser';
import { swiperExternalLink } from '../../../helpers/swiperExternalLink';
import useMediaQuery from '../../../hooks/useMediaQuery';
import styles from './ProjectCardInner.module.scss';

const ProjectCardInner = ({
  header,
  title,
  description,
  fontType,
  background,
  link,
  hiddenInner,
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const content = (
    <>
      {background && (
      <div className={styles.background} style={{ backgroundImage: `url(${background})` }} />
      )}
      <div className={styles.header}>
        {header}
      </div>
      <div className={styles.main}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{htmlParser(description)}</p>}
      </div>
    </>
  );

  const handleSlideClick = (url) => {
    if (isMobile) {
      swiperExternalLink(url);
    }
  };

  return (
    <>
      {link ? (
        <a
          href={link}
          target="_blank"
          className={`${styles.wrapper} ${fontType === 'WHITE' ? styles.contrast : ''} ${hiddenInner ? styles.hiddenInner : ''}`}
          rel="noreferrer"
          onClick={() => handleSlideClick(link)}
        >
          {content}
        </a>
      )
        : <div className={`${styles.wrapper} ${fontType === 'WHITE' ? styles.contrast : ''} ${hiddenInner ? styles.hiddenInner : ''}`}>{content}</div>}
    </>
  );
};

ProjectCardInner.propTypes = {
  header: string.isRequired,
  title: string.isRequired,
  fontType: string,
  description: string.isRequired,
  background: string.isRequired,
  link: string,
  hiddenInner: bool,
};

ProjectCardInner.defaultProps = {
  hiddenInner: false,
  fontType: 'BLACK',
  link: null,
};

export default ProjectCardInner;
