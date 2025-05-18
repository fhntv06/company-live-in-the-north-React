import React, { useMemo } from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import parser from 'html-react-parser';
import DiscussionHeaderInfo from './DiscussionHeaderInfo';
import styles from './DiscussionHeaderContent.module.scss';
import TimeCard from '../../components/TimeCard/TimeCard';
import DiscussionHeaderWallet from './DiscussionHeaderWallet';
import Button from '../../components/Button/Button';
import { GradientViolet } from '../../helpers/gradients';
import useMediaQuery from '../../hooks/useMediaQuery';
import ShareModal from '../../components/ShareModal/ShareModal';
import useModal from '../../hooks/useModal';
import {
  useToggleDiscussionFavoriteMutation,
  useToggleVotingFavoriteMutation,
} from '../../services/profileApi';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import removeTags from '../../helpers/removeTags';
import Seo from '../../components/Seo/Seo';

const linearId = `linear-${Math.random()}`;

const DiscussionHeaderContent = ({
  type,
  item,
  ideas,
  isCozyYamal,
  isAuth,
}) => {
  const [toggleDiscussionFavorite] = useToggleDiscussionFavoriteMutation();
  const [toggleVotingFavorite] = useToggleVotingFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    item.id,
    'activities',
    type === 'discussions' ? toggleDiscussionFavorite : toggleVotingFavorite,
  );

  const isMedium = useMediaQuery('(max-width: 1023px)');
  const isSmall = useMediaQuery('(max-width: 767px)');

  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  // eslint-disable-next-line consistent-return
  const stepText = useMemo(() => {
    switch (type) {
      case 'discussions':
        switch (item.step.value) {
          case 2:
            return isSmall ? 'Старт&nbsp;приёма&nbsp;идей' : 'Старт<br/>приёма идей';
          case 3:
            return isSmall ? 'Ждём ваших идей&nbsp;до' : 'Ждем<br/>ваших идей<br/>до';
          case 4:
            return 'Обсуждение завершено';
        }
        break;
      case 'votings':
        switch (item.step.value) {
          case 2:
            return isSmall ? 'Старт<br />голосования' : 'Старт<br />голосования';
          case 3:
            return isSmall ? 'Идёт голосование&nbsp;до' : 'Идет<br/>голосование<br/>до';
          case 4:
            return 'Голосование завершено';
        }
        break;
      default:
        return 'Идёт отбор<br/>идей до';
    }
  }, [type]);

  const cozyYamalStepText = useMemo(() => {
    if (!isCozyYamal) return null;

    switch (item.step) {
      case 1:
        return 'Идет сбор<br/>предложений<br/>до';
      case 2:
        return 'Презентция<br>проектов';
      case 3:
        return 'Голосование<br/>до';
      case 4:
        return 'Идет<br/>очное голосование<br/>до';
      default:
        return '';
    }
  }, []);

  const renderShareContainer = () => (
    <div className={styles.shareContainer}>
      <Button
        className={styles.shareButton}
        onClick={openShareModalHandler}
        typeButton="button-white"
        iconName="share"
      >
        {isMedium ? '' : 'Поделиться'}
      </Button>
      {isAuth && (
      <Button
        className={styles.bookMarkbutton}
        typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
        iconProps={{ stroke: `url(#${linearId})` }}
        gradient={GradientViolet(linearId, 12.8696, 3.32598, 0.999995, 0.999995)}
        onClick={() => {
          toggleFavoriteHandler(item.id);
        }}
      />
      )}
    </div>
  );

  const renderCozyYamalMarkup = () => (
    <div className={styles.cozyYamalWrapper}>
      <div className={styles.cozyYamalContent}>
        {!isMedium && (
        <TimeCard
          text={cozyYamalStepText}
          fromDate={item.activeEnd}
          size="thin"
          className={styles.timeCardDesktop}
          cozyYamal={isCozyYamal}
        />
        )}
        <div className={styles.mainContent}>
          <DiscussionHeaderInfo
            className={styles.headerInfo}
            type={type}
            item={item}
            ideas={ideas}
            isCozyYamal
          />
          <h1 className={styles.title}>{item.name}</h1>
        </div>
        {!isMedium && (
        <div className={styles.controls}>
          <DiscussionHeaderWallet type={type} />
          { renderShareContainer() }
        </div>
        )}
        {isMedium && (
        <TimeCard
          text={cozyYamalStepText}
          fromDate={item.step.value === 2 ? item.activeStart : item.activeEnd}
          size="thin"
          className={styles.timeCardMobile}
          cozyYamal={isCozyYamal}
        />
        )}
      </div>
      <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
    </div>
  );

  if (isCozyYamal) return (<>{renderCozyYamalMarkup()}</>);

  return (
    <>
      <Seo title={item.name} description={removeTags(item.description)} />
      <div className={classnames(
        styles.wrapper,
        { [styles.resultsWrapper]: type === 'results' },
      )}
      >
        <div className={classnames(
          styles.row,
          styles.firstRow,
        )}
        >
          <DiscussionHeaderInfo type={type} item={item} ideas={ideas} />
        </div>
        <div className={classnames(
          styles.row,
          styles.secondRow,
        )}
        >
          {type !== 'results' && (
          <TimeCard
            text={stepText}
            fromDate={item.step.value === 2 ? item.activeStart : item.activeEnd}
            size="thin"
            className={styles.timeCard}
          />
          )}
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.controls}>
            {!isSmall && (item.step?.value === 3) && (
            <>
              <DiscussionHeaderWallet type={type} />
            </>
            )}
            {!isSmall && renderShareContainer()}
          </div>
        </div>
        {isSmall && (
        <div className={classnames(
          styles.row,
          styles.thirdRow,
        )}
        >
          {type !== 'results' && (
          <div className={styles.dateUntil}>
            <span>
              {parser(stepText)}
                &nbsp;
              {moment(item.step.value === 2 ? item.activeStart : item.activeEnd).format('D MMMM')}
            </span>
          </div>
          )}
          <div className={styles.controls}>
            {renderShareContainer()}
          </div>
        </div>
        )}
        <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
      </div>
    </>
  );
};

DiscussionHeaderContent.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  isCozyYamal: PropTypes.bool,
  ideas: PropTypes.objectOf(shape({})),
  isAuth: PropTypes.bool,
};

DiscussionHeaderContent.defaultProps = {
  isCozyYamal: false,
  ideas: [],
  isAuth: false,
};

export default DiscussionHeaderContent;
