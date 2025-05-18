import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import OfferFirst from '../OfferFirst/OfferFirst';

import styles from './AfishaCompilation.module.scss';

const AfishaCompilation = ({
  events, title, description, className,
}) => {
  const { pathname } = useLocation();

  return (
    <div className={classnames(
      styles.container,
      className,
    )}
    >
      {/* <VisibleWrapper className={styles.mask} /> */}
      <div className={classnames(
        styles.wrapper,
        { [styles.notEmpty]: events?.length > 0 },
      )}
      >
        <div className={classnames(
          styles.titleWrapper,
          { [styles.withoutDescription]: !description },
        )}
        >
          <h2 className={classnames('h1', styles.title)}>{title}</h2>
          <p className={classnames(
            styles.description,
            { [styles.hideDescriptionText]: pathname.includes('compilation') },
          )}
          >
            {description}

          </p>
        </div>
        {events?.slice(0, 5).map((event, index) => (
          <OfferFirst
            key={event.id}
            to={`/afisha/compilation/${event.id}`}
            data={event}
            className={styles.offer}
            type={index === 0 && 'color'}
            size="thin"
          />
        ))}
      </div>
    </div>
  );
};

AfishaCompilation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  events: PropTypes.arrayOf().isRequired,
};

AfishaCompilation.defaultProps = {
  title: 'Рекомендуем',
  className: '',
  description: null,
};

export default AfishaCompilation;
