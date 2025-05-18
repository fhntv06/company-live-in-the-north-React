import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import styles from './AfishaInfo.module.scss';
import Icon from '../../Icon/Icon';
import { GradientLight } from '../../../helpers/gradients';

const AfishaInfo = ({ data, openShareModal }) => (
  <>
    <div className={styles.wrapper}>
      <p className={styles.lead}>{data.fullDescriptionLead}</p>
      {data.fullDescriptionMainMedia && (
        data.fullDescriptionMainMedia.aggregateType === 'image' ? (
          <img
            className={styles.image}
            src={data.fullDescriptionMainMedia.url}
            alt={data.fullDescriptionMainMedia.url}
          />
        ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
          <video className={styles.video} controls>
            <source src={data.fullDescriptionMainMedia.url} />
          </video>
        )
      )}
      {parse(data.fullDescription ?? '', {
        trim: true,
      })}
    </div>
    <div className={styles.bottom}>
      <Button
        className={styles.button}
        typeButton="button"
        onClick={openShareModal}
      >
        <Icon name="share" fill="url(#afisha-info-btn)">
          {GradientLight('afisha-info-btn', 23.8307, 2.16406, 1.0835, 1.0835)}
        </Icon>
        поделиться событием
      </Button>
      {data.fullDescriptionSource && (
        <div className={styles.organize}>
          <span>Источник — </span>
          <b>{data.fullDescriptionSource}</b>
        </div>
      )}
    </div>
  </>
);

AfishaInfo.propTypes = {
  data: PropTypes.shape().isRequired,
  openShareModal: PropTypes.func,
};

AfishaInfo.defaultProps = {
  openShareModal: () => {},
};

export default AfishaInfo;
