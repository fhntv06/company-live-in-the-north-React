/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  arrayOf, string, shape, bool,
} from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import classNames from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';
import DiscussionList from '../DiscussionList/DiscussionList';
import OversizedLink from '../../OversizedLink/OversizedLink';
import HowWorkDiscussion from '../../HowWorkDiscussion/HowWorkDiscussion';
import Icon from '../../Icon/Icon';
import styles from './DiscussionSortedList.module.scss';
import ResultTab from '../../ResultTab/ResultTab';
import {
  GradientLight,
  GradientViolet,
} from '../../../helpers/gradients';
import { useGetAllDiscussionsQuery } from '../../../services/discussionApi';
import { useGetAllVotesQuery } from '../../../services/votesApi';
import VisibleWrapper from '../../VisibleWrapper/VisibleWrapper';
import useModal from '../../../hooks/useModal';
import MainPreloader from '../../MainPreloader/MainPreloader';
import { useGetYearResultsQuery } from '../../../services/resultsApi';
import { getSelectedMunicipality } from '../../../features/Municipality/municipalitySlice';
import { sortingDateEndDown, sortingDateEndUp } from '../../../features/DiscussionData/formingData';

const DiscussionSortedList = ({ tabs, activeTab, archive }) => {
  const selectedMunicipality = useSelector(getSelectedMunicipality);

  const [discussions, setDiscussions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [offsetDiscussions, setOffsetDiscussions] = useState(0);
  const [offsetVotings, setOffsetVotings] = useState(0);
  const { isOpen, openModalHandler, closeModalHandler } = useModal();
  const linearId = `linear-${Math.random()}`;
  const containerRef = useRef();
  const { pathname } = useLocation();
  const [date, setDate] = useState();
  const [limit, setLimit] = useState(16);
  const [currentTabs, setCurrentTabs] = useState(tabs);

  const [firstLoading, setFisrtsLoading] = useState(false);

  const [combinedData, setCombinedData] = useState([]);
  const [selectedType, setSelectedType] = useState(activeTab);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [hiddenMore, setHiddenMore] = useState(false);
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [prevDirectionDiscussion, setPrevDirectionDiscussion] = useState('DESC');
  const [prevDirectionVotes, setPrevDirectionVotes] = useState('DESC');
  const {
    data: discussionsData,
    isLoading: isLoadingDiscussion,
    isSuccess: isSuccessDiscussion,
    isFetching: isFetchingDiscussion,
    isError: isErrorDiscussion,
    refetch: refetchDiscussion,
  } = useGetAllDiscussionsQuery({
    limit,
    skip: offsetDiscussions,
    step: archive ? 4 : [2, 3],
    dateStart,
    dateEnd,
    orderDirection,
    selectedMunicipality,
  });
  const {
    data: votingsData,
    isLoading: isLoadingVotings,
    isSuccess: isSuccessVotings,
    isFetching: isFetchingVotings,
    isError: isErrorVotings,
    refetch: refetchVotings,
  } = useGetAllVotesQuery({
    limit,
    skip: offsetVotings,
    step: archive ? 4 : [2, 3],
    dateStart,
    dateEnd,
    orderDirection,
    selectedMunicipality,
  });
  const { data: results, isLoading: isResultsLoading } = useGetYearResultsQuery(selectedMunicipality);

  const mergedArray = (arrayOne, arrayTwo) => arrayOne.concat(arrayTwo).filter((item, index, self) => index === self.findIndex((t) => (
    t.id === item.id
  )));

  useEffect(() => {
    const newOrderDirection = orderDirection !== prevDirectionDiscussion;
    const dateSelected = dateStart || dateEnd;
    if (isSuccessDiscussion) {
      if ((newOrderDirection && discussionsData.length > 1) || dateSelected) {
        setDiscussions(discussionsData);
        if (newOrderDirection) {
          setPrevDirectionDiscussion(orderDirection);
        }
      } else {
        setDiscussions(mergedArray(discussions, discussionsData));
      }
      const isDataLength = discussionsData && discussionsData.length < 16;
      const isVotingsDataLength = votingsData && votingsData.length < 16;
      setHiddenMore(isDataLength && isVotingsDataLength);
    }
  }, [discussionsData, dateStart, dateEnd, orderDirection]);

  useEffect(() => {
    const newOrderDirection = orderDirection !== prevDirectionVotes;
    const dateSelected = dateStart || dateEnd;
    if (isSuccessVotings) {
      if ((newOrderDirection && votingsData.length > 1) || dateSelected) {
        setVotes(votingsData);
        if (newOrderDirection) {
          setPrevDirectionVotes(orderDirection);
        }
      } else {
        setVotes(mergedArray(votes, votingsData));
      }
      const isDiscussionDataLength = discussionsData && discussionsData.length < 16;
      const isVotingsDataLength = votingsData && votingsData.length < 16;
      setHiddenMore(isDiscussionDataLength && isVotingsDataLength);
    }
  }, [votingsData, dateStart, dateEnd, orderDirection]);

  const onFetchMore = () => {
    setOffsetDiscussions((prev) => prev + 16);
    setOffsetVotings((prev) => prev + 16);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    let combinedData = [];
    if (selectedType === 'discussion') {
      combinedData = discussions;
    } else if (selectedType === 'vote') {
      combinedData = votes;
    } else if (discussionsData && votingsData) {
      combinedData = [...discussions, ...votes];
    }
    let newTabs = tabs;

    if (!votes.length || !discussions.length || !results || !results.results.length) {
      if (!votes.length) {
        newTabs = newTabs.filter((tab) => tab.category !== 'vote');
      }
      if (!discussions.length) {
        newTabs = newTabs.filter((tab) => tab.category !== 'discussion');
      }
    } else if (tabs.length !== currentTabs.length) {
      setCurrentTabs(tabs);
    }
    setCurrentTabs(newTabs);

    setCombinedData(archive ? sortingDateEndDown(combinedData) : sortingDateEndUp(combinedData));
  }, [selectedType, discussions, votes, discussionsData, votingsData, results]);

  useEffect(() => {
    const today = moment(new Date()).format('DD.MM.YYYY');
    if (!date) {
      if (dateStart && dateEnd) {
        setDateStart(false);
        setDateEnd(false);
      }
      return;
    }

    const { firstSelect, secondSelect } = date;
    const formattedFirstSelect = moment(firstSelect).format('DD.MM.YYYY');
    const formattedSecondSelect = moment(secondSelect).format('DD.MM.YYYY');

    if (formattedSecondSelect === today || secondSelect === 0) {
      setDateEnd(false);
    }

    if (formattedFirstSelect !== today) {
      setDateStart(formattedFirstSelect);
    }

    if (secondSelect !== today && secondSelect !== 0) {
      setDateEnd(formattedSecondSelect);
    }

    if (formattedFirstSelect === today || !firstSelect) {
      setDateStart(false);
    }

    refetchDiscussion();
    refetchVotings();
  }, [date]);

  useEffect(() => {
    const resetOffsets = () => {
      setOffsetDiscussions(0);
      setOffsetVotings(0);
    };

    if (dateStart || dateEnd) {
      setLimit(null);
      resetOffsets();
    } else if (limit !== 16) {
      setLimit(16);
    }
  }, [dateStart, dateEnd]);

  let timer = null;

  useEffect(() => {
    if ((isSuccessDiscussion && isSuccessVotings) || (isErrorVotings && isErrorDiscussion)) {
      if (!firstLoading) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => setFisrtsLoading(true), 1000);
      }
    }
  }, [isSuccessDiscussion, isSuccessVotings, isErrorVotings, isErrorDiscussion]);

  const title = useMemo(() => (
    <>
      {pathname === '/' && !archive
            && <OversizedLink type="link-big-bold" link="/discussions">Обсуждения</OversizedLink>}
      {pathname !== '/'
            && <h1 className={styles.title}>{!archive ? 'Обсуждения' : 'Архив обсуждений'}</h1>}
    </>
  ), []);

  if (isLoadingDiscussion && isLoadingVotings && isResultsLoading) return <MainPreloader />;

  const renderDiscussionList = () => (
    <VisibleWrapper overflow roundCorners className={styles.listWrapper}>
      <DiscussionList
        volumeAllDiscussions={combinedData.length}
        handleMore={onFetchMore}
        hiddenMore={hiddenMore}
        sort={selectedType}
        archive={archive}
        isLoading={(isLoadingDiscussion && isLoadingVotings) || (isFetchingDiscussion && isFetchingVotings)}
        discussions={combinedData}
        setData={setDate}
        setOrderDirection={setOrderDirection}
      />
    </VisibleWrapper>
  );

  const discussionLoader = () => (
    <div className={styles.loaderShimmer} />
  );

  const emptyLoadingData = (discussionsData && !discussionsData.length)
  && (votingsData && !votingsData.length)
  && (discussions && !discussions.length)
  && (votes && !votes.length);

  const renderDiscussionLoader = () => {
    if (selectedType !== 'result' && !combinedData.length && !firstLoading) {
      return discussionLoader();
    }
    return null;
  };

  const renderDiscussion = () => {
    if (((selectedType !== 'result') && (combinedData.length > 0)) || archive) {
      return renderDiscussionList();
    }
    return null;
  };

  const renderResultTab = () => {
    if ((emptyLoadingData || (selectedType === 'result')) && results && results.results.length && !archive) {
      return (
        <ResultTab
          noDiscussion={!combinedData.length}
          selectedType={selectedType}
          data={results}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className={`${styles.wrapper} container`}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            {title}
            {!archive && (
            <div className={styles.tooltipWrapper}>
              <button className={styles.tooltipButton} type="button" onClick={openModalHandler}>
                <Icon name="question-mark" fill={`url(#${linearId})`} className={styles.buttonSvg}>
                  {GradientViolet(linearId, 23.6871, -7.94068e-06, 0.782346, -7.50192e-06)}
                </Icon>
              </button>
            </div>
            )}
          </div>
          {!archive && (
          <div className={styles.sortTabsWrapper}>
            <div className={styles.sortTabs}>
              <>
                {!discussions.length && !votes.length ? (
                  <button
                    type="button"
                    className={`${styles.sortTab} ${styles.active}`}
                  >
                    <span className={styles.tabText}>{tabs[3].name}</span>
                  </button>
                )
                  : currentTabs.map((tab) => (
                    <button
                      type="button"
                      className={classNames(styles.sortTab, { [styles.active]: tab.category === selectedType })}
                      onClick={() => handleSelectType(tab.category)}
                      key={tab.name}
                    >
                      <span className={styles.tabText}>{tab.name}</span>
                    </button>
                  ))}
              </>

              <Link to="/discussions/archive" className={`${styles.archiveLink} ${styles.sortTab} ${styles.archiveLinkMobile}`}>
                <p className={styles.tabText}>Архив</p>
              </Link>
            </div>
            <Link to="/discussions/archive" className={`${styles.archiveLink} ${styles.sortTab} ${styles.archiveLinkDesktop}`}>
              <Icon name="book" fill={`url(#${linearId})`} className={styles.archiveSvg}>
                {GradientLight(linearId, 16, 0, 0, -1.56563e-09)}
              </Icon>
              <p className={styles.tabText}>Архив</p>
            </Link>
          </div>
          )}
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={selectedType}
            nodeRef={containerRef}
            classNames="discussion-tab-animation"
            timeout={200}
          >
            <div ref={containerRef} className={styles.list}>
              {renderDiscussionLoader()}
              {renderDiscussion()}
              {renderResultTab()}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <HowWorkDiscussion isOpen={isOpen} onClose={closeModalHandler} />
      </div>
    </>
  );
};

DiscussionSortedList.propTypes = {
  tabs: arrayOf(
    shape({ category: string, name: string }),
  ),
  activeTab: string,
  archive: bool,
};
DiscussionSortedList.defaultProps = {
  tabs: [
    { name: 'все обсуждения', category: 'all' },
    { name: 'приём идей', category: 'discussion' },
    { name: 'на голосовании', category: 'vote' },
    { name: 'результаты', category: 'result' },
  ],
  activeTab: 'all',
  archive: false,
};

export default DiscussionSortedList;
