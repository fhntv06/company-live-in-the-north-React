import React, { useMemo } from 'react';
import {
  number,
  shape,
  arrayOf,
  string,
  bool,
} from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import AddIdia from '../../AddIdia/AddIdia';
import TimeCard from '../../TimeCard/TimeCard';
import Button from '../../Button/Button';
import { GradientViolet } from '../../../helpers/gradients';
import styles from './DiscussionItem.module.scss';
import Tag from '../../Tags/Tag';
import {
  useToggleDiscussionFavoriteMutation,
  useToggleVotingFavoriteMutation,
} from '../../../services/profileApi';
import useToggleFavorite from '../../../hooks/useToggleFavorite';

const DiscussionItem = ({
  data, className, type, archive, isAuth, ...otherProps
}) => {
  const {
    id,
    users,
    name,
    activeEnd,
    activeStart,
    ideasCount,
    category,
    city,
    step,
  } = data;

  const [toggleDiscussionFavorite] = useToggleDiscussionFavoriteMutation();
  const [toggleVotingFavorite] = useToggleVotingFavoriteMutation();

  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    id,
    'activities',
    type === 'discussion' ? toggleDiscussionFavorite : toggleVotingFavorite,
  );

  const discussion = type === 'discussion';

  const classNamesContainer = classNames(
    styles.container,
    className,
    {
      [styles.vote]: !discussion,
      [styles.discussion]: discussion,
    },
  );

  const linearId = `linear-${Math.random()}`;
  const textDate = useMemo(() => (
    archive
      ? 'Завершено'
      : (discussion
        ? (step && step.value === 3 ? 'Ждем<br />идей&nbsp;до' : 'Старт<br />приёма идей')
        : (step && step.value === 3 ? 'Идёт<br />голосование' : 'Старт<br />голосования'))
  ), [type]);

  const bookmarkHandler = (e) => {
    e.preventDefault();

    toggleFavoriteHandler(id);
  };

  return (
    <Link to={`/${type}s/${id}`} className={classNamesContainer} {...otherProps}>
      <TimeCard
        text={textDate}
        className={`${styles.time} ${styles.timeText} ${styles.colorGradient}`}
        fromDate={(step && step.value === 3) || archive ? activeEnd : activeStart}
        size="thick"
        step={step && step}
      />
      <div className={styles.content}>
        <div className={styles.questionBlock}>
          <p className={styles.question}>
            {name}
          </p>
          {category || (city && city.length > 0) ? (
            <div className={styles.tags}>
              {category && <Tag type="mark">{category}</Tag>}
              {city.length > 0 && <Tag type="mark">{city[0]?.name}</Tag>}
            </div>
          ) : null}
        </div>
        <div className={styles.addIdia}>
          {discussion && !archive && (step && step.value === 3)
            ? (
              <AddIdia
                users={users}
                ideasCount={ideasCount}
                className={styles.AddIdiaWrapper}
              />
            ) : null}
          {isAuth && (
          <Button
            typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
            iconProps={{ stroke: `url(#${linearId})` }}
            className={styles.discussionBtn}
            gradient={GradientViolet(linearId, 12.8696, 3.32598, 0.999995, 0.999995)}
            onClick={bookmarkHandler}
          />
          )}
        </div>
      </div>
    </Link>
  );
};

DiscussionItem.propTypes = {
  data: shape({
    name: string.isRequired,
    users: arrayOf(shape({ name: string, surname: string })),
    href: string,
    activeStart: number.isRequired,
  }),
  type: string,
  className: string,
  ideasCount: number,
  archive: bool,
  isAuth: bool,
};
DiscussionItem.defaultProps = {
  data: shape({
    name: string.isRequired,
    users: arrayOf(shape({ name: string, surname: string })),
    href: string,
    type: string,
    activeStart: number.isRequired,
  }),
  type: 'discussion',
  className: '',
  ideasCount: 0,
  archive: false,
  isAuth: false,
};

export default DiscussionItem;
