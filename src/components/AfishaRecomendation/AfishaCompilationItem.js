import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import EventCardSmall from '../Event/EventCardSmall/EventCardSmall';
import styles from './AfishaCompilationItem.module.scss';
import EventCard from '../Event/EventCard/EventCard';
import useMediaQuery from '../../hooks/useMediaQuery';

const AfishaCompilationItem = ({ item, number }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={styles.wrapper}>
      {!isMobile && <span className={styles.number}>{String(number).padStart(2, '0')}</span>}
      <div className={styles.card}>
        {isMobile && <span className={styles.number}>{String(number).padStart(2, '0')}</span>}
        <div className={styles.cardInfo}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.description}>{item.description}</p>
          {item.adress && <p className={styles.address}>{item.address}</p>}
        </div>
        <div className={
          classnames(styles.cardEvents, { [styles.moreThanOneEvent]: item.afishaEvents.length > 1 })
          }
        >
          {item.afishaEvents && item.afishaEvents.length > 0 && (
            item.afishaEvents.length > 1 ? (
              item.afishaEvents.map((event) => (
                <EventCardSmall
                  data={event}
                  className={styles.eventCard}
                />
              ))
            ) : (
              !item.afishaEvents[0].mainImagePreview && !item.afishaEvents[0].mainImage ? (
                <EventCardSmall
                  data={item.afishaEvents[0]}
                  typeEvent={item.afishaEvents[0].type ?? null}
                  className={styles.eventCard}
                />
              ) : (
                <EventCard
                  data={item.afishaEvents[0]}
                  className={classnames(styles.eventCard, styles.eventBigCard)}
                />
              )
            ))}
        </div>
      </div>
    </div>
  );
};

AfishaCompilationItem.propTypes = {
  item: PropTypes.shape().isRequired,
  number: PropTypes.number.isRequired,
};

export default AfishaCompilationItem;
