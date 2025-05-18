import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabLoader.module.scss';

const TabLoader = ({ isLoading }) => (
  <>
    {isLoading && <div className={styles.loaderShimmer} />}
  </>
);

TabLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default TabLoader;
