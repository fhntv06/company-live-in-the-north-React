import React from 'react';

import {
  string, func, bool,
} from 'prop-types';

import classnames from 'classnames';
import styles from './Tags.module.scss';

const TagMark = ({
  children,
  onClick,
  select,
}) => {
  const classes = classnames(styles.tag, styles.tagSearch,
    { [styles.tagSelected]: select });

  return (
    <button onClick={onClick} type="button" className={classes}>
      {children}
    </button>
  );
};

TagMark.propTypes = {
  children: string,
  onClick: func,
  select: bool,
};

TagMark.defaultProps = {
  children: '',
  onClick: () => {},
  select: false,
};

export default TagMark;
