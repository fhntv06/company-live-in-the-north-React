import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './TabWrapper.module.scss';

const TabWrapper = ({ children, disableAnimation }) => (
  <>
    {disableAnimation ? (
      <div
        className={styles.wrapper}
      >
        {children}
      </div>
    ) : (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.wrapper}
      >
        {children}
      </motion.div>
    )}
  </>
);

TabWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  disableAnimation: PropTypes.bool,
};

TabWrapper.defaultProps = {
  disableAnimation: false,
};

export default TabWrapper;
