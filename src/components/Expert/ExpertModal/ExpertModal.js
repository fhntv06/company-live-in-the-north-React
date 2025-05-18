import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal/Modal';
import styles from './ExpertModal.module.scss';
import Avatar from '../../Avatar/Avatar';
import SocialIconsList from '../../SocialIconsList/SocialIconsList';
import Icon from '../../Icon/Icon';
import ModalCloseButton from '../../Modal/ModalCloseButton';

const ExpertModal = ({ isOpen, onClose, users }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.innerWrapper}>
      {users.map((user, i) => (
        <div className={styles.expertWrapper}>
          <div className={styles.expert}>
            <Avatar
              name={user.firstName}
              surname={user.surname}
              avatar={user.avatar}
              className={styles.avatar}
              classLink={styles.link}
            />
            <div className={styles.expertInfo}>
              <div className={styles.expertFirstRow}>
                <span className={styles.expertName}>
                  {user.firstName}
                  {' '}
                  <span>
                    {user.surname}
                    <Icon name="expert-check" className={styles.icon} />
                  </span>
                </span>
                { i === 0 && <ModalCloseButton onClick={onClose} className={styles.closeBtn} />}
              </div>
              {user.roleDescription
              && <p className={styles.expertDescription}>{user.roleDescription}</p>}
              {user.socialLinks?.length
                    && <SocialIconsList links={user.socialLinks} className={styles.social} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Modal>
);

ExpertModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      img: PropTypes.string,
    }),
  ).isRequired,
};
ExpertModal.defaultProps = {
  isOpen: false,
};

export default ExpertModal;
