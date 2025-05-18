import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import styles from './GiveawayCard.module.scss';

const GiveawayCard = ({ data, className, slideInAnimation }) => {
  const cardContent = (
    <>
      <div
        className={styles.imageWrapper}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <span className={styles.category}>{data.category}</span>
      </div>
      <span className={styles.winnerID}>
        #
        {' '}
        {data.id}
      </span>
    </>
  );

  return (
    <>
      {slideInAnimation ? (
        <motion.div
          className={classnames(
            styles.card,
            className,
          )}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {cardContent}
        </motion.div>
      ) : (
        <div
          className={classnames(
            styles.card,
            className,
          )}
        >
          {cardContent}
        </div>
      )}
    </>
  );
};

GiveawayCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
  slideInAnimation: false,
};

GiveawayCard.defaultProps = {
  className: '',
  slideInAnimation: true,
};

export default GiveawayCard;
