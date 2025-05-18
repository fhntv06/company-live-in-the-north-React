import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import styles from './UserInfo.module.scss';
import { formatPhone } from '../../helpers/format';
import useMediaQuery from '../../hooks/useMediaQuery';
import Icon from '../Icon/Icon';
import SocialIconsList from '../SocialIconsList/SocialIconsList';
import { GradientLight } from '../../helpers/gradients';
import { useConfirmEmailMutation } from '../../services/profileApi';
import EmailConfirmedModal from '../EmailConfirmedModal/EmailConfirmedModal';
import useModal from '../../hooks/useModal';

const UserInfo = ({ data, onClick }) => {
  const {
    isOpen: isEmailConfirmedModalOpen,
    openModalHandler: openEmailConfirmedModal,
    closeModalHandler: closeEmailConfirmedModal,
  } = useModal();

  const isMobile = useMediaQuery('(max-width: 757px)');
  const [confirmEmail] = useConfirmEmailMutation();

  const confirmEmailHandler = async () => {
    try {
      const result = await confirmEmail().unwrap();

      if (!result.success) {
        throw new Error('Не удалось отправить письмо');
      }

      openEmailConfirmedModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Avatar
          name={data.firstName}
          surname={data.surname}
          big
          href="/profile/edit"
          wrapperClassName={styles.avatarWrapper}
          className={styles.avatar}
          isExpert={data?.role.value === 2}
          avatar={data.avatar && data.avatar.url}
        />
        <div className={styles.nameWrapper}>
          <p className={styles.name}>
            {data.firstName}
            <br />
            {data.surname}
          </p>
          <p className={styles.birthdate}>{moment(data.birthDate, 'DD.MM.YYYY').format('DD MMMM YYYY')}</p>
        </div>
        {isMobile && (
          <Link to="edit">
            <Icon name="edit" className={styles.editIcon} />
          </Link>
        )}
      </div>
      <div className={styles.content}>
        {data.roleDescription && (
          <p className={styles.position}>{data.roleDescription}</p>
        )}
        <div className={styles.contacts}>
          <ul>
            <li><span className={styles.text}>{formatPhone(data.phone)}</span></li>
            {!data.emailVerifiedAt ? (
              <li
                role="presentation"
                onClick={confirmEmailHandler}
                className={styles.emailNotVerified}
              >
                <Icon name="warning-gradient" className={styles.warningIcon} fill="url(#coin-gradient)" stroke="url(#coin-gradient)">
                  {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
                </Icon>
                <span className={styles.text}>{data.email.length > 40 ? `${data.email.substring(0, 40)}...` : data.email}</span>
                <Icon className={styles.dropdownIcon} name="dropdown-arrow" />
              </li>
            )
              : (
                <li>
                  <span className={styles.text}>{data.email}</span>
                </li>
              )}
          </ul>
          <p className={styles.text}>
            {data.municipality.name}
            {','}
            {' '}
            {data.municipalityLocation.name}
          </p>
          {data.socialLinks && data.socialLinks.length > 0 && (
            <SocialIconsList links={data.socialLinks} className={styles.socialLinks} contrast />
          )}
        </div>
        <div className={styles.controls}>
          <NavLink
            to="edit"
            className={styles.uppercaseLink}
          >
            Мой профиль
          </NavLink>
          <button type="button" onClick={onClick} className={styles.uppercaseLink}>
            Выйти
          </button>
        </div>
      </div>
      <EmailConfirmedModal isOpen={isEmailConfirmedModalOpen} onClose={closeEmailConfirmedModal} />
    </div>
  );
};

UserInfo.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    surname: PropTypes.string,
    birthDate: PropTypes.string,
    phone: PropTypes.string,
    emailVerifiedAt: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    roleDescription: PropTypes.string,
    avatar: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
    role: PropTypes.objectOf(PropTypes.shape({
      value: PropTypes.number,
      key: PropTypes.string,
      description: PropTypes.string,
    })),
    socialLinks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    })),
    municipality: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    municipalityLocation: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }).isRequired,
  onClick: PropTypes.func,
};

UserInfo.defaultProps = {
  onClick: () => {},
};

export default UserInfo;
