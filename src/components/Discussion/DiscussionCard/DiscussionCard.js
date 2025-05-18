import React, { useState } from 'react';
import {
  string,
  arrayOf,
  number,
  shape,
  oneOfType, bool,
} from 'prop-types';
import classNames from 'classnames';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import AddIdia from '../../AddIdia/AddIdia';
import Button from '../../Button/Button';
import { GradientViolet } from '../../../helpers/gradients';
import DiscussionDate from '../DiscussionDate/DiscussionDate';
import Tag from '../../Tags/Tag';
import styles from './DiscussionCard.module.scss';
import ActivityTypeLabel from '../../../pages/ActivityCard/ActivityTypeLabel';
import {
  useToggleDiscussionFavoriteMutation,
  useToggleVotingFavoriteMutation,
} from '../../../services/profileApi';
import useToggleFavorite from '../../../hooks/useToggleFavorite';

const DiscussionCard = ({
  data,
  className,
  isActivity,
  type,
  archive,
  isAuth,
  ...otherProps
}) => {
  const {
    id,
    category,
    city,
    users,
    activeEnd,
    activeStart,
    description,
    name,
    ideasCount,
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
  const linearId = `linear-${Math.random()}`;
  const [changeView, setChangeView] = useState(false);

  const classNameCard = classNames(
    styles.card,
    className,
    {
      [styles.vote]: !discussion,
      [styles.discussion]: discussion,
      [styles.enter]: changeView,
      [styles.out]: !changeView,
      [styles.activity]: isActivity,
    },
  );

  const bookmarkHandler = (e) => {
    e.preventDefault();
    toggleFavoriteHandler(id);
  };

  const content = (
    <>
      <div className={styles.top}>
        <div className={styles.date}>
          {isActivity ? (
            <ActivityTypeLabel type={type} />
          ) : (
            <DiscussionDate
              type={type}
              fromDate={(step && step.value === 3) || archive ? activeEnd : activeStart}
              changeView={changeView}
              archive={archive}
              step={step && step}
            />
          )}
        </div>
        {(!isActivity && isAuth) && (
          <Button
            typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
            iconProps={{ stroke: `url(#${linearId})` }}
            className={styles.booksmarkBtn}
            gradient={GradientViolet(linearId, 12.8696, 3.32598, 0.999995, 0.999995)}
            onClick={bookmarkHandler}
          />
        )}
      </div>
      <div className={styles.middle}>
        <h4 className={styles.title}>
          {name?.length > 120 ? `${name?.substring(0, 120)}...` : name}
        </h4>
        {!isActivity && (
          <p className={styles.text}>
            {description && parser(description)}
          </p>
        )}
        {discussion && !isActivity && !archive && (step && step.value === 3)
          ? <AddIdia type={type} ideasCount={ideasCount} users={users} href={`/discussions/${id}`} className={styles.addIdia} />
          : null}
      </div>
      {category || (city && city.length > 0) ? (
        <div className={styles.bottom}>
          <div className={styles.tags}>
            {category && <Tag type="mark">{category}</Tag>}
            {city.length > 0 ? <Tag type="mark">{city[0]?.name}</Tag> : null}
          </div>
        </div>
      ) : null}
    </>
  );

  return (
    <Link
      to={`/${type}s/${id}`}
      className={classNameCard}
      onMouseEnter={discussion ? () => setChangeView(true) : null}
      onMouseLeave={discussion ? () => setChangeView(false) : null}
      {...otherProps}
    >
      {content}
    </Link>
  );
};

DiscussionCard.propTypes = {
  data: shape({
    category: string,
    city: string,
    name: string.isRequired,
    href: string.isRequired,
    type: string,
    day: oneOfType([string, number]),
    month: string,
    description: string,
    users: arrayOf(shape({ name: string, surname: string })),
  }),
  type: string,
  className: string,
  isActivity: bool,
  ideasCount: number,
  archive: bool,
  isAuth: bool,
};
DiscussionCard.defaultProps = {
  data: shape({
    type: 'vote',
    day: '',
    month: '',
    description: '',
    users: [],
    city: null,
    category: '',
  }),
  type: 'discussion',
  className: '',
  isActivity: false,
  ideasCount: 0,
  archive: false,
  isAuth: false,
};

export default DiscussionCard;
