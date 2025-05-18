import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AgeRestriction.module.scss';

const AgeRestriction = ({ imageUrl, age }) => {
  const [isDark, setIsDark] = useState(!imageUrl);

  useEffect(() => {
    const img = new Image();
    if (imageUrl) {
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const { data } = imageData;

        let brightnessSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          brightnessSum += brightness;
        }

        const averageBrightness = brightnessSum / (img.width * img.height);
        setIsDark(averageBrightness > 186);
      };
    }
  }, [imageUrl]);

  return (
    <div
      className={classnames(styles.tag, { [styles.contrast]: isDark })}
    >
      {age}
    </div>
  );
};

AgeRestriction.propTypes = {
  imageUrl: PropTypes.string,
  age: PropTypes.string,
};

AgeRestriction.defaultProps = {
  imageUrl: null,
  age: null,
};

export default AgeRestriction;
