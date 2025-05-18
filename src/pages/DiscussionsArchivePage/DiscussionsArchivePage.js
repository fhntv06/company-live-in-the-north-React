import React from 'react';
import DiscussionSortedList from '../../components/Discussion/DiscussionSortedList/DiscussionSortedList';
import DiscussionDescription from '../DiscussionsPage/DiscussionDescription/DiscussionDescription';
import Seo from '../../components/Seo/Seo';
import styles from '../DiscussionsPage/DiscussionsPage.module.scss';

const DiscussionsArchivePage = () => (
  <div className={styles.page}>
    <Seo title={'Архив обсуждений | Живём на Севере - сообщество активных жителей Ямала'} description={'Живём на севере'} />
    <DiscussionSortedList archive />
    <DiscussionDescription />
  </div>
);

export default DiscussionsArchivePage;
