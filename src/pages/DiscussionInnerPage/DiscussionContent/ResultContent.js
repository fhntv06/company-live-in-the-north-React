import React from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import parseHtml from 'html-react-parser';
import { Link } from 'react-router-dom';
import MapContainer from '../../../components/MapContainer/MapContainer';
import ResultImageSlider from '../../../components/ResultImageSlider/ResultImageSlider';
import ResultSplitImages from '../../../components/ResultSplitImages/ResultSplitImages';
import Gallery from '../../../components/Gallery/Gallery';
import ResultCardSlider from '../../../components/ResultCardSlider/ResultCardSlider';
import Icon from '../../../components/Icon/Icon';
import styles from './ResultContent.module.scss';
import useMediaQuery from '../../../hooks/useMediaQuery';

const renderStatusItem = (step, title, isActive, link = null) => {
  const content = (
    <div className={classnames(styles.statusItem, { [styles.active]: isActive })}>
      <span className={styles.statusStep}>{`Этап ${step}`}</span>
      {title}
      {isActive && <span className={styles.resultFlagIcon} />}
      {!isActive && <span className={styles.resultArrowRightIcon} />}
    </div>
  );

  return link ? <Link className={styles.statusLink} to={link}>{content}</Link> : content;
};

const ResultContent = ({ item, cards }) => {
  const isSmall = useMediaQuery('(max-width: 767px)');
  const isMedium = useMediaQuery('(max-width: 1023px)');

  const {
    coords, address, discussionId, votingId, description, imageEnd, imageStart, images, name, id,
  } = item;
  // const [firstImg, secondImg] = imageStart ? item.images : [];

  const filterCards = cards?.filter((card) => card.id !== id);

  const addressMarkup = (
    <div className={styles.address}>
      <Icon name="geo" className={styles.geoIcon} />
      <span className={styles.locationFull}>
        {address}
      </span>
    </div>
  );

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.status}>
          {renderStatusItem(1, 'Обсуждение', false, discussionId ? `/discussions/${discussionId}` : null)}
          {renderStatusItem(2, 'Голосование', false, votingId ? `/votings/${votingId}` : null)}
          {renderStatusItem(3, 'Реализация', true)}

        </div>
        <div className={styles.result}>
          <h4 className={styles.resultTitle}>Решение и результат</h4>
          <div className={styles.resultText}>
            <p>{parseHtml(description)}</p>
          </div>
        </div>
        <div className={styles.images}>
          {isSmall ? (
            images && (imageStart || imageEnd)
            && (
            <ResultImageSlider
              splitImages={[imageStart, imageEnd]}
              images={images}
              className={styles.cardSlider}
            />
            )
          ) : (
            (imageStart || imageEnd)
            && (
            <ResultSplitImages
              firstImg={imageStart && imageStart.url}
              secondImg={imageEnd && imageEnd.url}
              altTitles={[name, name]}
              className={styles.splitImages}
            />
            )

          )}
          <div className={styles.gallery}>
            {images && (
            <Gallery
              items={images}
              maxPreviewItems={4}
            />
            )}
          </div>
        </div>
        {coords && (
          <>
            <div className={styles.location}>
              <h4 className={styles.resultTitle}>Где мы это сделали</h4>
              {!isMedium && address && addressMarkup}
            </div>
            <div className={styles.map}>
              <MapContainer
                mapCoord={coords}
                placemarkCoords={[coords]}
              />
            </div>
          </>
        )}
        {isMedium && address && addressMarkup}
      </div>
      {filterCards && filterCards.length > 0 && (
      <aside className={styles.resultCardsContainer}>
        <h4 className={styles.resultTitle}>Что мы уже реализовали</h4>
        <ResultCardSlider
          cardList={filterCards}
          className={styles.cardSlider}
        />
      </aside>
      )}
    </>
  );
};

ResultContent.propTypes = {
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  cards: PropTypes.objectOf().isRequired,
};

export default ResultContent;
