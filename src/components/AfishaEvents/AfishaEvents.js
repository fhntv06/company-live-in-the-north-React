import React from 'react';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './AfishaEvents.module.scss';
import EventCardSmall from '../Event/EventCardSmall/EventCardSmall';

const AfishaEvents = ({
  events,
  className,
  inGridContainer,
}) => (
  <div
    className={classnames(
      styles.wrapper,
      className,
      { [styles.inGridContainer]: inGridContainer },
    )}
  >
    <AnimatePresence>
      <motion.div
        key="content"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.animateWrapper}
      >
        <div
          className={styles.events}
        >
          {events.length > 0 && (
            events.map((event, index) => (
              <motion.div
                className="event__card"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <EventCardSmall
                  data={event}
                  type={!event.mainImage && index % 2 !== 0 && 'gradient'}
                  typeEvent={event.type}
                />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);

AfishaEvents.propTypes = {
  events: PropTypes.arrayOf().isRequired,
  className: PropTypes.string,
  inGridContainer: PropTypes.bool,
};

AfishaEvents.defaultProps = {
  className: '',
  inGridContainer: false,
};

export default AfishaEvents;
