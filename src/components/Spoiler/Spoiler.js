import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Spoiler.module.scss';
import Icon from '../Icon/Icon';

const Spoiler = ({
  maxLines,
  moreButtonText,
  closeMoreButtonText,
  children,
  className,
}) => {
  const contentRef = useRef(null);
  const currentRowsNumber = useRef(null);
  const [params, setParams] = useState({ maxHeight: 0, minHeight: 'auto' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const container = contentRef.current;
      const element = container.children[0] ? container.children[0] : container;

      let paddings = 0;
      const { height } = container.getBoundingClientRect();
      const { lineHeight } = window.getComputedStyle(element);

      if (element.children.length > 1) {
        [...element.children].forEach((item, index) => {
          if (index + 1 < maxLines + 1) return;
          const {
            paddingTop, paddingBottom, marginTop, marginBottom,
          } = window.getComputedStyle(item);
          // eslint-disable-next-line max-len
          paddings += parseInt(paddingTop, 10) + parseInt(marginTop, 10) + parseInt(paddingBottom, 10) + parseInt(marginBottom, 10);
        }, 0);
      }

      const numOfRows = height / parseInt(lineHeight, 10);
      currentRowsNumber.current = numOfRows;

      setParams({
        minHeight: parseInt(lineHeight, 10) * maxLines + paddings,
        maxHeight: parseInt(lineHeight, 10) * numOfRows,
      });
    }
  }, []);

  const toggleSpoiler = () => {
    setOpen(!open);
  };

  return (
    <div className={className}>
      <div
        ref={contentRef}
        className={classnames(
          styles.content,
          { [styles.hide]: !open && maxLines < currentRowsNumber.current },
        )}
        style={{ maxHeight: !open ? params.minHeight : params.maxHeight }}
      >
        {children}
      </div>
      {maxLines < currentRowsNumber.current && (
        <button
          type="button"
          onClick={toggleSpoiler}
          className={styles.moreButton}
        >
          {!open ? (
            moreButtonText
          ) : (
            closeMoreButtonText
          )}
          <Icon
            name="dropdown-arrow"
            className={classnames(
              styles.icon,
              { [styles.open]: open },
            )}
          />
        </button>
      )}
    </div>
  );
};

Spoiler.propTypes = {
  maxLines: PropTypes.number,
  moreButtonText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  closeMoreButtonText: PropTypes.string,
};

Spoiler.defaultProps = {
  maxLines: 5,
  moreButtonText: 'Читать далее',
  closeMoreButtonText: 'Скрыть',
  children: null,
  className: '',
};

export default Spoiler;
