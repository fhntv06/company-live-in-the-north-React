import React from 'react';

import { string, node, oneOfType } from 'prop-types';
import classNames from 'classnames';
import styles from './Tags.module.scss';
import Icon from '../Icon/Icon';

const TagMark = ({
  children,
  type,
  className,
}) => {
  const classNamesTag = classNames(
    styles.tag,
    className,
    {
      [styles.tagMark]: type === 'mark',
      [styles.tagTime]: type === 'time',
      [styles.yamal]: type === 'yamal',
    },
  );

  return (
    <div className={classNamesTag}>
      {children}
      {type === 'search' && <Icon name="close-weig" />}
    </div>
  );
};

TagMark.propTypes = {
  children: oneOfType([string, node]),
  type: string,
  className: string,
};

TagMark.defaultProps = {
  children: '',
  type: '',
  className: '',
};

export default TagMark;
