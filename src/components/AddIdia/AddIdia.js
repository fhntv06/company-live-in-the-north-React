import React from 'react';
import {
  string, arrayOf, shape, number,
} from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { GradientLight } from '../../helpers/gradients';
import styles from './AddIdia.module.scss';
import Icon from '../Icon/Icon';
import defaultAvatar from '../../images/avatar/deletedUser.png';

const AddIdia = ({
  type,
  users,
  href,
  className,
  ideasCount,
}) => {
  const moreRemainders = ideasCount - users?.length;
  const linearId = `linear-${Math.random()}`;
  const userInitials = users.map((user) => (
    // eslint-disable-next-line max-len
    <Avatar name={user?.firstName} surname={user?.surname} wrapperClassName={styles.avatar} avatar={user ? user.avatar : defaultAvatar} />
  ));

  return (
    <Link to={href} className={`${styles.container} ${className}`}>
      <div className={styles.users}>
        {userInitials}
        {users.length === 0 && ideasCount > 0 && <Avatar name={'У'} surname={'П'} wrapperClassName={styles.avatar} avatar={defaultAvatar} />}
      </div>
      <div className={styles.text}>
        {moreRemainders > 0 ? <span>{`и ещё ${moreRemainders}`}</span> : null}
        <span>
          {userInitials?.length ? 'предложили идеи' : 'Предложить идею'}
        </span>
      </div>
      {type === 'discussion'
        ? (
          <div className={styles.add}>
            <Icon fill={`url(#${linearId})`} name="add">
              {GradientLight(linearId, 18, 0, 0, -1.76133e-09)}
            </Icon>
          </div>
        ) : null}
    </Link>
  );
};

AddIdia.propTypes = {
  type: string,
  users: arrayOf(shape({ name: string, surname: string })),
  href: string,
  className: string,
  ideasCount: number,
};

AddIdia.defaultProps = {
  type: '',
  href: null,
  users: null,
  className: '',
  ideasCount: 0,
};

export default AddIdia;
