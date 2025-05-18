import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import BackLink from '../BackLink/BackLink';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';
import { GradientViolet } from '../../helpers/gradients';
import styles from './PageHeader.module.scss';
import ShareModal from '../ShareModal/ShareModal';
import useModal from '../../hooks/useModal';
import { getIsAuth } from '../../features/Auth/authSlice';

const PageHeader = ({
  withoutBackLink,
  withoutOffset,
  withoutControls,
  withoutShareButton,
  withoutFavoriteButton,
  className,
  contrast,
  compact,
  children,
}) => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  return (
    <VisibleWrapper overflow roundCorners>
      <header
        className={classnames(
          styles.header,
          {
            [styles.compact]: compact,
          },
          className,
        )}
      >
        {!withoutBackLink && (
        <div className={styles.backLink}>
          <BackLink contrast={contrast} />
        </div>
        )}
        {!withoutControls && (
        <div className={styles.controllersWrapper}>
          {!withoutShareButton && (
          <Button
            onClick={openShareModalHandler}
            className={styles.buttonShare}
          >
            <Icon className={styles.icon} name="share" />
          </Button>
          )}
          { !withoutFavoriteButton && isAuth && (
          <a href="/">
            <Icon name="shortcut" className={styles.gradientIcon} fill="none" stroke="url(#shortcut-headers-gradient)">
              {GradientViolet('shortcut-headers-gradient', 12.8696, 3.32598, 0.999995, 0.999995)}
            </Icon>
          </a>
          ) }

        </div>
        )}
        {withoutOffset ? (
          children
        ) : (
          <div className={styles.row}>
            {children}
          </div>
        )}
      </header>
      <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
    </VisibleWrapper>
  );
};

PageHeader.propTypes = {
  withoutBackLink: PropTypes.bool,
  withoutOffset: PropTypes.bool,
  withoutControls: PropTypes.bool,
  withoutShareButton: PropTypes.bool,
  withoutFavoriteButton: PropTypes.bool,
  contrast: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  compact: PropTypes.bool,
};

PageHeader.defaultProps = {
  withoutBackLink: false,
  withoutOffset: false,
  withoutControls: false,
  withoutShareButton: false,
  withoutFavoriteButton: false,
  contrast: false,
  className: '',
  children: null,
  compact: false,
};

export default PageHeader;
