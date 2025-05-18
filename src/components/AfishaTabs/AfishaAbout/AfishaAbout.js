import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import classnames from 'classnames';
import styles from './AfishaAbout.module.scss';
import AfishaSchedule from '../AfishaShedule/AfishaSсhedule';
import Gallery from '../../Gallery/Gallery';
import Spoiler from '../../Spoiler/Spoiler';

const AfishaAbout = ({
  data,
  sheduleScroll,
  sheduleRef,
}) => {
  const {
    smallDescription,
    description,
    content,
    images,
    afishaPlaces,
    organizer,
  } = data;
  return (
    <>
      <h2 className={styles.title}>
        {smallDescription}
      </h2>
      <Spoiler className={styles.description}>
        <p className={styles.text}>
          {(description || content) && parser(description ?? content)}
        </p>
      </Spoiler>
      {images && images.length > 0 && (
      <div className={classnames(
        styles.images,
        'afisha-about__images',
      )}
      >
        <Gallery items={images} className={styles.galleryItem} />
      </div>
      )}
      {afishaPlaces && afishaPlaces.length > 0 && (
      <AfishaSchedule
        schedule={afishaPlaces}
        className={styles.shedule}
        scrollRef={sheduleScroll}
        organizer={organizer}
        ref={sheduleRef}
        dateEnd={data?.dateEnd}
        dateStart={data?.dateStart}
      />
      )}
    </>
  );
};

AfishaAbout.propTypes = {
  data: PropTypes.shape().isRequired,
  sheduleScroll: PropTypes.shape({ current: PropTypes.bool }).isRequired,
  sheduleRef: PropTypes.shape({ current: null }).isRequired,
};

export default AfishaAbout;
