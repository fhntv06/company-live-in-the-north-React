import React, {
  // useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ defaultLinesNumber, ...props }) => {
  const ref = useRef(null);

  const onInput = ({ target }) => {
    const linebreaksNumber = Math.max(
      (target.value.match(/\n/g) || []).length,
      defaultLinesNumber - 1,
    );
    const style = window.getComputedStyle(target);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const lineHeight = parseFloat(style.lineHeight);

    target.style.height = `${(lineHeight * (linebreaksNumber + 1))
      + paddingTop + paddingBottom + 2}px`;
  };

  useEffect(() => onInput({ target: ref.current }), []);

  return (
    <textarea
      ref={ref}
      onInput={onInput}
      {...props}
    />
  );
};

TextArea.propTypes = {
  defaultLinesNumber: PropTypes.number,
};

TextArea.defaultProps = {
  defaultLinesNumber: 4,
};

export default TextArea;
