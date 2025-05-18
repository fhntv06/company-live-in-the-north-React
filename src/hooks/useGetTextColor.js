import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';

const useGetTextColor = (imageUrl, maxBrightness = 135) => {
  const [textColor, setTextColor] = useState('');

  if (window.location.hostname === 'litn-new.local' || window.location.hostname === 'localhost') {
    return 'black';
  }

  useEffect(() => {
    const colorThief = new ColorThief();

    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = 'Anonymous';

    const determineTextColor = () => {
      const [r, g, b] = colorThief.getColor(image);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      setTextColor(brightness > maxBrightness ? 'black' : 'white');
    };

    image.addEventListener('load', determineTextColor);

    return () => image.removeEventListener('load', determineTextColor);
  }, [imageUrl]);

  return textColor;
};

export default useGetTextColor;
