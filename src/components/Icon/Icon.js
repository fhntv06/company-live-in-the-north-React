import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../images/icons.svg';

const Icon = ({
  name,
  useProps,
  children,
  ...otherProps
}) => (
  <svg
    role="img"
    {...otherProps}
  >
    {children}
    <use xlinkHref={`${icons}#${name}`} {...useProps} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  useProps: PropTypes.objectOf(PropTypes.string),
};

Icon.defaultProps = {
  useProps: {},
  children: null,
};

export default Icon;
