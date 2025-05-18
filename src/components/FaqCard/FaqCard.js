import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../Icon/Icon';
import styles from './FaqCard.module.scss';

const FaqCard = ({
  className, hideContentClassName, title, children,
}) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef();

  return (
    <div
      className={classnames(
        styles.card,
        { [styles.open]: open },
        className,
      )}
      ref={cardRef}
    >
      <button
        type="button"
        onClick={() => setOpen((prevState) => (!prevState))}
        className={styles.title}
      >
        {title}
        <Icon name="dropdown-arrow" />
      </button>
      <AnimatePresence>
        {open && (
        <motion.div
          key={Math.random() + title}
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            height: 'auto',
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          className={classnames(
            styles.hideContent,
            hideContentClassName,
          )}
        >
          {children}
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

FaqCard.propTypes = {
  className: PropTypes.string,
  hideContentClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
FaqCard.defaultProps = {
  className: '',
  hideContentClassName: '',
};

export default FaqCard;
