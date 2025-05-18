import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Avatar from '../../Avatar/Avatar';
import styles from './ExpertAvatars.module.scss';
import ExpertSupport from '../ExpertSupport/ExpertSupport';
import ExpertModal from '../ExpertModal/ExpertModal';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useModal from '../../../hooks/useModal';

const ExpertAvatars = ({ users }) => {
  const { isOpen, openModalHandler, closeModalHandler } = useModal();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const remainder = users.slice(0, 3);
  const avatars = remainder.map((user) => (
    <div className={styles.expertAvatarWrapper}>
      <Avatar
        name={user.firstName}
        surname={user.surname}
        avatar={user.avatar}
        className={styles.avatar}
      />
      <ExpertSupport user={user} className={styles.expert} />
    </div>
  ));

  return (
    <>
      <button type="button" onClick={isMobile ? openModalHandler : null} className={styles.wrapper}>{avatars}</button>
      <ExpertModal isOpen={isOpen} users={users} onClose={closeModalHandler} />
    </>
  );
};

ExpertAvatars.propTypes = {
  users: arrayOf(
    shape({
      name: string,
      surname: string,
      img: string,
    }),
  ),
};
ExpertAvatars.defaultProps = {
  users: [],
};

export default ExpertAvatars;
