import React from 'react';
import PropTypes, { shape } from 'prop-types';
import htmlParser from 'html-react-parser';
import styles from './VoteModal.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';

const VoteModal = ({
  isOpen,
  onClose,
  onSubmit,
  voteItem,
  voted, // currentUserVote
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.innerWrapper}>
      <h4 className={styles.title}>
        {voted ? 'Вы хотите отозвать свой голос?' : 'Проголосовать за этот вариант?'}
        <ModalCloseButton onClick={onClose} />
      </h4>
      <div className={styles.voteWrapper}>
        <div className={styles.voteText}>{voteItem && htmlParser(voteItem.name)}</div>
        <div className={styles.voteVolume}>
          {voteItem?.widthIndicator ? <div style={{ width: `${voteItem?.widthIndicator}%` }} className={styles.line} /> : ''}
          <span className={styles.votesAmount}>{voteItem?.usersVoteAnswersCount}</span>
        </div>
      </div>
      <div className={styles.disclaimer}>
        <p className={styles.text}>
          {voted
            ? 'Вы собираетесь отозвать свой голос за выбранный вариант. После подтверждения Вы можете отдать свой голос вновь в течение всего этапа голосования.'
            : 'Вы собираетесь отдать свой голос за выбранный вариант. Ваше решение можно будет отменить в течение всего этапа голосования.'}
        </p>
        <div className={styles.buttons}>
          <Button
            className={styles.voteBtn}
            typeButton="button-fill"
            onClick={() => { onSubmit(voteItem); }}
          >
            {voted ? 'отозвать голос' : 'проголосовать'}
          </Button>
          <button type="button" onClick={onClose} className={styles.decideLaterBtn}>Ещё подумаю</button>
        </div>
      </div>
    </div>
  </Modal>
);

VoteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  voteItem: PropTypes.objectOf(shape({
    check: PropTypes.bool,
    text: PropTypes.objectOf(shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })),
    voteID: PropTypes.number,
    voteVolume: PropTypes.number,
    widthIndicator: PropTypes.number,
  })).isRequired,
  voted: PropTypes.bool,
};
VoteModal.defaultProps = {
  isOpen: false,
  voted: false,
};

export default VoteModal;
