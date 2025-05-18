import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  arrayOf,
  bool,
  string,
  number,
} from 'prop-types';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Select from '../Select/Select';
import Idea from './Idea/Idea';
import Button from '../Button/Button';
import { formingIdeas, sortingIdeas } from '../../features/DiscussionData/formingData';
import styles from './AllIdea.module.scss';

const optionsSort = [
  {
    value: 0,
    label: 'СНАЧАЛА ПОПУЛЯРНОЕ',
  },
  {
    value: 1,
    label: 'СНАЧАЛА НОВОЕ',
  },
  {
    value: 2,
    label: 'СНАЧАЛА СТАРОЕ',
  },
];

const AllIdea = ({ ideas, className, disabled }) => {
  const stepNumber = useRef(12);
  const [sortId, setSortId] = useState(0);
  const [sliceArray, setSliceArray] = useState([]);
  const [shareIdea, setShareIdea] = useState();
  const [maxNumber, setMaxNumber] = useState(
    // eslint-disable-next-line max-len
    (stepNumber.current >= ideas.length) && ideas.length > 1 ? ideas.length : stepNumber.current,
  );
  const [maxStepForOneId, setMaxStepForOneId] = useState(1);
  const more = ideas.length > maxNumber;
  const startSortArray = useCallback(sortingIdeas([...ideas], sortId), [ideas]);
  const arIdeas = useCallback(
    formingIdeas([...startSortArray], sortId, maxNumber), [sortId, maxNumber, ideas],
  );
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shareId = searchParams.get('share');
    if (shareId) {
      setMaxNumber(1);
      setShareIdea(true);
      // eslint-disable-next-line radix
      const shareIndex = ideas.findIndex((idea) => idea.id === parseInt(shareId));

      const arrayForSort = [...ideas];
      // eslint-disable-next-line max-len
      const arrayWithSort = [arrayForSort[shareIndex]].concat(arrayForSort.slice(0, shareIndex), arrayForSort.slice(shareIndex + 1));
      setSliceArray(arrayWithSort);
    }
  }, []);

  const handleMore = () => {
    setMaxNumber((prev) => prev + stepNumber.current);
    setMaxStepForOneId((prev) => prev + stepNumber.current);
  };

  const arIdeasWithOneIdea = formingIdeas([...sliceArray], sortId, maxStepForOneId);

  return (
    <div className={classnames(
      styles.wrapper,
      className,
    )}
    >
      <div className={styles.container}>
        {ideas.length > 1 && (
        <div className={`${styles.sorting} select__button`}>
          <Select
            options={optionsSort}
            defaultValue={optionsSort[0]}
            type="button--white"
            className="select--button"
            classIsOpen="select--button--is-open"
            isSearchable={false}
            setSortId={setSortId}
          />
        </div>
        )}
        {(shareIdea ? arIdeasWithOneIdea : arIdeas).map(({
          id, user, message, likesCount, usersPublic, currentUserLike, files,
        }) => (
          <Idea
            ideaId={id}
            key={id}
            user={user}
            text={message}
            likes={likesCount}
            experts={usersPublic}
            currentUserLike={currentUserLike}
            disabled={disabled}
            files={files}
          />
        ))}
      </div>
      {more
        ? (
          <div className={styles.buttonWrapper}>
            <Button
              typeButton="button"
              className={styles.more}
              onClick={handleMore}
            >
              загрузить ещё
            </Button>
          </div>
        ) : null}
    </div>
  );
};

AllIdea.propTypes = {
  ideas: arrayOf({
    persone: {
      name: string,
      surname: string,
      href: string,
    },
    num: number,
    text: string,
    likes: number,
    comments: {
      person: {
        name: string,
        surname: string,
        href: string,
      },
      textComment: string,
    },
    end: bool,
  }),
  className: string,
  disabled: bool,
};

AllIdea.defaultProps = {
  ideas: [],
  className: '',
  disabled: true,
};

export default AllIdea;
