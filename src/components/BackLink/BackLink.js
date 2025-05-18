import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './BackLink.module.scss';

const BackLink = ({ contrast, className }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={classnames(
        styles.button,
        { [styles.contrast]: contrast },
        className,
      )}
      onClick={() => navigate(-1)}
    >
      <Icon name="arrow-next" />
      назад
    </button>
  );
};

BackLink.propTypes = {
  contrast: PropTypes.bool,
  className: PropTypes.string,
};

BackLink.defaultProps = {
  contrast: false,
  className: '',
};

export default BackLink;
