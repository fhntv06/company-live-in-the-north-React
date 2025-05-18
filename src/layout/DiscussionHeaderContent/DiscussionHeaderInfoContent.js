import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes, { shape } from 'prop-types';
import plural from 'plural-ru';
import Icon from '../../components/Icon/Icon';
import styles from './DiscussionHeaderInfo.module.scss';

const DiscussionHeaderInfoContent = ({
  type, item, ideas, municipality,
}) => {
  const [votesAll, setVotesAll] = useState();
  const [likeasAll, setLikeasAll] = useState();

  const {
    voteAnswers,
    status,
    ideasAll,
    ideasPicked,
    createdAt,
    voteAnswerGroups,
  } = item;

  useEffect(() => {
    let votesCount = 0;
    if (voteAnswers && voteAnswers?.length > 0) {
      voteAnswers.forEach((element) => {
        votesCount += element.usersVoteAnswersCount;
      });
      setVotesAll(votesCount);
    }
    if (ideas && ideas.length > 0) {
      const allLikeas = ideas?.reduce((acc, idea) => idea.likesCount + acc, 0);
      setLikeasAll(allLikeas);
    }
    if (voteAnswerGroups && voteAnswerGroups.length > 0) {
      voteAnswerGroups.forEach((group) => {
        // eslint-disable-next-line no-unused-expressions
        group.voteAnswers.length > 0
         && group.voteAnswers.forEach((answers) => {
           votesCount += answers.usersVoteAnswersCount;
         });
      });
      setVotesAll(votesCount);
    }
  }, [ideas, item]);

  const discussionInfo = (
    <>
      {ideas.length > 0 ? (
        <span>
          <p>
            <b>{ideas.length}</b>
            &nbsp;
            идей
          </p>
        </span>
      ) : null}
      {likeasAll ? (
        <span>
          <p>
            <b>
              {likeasAll}
            </b>
            &nbsp;
            { plural(likeasAll, 'лайк', 'лайка', 'лайков') }
          </p>
        </span>
      ) : null}
      {status === 'archive' && (
        <>
          {ideas && (
          <span>
            <p>
              <b>{ideas.length}</b>
              &nbsp;
              идей поступило
            </p>
          </span>
          )}
          <span>
            <p>
              приём идей завершен, идет отбор
            </p>
          </span>
        </>
      )}
    </>
  );

  const votingInfo = (
    <>
      {ideasAll && (
        <span>
          <p>
            <b>{ideasAll}</b>
            &nbsp;
            идей поступило
          </p>
        </span>
      )}
      {ideasPicked && (
        <>
          <span>
            <p>
              <b>{item.ideasPicked}</b>
              &nbsp;
              идей отобрали
            </p>
          </span>
        </>
      )}
      {votesAll && votesAll > 0 ? (
        <>
          <span>
            <p>
              <b>{votesAll}</b>
                &nbsp;
              { plural(votesAll, 'голос', 'голоса', 'голосов') }
            </p>
          </span>
        </>
      ) : null}
    </>
  );

  const resultInfo = (
    <>
      {/* <div className={styles.label}>
          <span>
            уютный ямал
          </span>
        </div> */}
      <div className={styles.resultsInfoWrapper}>
        {municipality && (
          <div className={styles.location}>
            <Icon name="geo" className={styles.svg} />
            <span>
              {municipality}
            </span>
          </div>
        )}
        <span className={styles.separator} />
        <div className={styles.date}>
          <span>
            {moment(createdAt).year()}
            {' '}
            год
          </span>
        </div>
      </div>
    </>
  );
  let renderInfo;
  switch (type) {
    case 'discussions':
      renderInfo = discussionInfo;
      break;
    case 'votings':
      renderInfo = votingInfo;
      break;
    case 'results':
      renderInfo = resultInfo;
      break;
  }

  return (
    <>
      {renderInfo}
    </>
  );
};

DiscussionHeaderInfoContent.propTypes = {
  type: PropTypes.string.isRequired,
  municipality: PropTypes.string,
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  ideas: PropTypes.objectOf((shape({}))),
};

DiscussionHeaderInfoContent.defaultProps = {
  ideas: [],
  municipality: null,
};

export default DiscussionHeaderInfoContent;
