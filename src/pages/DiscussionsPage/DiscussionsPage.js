import React from 'react';
import DiscussionSortedList from '../../components/Discussion/DiscussionSortedList/DiscussionSortedList';
import DiscussionDescription from './DiscussionDescription/DiscussionDescription';
import Seo from '../../components/Seo/Seo';
import styles from './DiscussionsPage.module.scss';

const DiscussionsPage = () => (
  <div className={styles.page}>
    <Seo title={'Обсуждения | Живём на Севере - сообщество активных жителей Ямала'} description={'Живём на севере'} />
    <DiscussionSortedList />
    <DiscussionDescription />
  </div>
);

export default DiscussionsPage;
