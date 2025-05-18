import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../Icon/Icon';
import styles from './SpinnerLoader.module.scss';

const SpinnerLoader = ({ className, isLoading }) => (
  <AnimatePresence>
    {isLoading && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={classnames(
        styles.wrapper,
        className,
      )}
    >
      <Icon name="snowflake" className={styles.icon} />
    </motion.div>
    )}
  </AnimatePresence>
);

SpinnerLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

SpinnerLoader.defaultProps = {
  className: '',
};

export default SpinnerLoader;
