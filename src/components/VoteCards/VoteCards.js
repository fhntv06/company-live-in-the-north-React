import React, { useState, useEffect } from 'react';
import PropTypes, { objectOf, shape } from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './VoteCards.module.scss';
import VoteCardsItem from './VoteCardsItem';
import VoteModal from '../VoteModal/VoteModal';
import { useSetVotedMutation, useDeleteVoteMutation } from '../../services/votesApi';
import { getUser } from '../../features/Auth/authSlice';
import { useLazyGetUserQuery } from '../../services/authApi';

const VoteCards = ({ votes, step, disabled }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voteItems, setVoteItems] = useState([]);
  const [setVoted, { isLoading: isSetVotedLoading }] = useSetVotedMutation();
  const [deleteVote, { isLoading: isDeleteVoteLoading }] = useDeleteVoteMutation();
  const [disabledVotings, setDisabledVotings] = useState();
  const user = useSelector(getUser);
  const [getUserTrigger] = useLazyGetUserQuery();

  useEffect(() => {
    const transformedVotes = votes.map((vote) => {
      const {
        id,
        name,
        hint,
        files,
        currentUserVote,
        usersVoteAnswersCount,
      } = vote;
      return {
        id,
        name,
        hint,
        files,
        currentUserVote,
        usersVoteAnswersCount,
      };
    });
    setVoteItems(transformedVotes);
  }, [votes]);

  // eslint-disable-next-line no-shadow
  const calculateWidthIndicator = (voteItems, usersVoteAnswersCount) => {
    const sortedVotes = [...voteItems].sort(
      (a, b) => b.usersVoteAnswersCount - a.usersVoteAnswersCount,
    );
    const { usersVoteAnswersCount: maxVoteCount } = sortedVotes[0];
    return (usersVoteAnswersCount / maxVoteCount) * 100;
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);

    if (isModalOpen) {
      setSelectedVote(null);
    }
  };

  useEffect(() => {
    const haveCurrentUserVoted = votes.some((vote) => vote.currentUserVote);
    setDisabledVotings(haveCurrentUserVoted);
  }, [votes]);

  const handleVote = async () => {
    try {
      const voteAnswerId = selectedVote.id;
      const userId = user.id;
      if (selectedVote && selectedVote.currentUserVote) {
        const response = await deleteVote(selectedVote.currentUserVote).unwrap();
        if (response.success) {
          const updatedVotes = voteItems.map((vote) => {
            if (vote.id === selectedVote.id) {
              return {
                ...vote,
                currentUserVote: false,
                usersVoteAnswersCount: vote.usersVoteAnswersCount - 1,
              };
            }
            return vote;
          });
          setVoteItems(updatedVotes);
          setDisabledVotings(false);
          getUserTrigger();
        }
      } else {
        const response = await setVoted({ userId, voteAnswerId }).unwrap();
        if (response.success) {
          const updatedVotes = voteItems.map((vote) => {
            if (vote.id === selectedVote.id) {
              return {
                ...vote,
                currentUserVote: response.data.id,
                usersVoteAnswersCount: vote.usersVoteAnswersCount + 1,
              };
            }
            return vote;
          });
          setVoteItems(updatedVotes);
          setDisabledVotings(true);
          getUserTrigger();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const voteHandler = () => {
    if (step.value !== 2 && step.value !== 4) {
      closeModal();
      handleVote();
    }
  };

  const handleSelectVote = (vote) => {
    if (step.value !== 2 && step.value !== 4) {
      setSelectedVote(vote);
      closeModal();
    }
  };

  return (
    <div className={styles.wrapper}>
      {voteItems.map((vote) => (
        <VoteCardsItem
          key={vote.id}
          voteItem={{
            ...vote,
            widthIndicator: calculateWidthIndicator(voteItems, vote.usersVoteAnswersCount),
          }}
          step={step}
          voted={vote.currentUserVote}
          selected={selectedVote && selectedVote.id}
          disabled={disabled
            || step.value === 2
            || step.value === 4
            || isSetVotedLoading
            || isDeleteVoteLoading || disabledVotings}
          onSelect={handleSelectVote}
          setDisabledVotings={setDisabledVotings}
        />
      ))}
      <VoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={voteHandler}
        voteItem={selectedVote}
        voted={selectedVote?.currentUserVote}
      />
    </div>
  );
};

VoteCards.propTypes = {
  votes: PropTypes.arrayOf(shape(
    [
      PropTypes.objectOf(shape({
        check: PropTypes.bool,
        text: objectOf(shape({
          title: PropTypes.string,
          content: PropTypes.string,
        })),
        voteID: PropTypes.number,
        voteVolume: PropTypes.number,
      })),
    ],
  )).isRequired,
  step: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default VoteCards;
