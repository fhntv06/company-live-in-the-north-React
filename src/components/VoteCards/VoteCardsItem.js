/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import htmlParser from 'html-react-parser';
import Icon from '../Icon/Icon';
import styles from './VoteCardsItem.module.scss';
import Gallery from '../Gallery/Gallery';
import useMediaQuery from '../../hooks/useMediaQuery';

const VoteCardsItem = ({
  voteItem,
  voted,
  disabled,
  selected,
  onSelect,
  setDisabledVotings,
}) => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const selectCardHandler = async () => {
    if ((!voted && disabled)) return;
    onSelect(voteItem);
  };

  const openCardHandler = (e) => {
    e.stopPropagation();
    setCardIsOpen(!cardIsOpen);
  };

  const classes = classnames(
    styles.wrapper,
    { [styles.open]: cardIsOpen },
    { [styles.selected]: selected },
    { [styles.voted]: voted },
    { [styles.limitExtended]: !voted && disabled },
    { [styles.disabled]: !voted && disabled },
    { [styles.selectAnimation]: selected && !voted },
  );

  useEffect(() => {
    if (voted) {
      setDisabledVotings(true);
    }
  }, [selected, voted]);

  return (
    <>
      <div
        className={classes}
        onClick={selectCardHandler}
      >
        <div className={styles.contentRow}>
          <div className={styles.checkbox}>
            <Icon className={styles.checkIcon} name="check-support" />
          </div>
          <div className={styles.content}>
            <h4 className={styles.voteTitle}>
              {voteItem && voteItem.name && htmlParser(voteItem.name)}
            </h4>
            {(voteItem.hint || voteItem.files.length > 0) && (
              <div className={styles.innerContent}>
                <p className={styles.innerContentText}>
                  {voteItem && voteItem.hint && htmlParser(voteItem.hint)}
                </p>
                {voteItem.files.length > 0 && (
                <div className={styles.gallery}>
                  <Gallery
                    items={voteItem.files}
                    className={styles.galleryItem}
                    maxPreviewItems={4}
                  />
                </div>
                )}
              </div>
            )}
          </div>
          {(voteItem.hint || voteItem.files.length > 0) && !isMobile && (
          <div className={styles.btnMoreWrapper}>
            <button className={styles.btnMore} type="button" onClick={openCardHandler}>
              <span className={classnames(
                styles.btnClosedText,
                { [styles.visible]: !cardIsOpen },
              )}
              >
                Подробнее
              </span>
              <span className={classnames(
                styles.btnOpenedText,
                { [styles.visible]: cardIsOpen },
              )}
              >
                Свернуть
              </span>
              <Icon name="dropdown-arrow" className={styles.arrow} />
            </button>
          </div>
          )}
        </div>
        <div className={styles.voteVolume}>
          <div className={styles.indicator}>
            <div className={styles.line} style={{ width: `${voteItem.widthIndicator ? voteItem.widthIndicator : 0}%` }} />
            <p>{voteItem?.usersVoteAnswersCount}</p>
          </div>
        </div>
        {(voteItem.hint || voteItem.files.length > 0) && isMobile && (
        <div className={styles.btnWrapperMobile}>
          <button className={styles.btnMore} type="button" onClick={openCardHandler}>
            {cardIsOpen ? 'Свернуть' : 'Подробнее'}
            <Icon name="dropdown-arrow" className={styles.arrow} />
          </button>
        </div>
        )}
      </div>
    </>
  );
};

VoteCardsItem.propTypes = {
  voteItem: PropTypes.objectOf(shape({
    check: PropTypes.bool,
    text: PropTypes.objectOf(shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })),
    gallery: PropTypes.arrayOf(PropTypes.objectOf(shape({
      name: PropTypes.string,
      realName: PropTypes.string,
      author: PropTypes.string,
      source: PropTypes.string,
    }))),
    voteID: PropTypes.number,
    voteVolume: PropTypes.number,
    widthIndicator: PropTypes.number,
  })).isRequired,
  voted: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  setDisabledVotings: PropTypes.func,
};

VoteCardsItem.defaultProps = {
  voted: false,
  disabled: false,
  selected: false,
  setDisabledVotings: () => {},
};

export default VoteCardsItem;
