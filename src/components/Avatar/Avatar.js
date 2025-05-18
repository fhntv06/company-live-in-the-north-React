import React, { useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import {
  string, bool, func,
} from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Avatar.module.scss';
import Icon from '../Icon/Icon';

const Avatar = ({
  name,
  surname,
  href,
  avatar,
  className,
  wrapperClassName,
  big,
  onChange,
  showDeleteButton,
  isExpert,
  onDelete,
}) => {
  const fileRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const text = useMemo(() => {
    if (Array.isArray(name)) {
      return `${name[0]}${name[1]}`;
    }

    return name && surname ? name[0] + surname[0] : '';
  }, [name, surname]);

  const colors = ['#26AFCD', '#5171F2', '#9164F0', '#CC8CCF', '#FFB27B'];

  const content = (
    <>
      {
        avatar
          ? <div className={styles.photo} style={{ backgroundImage: `url(${avatar})` }} />
          : <span>{text}</span>
      }
    </>
  );

  const avatarBackgroundColor = useMemo(() => (
    colors[Math.floor(Math.random() * colors.length)]
  ), [avatar]);

  const onChangeFile = () => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(fileRef.current.files[0]);
    reader.onload = () => {
      setLoading(false);
      onChange(reader.result);
    };
  };

  return (
    <div className={classnames(
      styles.wrapper,
      wrapperClassName,
    )}
    >
      {href
        ? (
          <Link
            to={href}
            style={{ backgroundColor: avatarBackgroundColor }}
            className={classnames(
              styles.avatar,
              styles.link,
              { [styles.big]: big },
              className,
            )}
          >
            {content}
          </Link>
        )
        : (
          <div
            style={{ backgroundColor: avatarBackgroundColor }}
            className={classnames(
              styles.avatar,
              { [styles.big]: big },
              className,
            )}
          >
            {content}
            {onChange && (
              <>
                <input
                  ref={fileRef}
                  id="changeProfileAvatar"
                  type="file"
                  accept="image/*"
                  onChange={onChangeFile}
                  className={styles.fileInput}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="changeProfileAvatar" className={classnames(styles.editButton, { [styles.disabled]: isLoading })}>
                  <Icon name="camera" className={styles.camera} />
                </label>
              </>
            )}
          </div>
        )}
      {isExpert && <Icon name="expert-check" className={styles.expertIcon} />}
      {showDeleteButton
      && (
      <button onClick={onDelete} type="button" className={styles.deleteButton}>
        <Icon name="bin" className={styles.binIcon} />
      </button>
      )}
    </div>
  );
};

Avatar.propTypes = {
  href: string,
  name: string,
  surname: string,
  avatar: string,
  className: string,
  wrapperClassName: string,
  big: bool,
  onChange: func,
  onDelete: func,
  showDeleteButton: bool,
  isExpert: bool,
};

Avatar.defaultProps = {
  avatar: null,
  className: '',
  wrapperClassName: '',
  name: '',
  surname: '',
  href: null,
  big: false,
  onChange: null,
  onDelete: null,
  isExpert: false,
  showDeleteButton: false,
};

export default Avatar;
