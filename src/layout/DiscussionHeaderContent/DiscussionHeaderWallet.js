import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Wallet from '../../components/Wallet/Wallet';
import styles from './DiscussionHeaderWallet.module.scss';
import HowWorkDiscussion from '../../components/HowWorkDiscussion/HowWorkDiscussion';
import useModal from '../../hooks/useModal';

const DiscussionHeaderWallet = ({ type, className }) => {
  const { isOpen, openModalHandler, closeModalHandler } = useModal();

  const classes = classnames(
    styles.walletWrapper,
    className,
  );

  return (
    <>
      <div className={classes}>
        {type === 'discussions'
        && (
          <>
            <Wallet
              needPlus
              balance={20}
              clickabel={false}
              label="подать идею"
              className={styles.wallet}
              onClick={openModalHandler}
            />
            <Wallet
              needPlus
              balance={10}
              clickabel={false}
              label="поддержать"
              className={styles.wallet}
              onClick={openModalHandler}
            />
          </>
        )}
        {type === 'votings'
        && (
          <Wallet
            needPlus
            balance={50}
            clickabel={false}
            label="проголосовать"
            className={styles.wallet}
            onClick={openModalHandler}
          />
        )}
      </div>
      <HowWorkDiscussion onClose={closeModalHandler} isOpen={isOpen} />
    </>
  );
};

DiscussionHeaderWallet.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DiscussionHeaderWallet.defaultProps = {
  className: '',
};

export default DiscussionHeaderWallet;
