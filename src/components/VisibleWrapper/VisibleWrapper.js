import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InView } from 'react-intersection-observer';
import BackgroundFigure from '../BackgroundFigure/BackgroundFigure';
import styles from './VisibleWrapper.module.scss';

const VisibleWrapper = ({
  children,
  roundCorners,
  overflow,
  ...otherProps
}) => {
  const [isView, setIsView] = useState(false);

  return (
    <InView
      className={classnames(
        styles.wrapper,
        {
          [styles.roundCorners]: roundCorners,
          [styles.overflow]: overflow,
        },
      )}
      onChange={setIsView}
      {...otherProps}
    >
      {isView && <BackgroundFigure />}
      {children}
    </InView>
  );
};

VisibleWrapper.propTypes = {
  children: PropTypes.node,
  roundCorners: PropTypes.bool,
  overflow: PropTypes.bool,
};

VisibleWrapper.defaultProps = {
  children: null,
  roundCorners: false,
  overflow: false,
};

export default VisibleWrapper;
