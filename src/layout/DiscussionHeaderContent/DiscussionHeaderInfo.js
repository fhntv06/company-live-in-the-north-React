import React from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import useGetLocation from '../../hooks/useGetLocation';
import styles from './DiscussionHeaderInfo.module.scss';
import TagMark from '../../components/Tags/Tag';
import DiscussionHeaderWallet from './DiscussionHeaderWallet';
import DiscussionHeaderInfoContent from './DiscussionHeaderInfoContent';

const DiscussionHeaderInfo = ({
  type, item, ideas, isCozyYamal, className,
}) => {
  const municipality = item && item.municipalityId && useGetLocation(item.municipalityId);
  return (
    <div className={classnames(
      styles.wrapper,
      className,
    )}
    >
      { type !== 'results' && !isCozyYamal && (
      <div className={styles.firstRowWrapper}>
        <div className={styles.tags}>
          {item.category && (
          <TagMark
            className={styles.tagMark}
            type="mark"
          >
            {item.category}
          </TagMark>
          )}
          {item.city && item.city.length > 0 && item.city.length < 6 && item.city.map((city) => (
            <TagMark
              className={styles.tagMark}
              type="mark"
            >
              {city.name}
            </TagMark>
          ))}
        </div>
        { (type === 'discussions' || type === 'votings') && !isCozyYamal && <DiscussionHeaderWallet className={styles.walletWrapper} type={type} />}
      </div>
      )}
      <div className={classnames(
        styles.infoWrapper,
        { [styles.resultsInfoWrapper]: type === 'results' },
      )}
      >
        {type && item && ideas
      && (
      <DiscussionHeaderInfoContent
        type={type}
        item={item}
        ideas={ideas}
        municipality={municipality}
      />
      )}
      </div>
    </div>
  );
};

DiscussionHeaderInfo.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  isCozyYamal: PropTypes.bool,
  className: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  ideas: PropTypes.objectOf((shape({}))),
};

DiscussionHeaderInfo.defaultProps = {
  isCozyYamal: false,
  className: '',
  ideas: [],
};

export default DiscussionHeaderInfo;
