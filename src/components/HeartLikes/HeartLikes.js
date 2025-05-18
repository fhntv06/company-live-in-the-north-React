import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { bool, number, string } from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import { useSetLikeMutation, useDeleteLikeMutation } from '../../services/likesApi';
import styles from './HeartLikes.module.scss';
import { useLazyGetUserQuery } from '../../services/authApi';

const HeartLikes = ({
  likes,
  type,
  id,
  userId,
  currentUserLike,
  disabled,
}) => {
  // const dispatch = useDispatch();
  const [volume, setVolume] = useState(likes);
  const [likeId, setLikeId] = useState(currentUserLike);
  const [setLike, { isLoading: isLoadingSetLike }] = useSetLikeMutation();
  const [deleteLike, { isLoading: isLoadingDeleteLike }] = useDeleteLikeMutation();
  const [triggerGetUser] = useLazyGetUserQuery();
  const plus = useRef(likeId);

  useEffect(() => {
    setLikeId(currentUserLike);
  }, [currentUserLike]);

  useEffect(() => {
    setVolume(likes);
  }, [likes]);

  const changeHeartHandle = async (oldVolume) => {
    if (disabled) return;
    let newVolume = oldVolume;
    plus.current = !plus.current;
    const data = {
      id: likeId,
      userId,
      likeableId: id,
      likeableType: type,
    };

    try {
      if (!likeId) {
        newVolume += 1;
        const result = await setLike(data).unwrap();
        if (result.success) {
          setLikeId(result.data.id);
          triggerGetUser();
        }
      } else {
        newVolume -= 1;
        const result = await deleteLike(data.id).unwrap();
        if (result.success) {
          setLikeId(null);
          triggerGetUser();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
    setVolume(newVolume);
  };

  return (
    <>

      <div className={classnames(
        styles.container,
        'HeartLikes-container',
        { [styles.loaderContainer]: isLoadingSetLike || isLoadingDeleteLike },
      )}
      >
        {' '}
        {isLoadingSetLike || isLoadingDeleteLike ? (<div className={styles.loader} />)
          : (
            <>
              <button
                disabled={disabled || isLoadingSetLike || isLoadingDeleteLike}
                type="button"
                className={classnames(
                  styles.button,
                  {
                    [styles.like]: likeId,
                    [styles.disabled]: disabled,
                  },
                )}
                onClick={() => changeHeartHandle(volume)}
              >
                <Icon name="heart" className={styles.svg} />
              </button>
              {volume}
            </>
          )}
      </div>
    </>
  );
};

HeartLikes.propTypes = {
  likes: number.isRequired,
  type: string.isRequired,
  id: number.isRequired,
  userId: number.isRequired,
  currentUserLike: number,
  disabled: bool,
};

HeartLikes.defaultProps = {
  currentUserLike: null,
  disabled: true,
};

export default HeartLikes;
