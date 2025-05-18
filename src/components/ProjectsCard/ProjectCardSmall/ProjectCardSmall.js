import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import styles from './ProjectCardSmall.module.scss';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { swiperExternalLink } from '../../../helpers/swiperExternalLink';

const ProjectCardSmall = ({
  data,
  hiddenInner,
  hidden,
}) => {
  if (!data) return true;
  const classParams = useMemo(() => {
    const setParams = data?.variant === 'big' ? styles.big : styles.small;
    return setParams;
  }, [data]);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const formDescription = useCallback((str) => {
    const newStr = str.slice(0, 48);
    return newStr.length !== str.length ? `${newStr}...` : newStr;
  }, [data?.description]);

  const handleSlideClick = (url) => {
    if (isMobile) {
      swiperExternalLink(url);
    }
  };

  return (
    <>
      {data && (
      <a
        href={!hidden && data.externalLink}
        target="_blank"
        className={classParams || ''}
        rel="noreferrer"
        onClick={() => handleSlideClick(data.externalLink)}
      >
        <div className={`${styles.card} ${data?.fontType?.key === 'WHITE' ? styles.contrast : ''} ${hiddenInner ? styles.hiddenInner : ''}`}>
          {data?.bannerImage && (
          <div className={styles.background__wrapper}>
            <div
              className={styles.background}
              style={{ backgroundImage: `url(${data.bannerImage?.url})` }}
            />
          </div>
          )}
          <p className={styles.header}>
            {data?.subtitle}
          </p>
          <div className={styles.main}>
            <p className={styles.title}>{data?.header}</p>
            {data.description
            && (
            <p className={styles.description}>
              {!isMobile
                ? htmlParser(data.description) : htmlParser(formDescription(data.description))}
            </p>
            )}
          </div>
        </div>
      </a>
      )}
    </>

  );
};

ProjectCardSmall.propTypes = {
  data: PropTypes.shape([]).isRequired,
  hiddenInner: PropTypes.bool.isRequired,
  hidden: PropTypes.bool,
};

ProjectCardSmall.defaultProps = {
  // contrast: false,
  // description: '',
  // background: '',
  hidden: false,
};

export default ProjectCardSmall;
