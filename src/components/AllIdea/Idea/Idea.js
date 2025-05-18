import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import ExpertAvatars from '../../Expert/ExpertAvatars/ExpertAvatars';
import Avatar from '../../Avatar/Avatar';
import HeartLikes from '../../HeartLikes/HeartLikes';
import SocialIconsList from '../../SocialIconsList/SocialIconsList';
import Icon from '../../Icon/Icon';
import styles from './Idea.module.scss';
import useModal from '../../../hooks/useModal';
import ShareModal from '../../ShareModal/ShareModal';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Gallery from '../../Gallery/Gallery';
import deletedUser from '../../../images/avatar/deletedUser.png';

const Idea = ({
  user,
  text,
  likes,
  experts,
  ideaId,
  currentUserLike,
  disabled,
  files,
}) => {
  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  const isMobile = useMediaQuery('(max-width: 767px)');

  const { id } = useParams();

  return (
    <div className={classnames(
      styles.idea,
      {
        [styles.publicFigure]: user && user.role.value === 2,
      },
    )}
    >
      <div className={styles.user}>
        {!isMobile && (
        <div className={styles.avatarWrapper}>
          <Avatar
            avatar={user ? user.avatar : deletedUser}
            name={user ? user.firstName : 'Профиль'}
            surname={user ? user.surname : 'удален'}
            className={styles.avatar}
          />
        </div>
        )}
        <div className={styles.userInfo}>
          <span className={styles.name}>
            {isMobile && (
            <div className={styles.avatarWrapper}>
              <Avatar
                avatar={user ? user.avatar : deletedUser}
                name={user ? user.firstName : 'Профиль'}
                surname={user ? user.surname : 'удален'}
                className={styles.avatar}
              />
            </div>
            )}
            {`${user ? user.firstName : 'Профиль'} ${user ? (user.role.value === 2 ? user.surname : (`${user.surname[0]}.`)) : 'удален'}`}
            {user && user.role.value === 2 && <Icon name="expert-check" className={styles.publicFigureIcon} />}
          </span>
          {user && user.role.value === 2 && (
            <p className={styles.roleDescription}>
              {user && user.role.value === 2
            && (
            <div className={styles.post}>
              {user && user.roleDescription}
            </div>
            )}
            </p>
          )}
          {user && user.socialLinks && (
          <div className={styles.socialLinks}>
            <SocialIconsList links={user && user.socialLinks.filter((item) => item.url)} contrast />
          </div>
          )}
        </div>
        {isMobile && (
        <button type="button" className={styles.share} onClick={openShareModalHandler}>
          <Icon name="share" className={styles.shareIcon} />
        </button>
        )}
      </div>
      <div className={styles.ideaContent}>
        <div className={styles.ideaText}>
          {parse(text)}
          {files.length > 0 && (
          <div className={styles.gallery}>
            <Gallery
              items={files}
              className={styles.galleryItem}
              maxPreviewItems={4}
              notScrollable
            />
          </div>
          )}
        </div>
        {!isMobile && (
        <button type="button" className={styles.share} onClick={openShareModalHandler}>
          <Icon name="share" className={styles.shareIcon} />
        </button>
        )}
      </div>
      <div className={styles.likes}>
        {experts && experts?.length ? (
          <>
            {!isMobile && <p className={styles.publicFigureText}>Общественные деятели:</p>}
            <ExpertAvatars users={experts} />
          </>
        ) : null}
        <HeartLikes likes={likes} type="App\Models\Idea" id={ideaId} currentUserLike={currentUserLike} disabled={disabled} />
      </div>
      <ShareModal
        title="Поделиться"
        isOpen={isShareModalOpen}
        onClose={closeShareModalHandler}
        link={`${window.location.origin}/discussions/${id}?share=${ideaId}`}
      />
    </div>
  );
};

Idea.propTypes = {
  user: PropTypes.arrayOf(),
  text: PropTypes.string.isRequired,
  likes: PropTypes.number,
  experts: PropTypes.arrayOf(),
  ideaId: PropTypes.number,
  currentUserLike: PropTypes.number,
  disabled: PropTypes.bool,
  files: PropTypes.arrayOf(),
};

Idea.defaultProps = {
  likes: 0,
  experts: null,
  user: null,
  ideaId: null,
  currentUserLike: null,
  disabled: true,
  files: null,
};

export default Idea;
