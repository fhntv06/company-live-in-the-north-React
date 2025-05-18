import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './ShareModal.module.scss';
import Icon from '../Icon/Icon';
import { GradientViolet } from '../../helpers/gradients';
import Modal from '../Modal/Modal';
import ModalCloseButton from '../Modal/ModalCloseButton';
import useMediaQuery from '../../hooks/useMediaQuery';

const ShareModal = ({
  isOpen, onClose, title, description, link,
}) => {
  const isLarge = useMediaQuery('(max-width: 1278px)');
  const clipboardRef = useRef(null);

  const clipboardHandler = async () => {
    if (!clipboardRef.current) return;

    try {
      await navigator.clipboard.writeText(clipboardRef.current.value);
    } catch (error) {
      console.log(error.message);
    }
  };

  const modalLink = useMemo(() => (link || window.location.href), [link]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal} narrow>
      <div className={styles.wrapper}>
        <div className={classnames(
          styles.row,
          styles.titleRow,
        )}
        >
          <h4 className={styles.title}>
            {title}
          </h4>
          {isLarge && <ModalCloseButton className={styles.close} onClick={onClose} showOnDesktop />}
        </div>
        <div className={classnames(
          styles.row,
          styles.linkRow,
        )}
        >
          <div className={styles.clipboard}>
            <input ref={clipboardRef} className={styles.link} value={modalLink} readOnly />
            <button className={styles.clipBoardButton} type="button" onClick={clipboardHandler}>
              <Icon name="clipboard" className={styles.clipBoardIcon} stroke="url(#clipboard-gradient)">
                {GradientViolet('clipboard-gradient', 22.0024, 9, 9.59565, 9)}
              </Icon>
            </button>
          </div>
        </div>
        {description && (
        <div className={classnames(
          styles.row,
          styles.textRow,
        )}
        >
          <p>{description}</p>
        </div>
        )}
        <div className={classnames(
          styles.row,
          styles.socialRow,
        )}
        >
          <Link
            className={styles.socialLink}
            to={`https://t.me/share/url?url=${modalLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className={styles.socialSvg} name="telegram-social" fill="#fff" />
          </Link>
          <Link
            className={styles.socialLink}
            to={`https://vk.com/share.php?url=${modalLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className={styles.socialSvg} name="vkontakte-social" fill="#fff" />
          </Link>
          <Link
            className={styles.socialLink}
            to={`https://connect.ok.ru/offer?url=${modalLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className={styles.socialSvg} name="odnoklassniki-social" fill="#fff" />
          </Link>
          <Link
            className={styles.socialLink}
            to={`viber://forward?text=${modalLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className={styles.socialSvg} name="viber-social" fill="#fff" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

ShareModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
};

ShareModal.defaultProps = {
  isOpen: false,
  link: null,
  description: '',
};

export default ShareModal;
