import React, { useState, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import parser from 'html-react-parser';
import DocumentLink from '../../../components/Documents/DocumentLink';
import VoteCards from '../../../components/VoteCards/VoteCards';
import Gallery from '../../../components/Gallery/Gallery';
import styles from './VotingContent.module.scss';
import DiscussionWarning from './DiscussionWarning';

const VotingContent = ({
  item,
  isCozyYamal,
  isAuth,
  user,
}) => {
  const [votesItem, setVotesItem] = useState();

  useEffect(() => {
    setVotesItem(item);
  }, [item]);

  // const {
  //   description,
  //   step,
  //   images,
  //   files,
  //   voteAnswers,
  //   voteAnswerGroups,
  //   maxVotes,
  // } = item;

  const [disabled, setDisabled] = useState(!isAuth);

  useEffect(() => {
    if (!isAuth) {
      setDisabled(!isAuth);
    }
  }, [isAuth]);

  return (
    <div className={classnames(
      styles.mainContainer,
      {
        [styles.isCozyYamal]: isCozyYamal,
        [styles.noDocuments]: !item.documents && !isCozyYamal,
        [styles.noImagesWithDocuments]: !item.images?.length && item.files?.length,
      },
    )}
    >
      <div className={styles.textBlock}>
        <h3>
          {!isCozyYamal && votesItem?.description
         && parser(votesItem?.description)}
          {isCozyYamal && votesItem?.step.value === 3
          && (
          <>
            <p className={styles.titleBigger}>Отдайте голос за один из проектов</p>
            <span>Выбирайте лучший проект из сформированного независимыми экспертами топ-10</span>
          </>
          )}
          {isCozyYamal && votesItem?.step.value === 4 && 'Вы можете проголосовать за победителей онлайн-голосования на вашем избирательном участке'}
        </h3>
      </div>
      {(votesItem && votesItem?.images.length)
        ? (
          <div className={styles.gallery}>
            <Gallery
              items={votesItem && votesItem.images && votesItem.images}
              className={styles.galleryItem}
              maxPreviewItems={4}
            />
          </div>
        ) : null}
      {(votesItem && votesItem.files && votesItem.files.length)
        ? (
          <div className={styles.documents}>
            {votesItem.files.map((link) => <DocumentLink href={link.media.url} />)}
          </div>
        ) : null}
      <DiscussionWarning isAuth={isAuth} user={user} item={item} setDisabled={setDisabled} />
      {votesItem && votesItem.voteAnswers && votesItem.voteAnswers.length > 0 && (
      <VoteCards
        votes={votesItem.voteAnswers}
        maxVotes={votesItem.maxVotes}
        step={votesItem.step}
        disabled={(!isCozyYamal
          && (votesItem.step.value === 4
            || votesItem.step.value === 2)) || disabled}
      />
      )}
      {votesItem && votesItem.voteAnswerGroups && votesItem.voteAnswerGroups.map((element) => (
        <div className={styles.wrapperGroup}>
          <div className={styles.textBlock}>
            <h2>
              {element.name}
            </h2>
          </div>
          <>
            {element && element.voteAnswers && (
              <VoteCards
                votes={element.voteAnswers}
                maxVotes={votesItem.maxVotes}
                step={votesItem.step}
                disabled={(!isCozyYamal
                  && (votesItem.step.value === 4
                    || votesItem.step.value === 2)) || disabled}
              />
            )}
          </>
        </div>
      ))}
    </div>
  );
};
VotingContent.propTypes = {
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  isCozyYamal: PropTypes.bool,
  isAuth: PropTypes.bool,
  user: PropTypes.objectOf(shape({})),
};

VotingContent.defaultProps = {
  isCozyYamal: false,
  isAuth: false,
  user: null,
};

export default VotingContent;
