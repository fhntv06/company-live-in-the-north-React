import React from 'react';
import PropTypes from 'prop-types';

const IconType = ({ typeEvent, iconFill, ...otherProps }) => {
  const svgGradient = (
    <svg
      style={{
        width: 0, height: 0, position: 'absolute', visibility: 'hidden',
      }}
      aria-hidden="true"
      focusable="false"
    >
      <linearGradient id="paint0_linear_2101_733" x1="21.997" y1="1.99707" x2="1.63281" y2="1.99707" gradientUnits="userSpaceOnUse">
        <stop stopColor="#87D9E6" />
        <stop offset="0.331705" stopColor="#8994F8" />
        <stop offset="0.679972" stopColor="#B392F4" />
        <stop offset="1" stopColor="#EBC2C6" />
      </linearGradient>
    </svg>
  );

  const svgPen = (
    <svg {...otherProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.997 1.99958C21.997 1.99958 14.357 1.62958 8.33697 9.87958C3.71697 16.2096 1.63281 22.7944 1.63281 22.7944L3.57281 21.7944C4.47874 20.0978 4.47497 19.783 5.47497 18.283C8.00497 19.023 12.707 16.6496 14.997 13.9996C12.997 13.4396 11.397 13.5696 9.03697 13.8096C11.5975 12.4363 13.1656 12.3016 15.6656 12.7016L16.997 9.99958C15.197 9.65958 13.4954 9.58958 11.7154 9.99958C13.6854 8.60958 15.1123 8.5034 17.5523 8.6334L19.207 6.06958C17.647 5.95958 16.3944 6.15931 14.6044 6.59931C16.2144 5.13931 17.6233 4.87211 19.7633 4.74211C19.7633 4.74211 21.2372 2.70802 21.997 1.99958Z" fill={iconFill === 'white' ? '#FFFFFF' : 'url(#paint0_linear_2101_733)'} />
    </svg>
  );

  const svgTorch = (
    <svg {...otherProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.3196 1.83887C15.8105 4.11177 17.2937 7.47284 16.4928 10.3031C16.299 10.9881 16.0065 11.5685 15.6436 12.0488H8.25626C7.64447 11.2268 7.30214 10.1369 7.4142 8.8083C7.51175 7.65177 8.14382 6.8659 8.77923 6.07586C9.38323 5.32489 9.99025 4.57016 10.1441 3.48975C10.5001 3.8415 11.3196 4.94366 11.3196 5.7093C11.5174 5.50637 12.1661 3.85445 11.3196 1.83887ZM7.11035 12.9615H16.9999V15.5046H14.1743L13.1147 21.4382H11.1469L9.93594 15.5046H7.11035V12.9615Z" fill={iconFill === 'white' ? '#FFFFFF' : 'url(#paint0_linear_2101_733)'} />
    </svg>
  );

  const iconType = typeEvent && (typeEvent === 'torch' ? svgTorch : svgPen);

  return (
    <>
      {svgGradient}
      {iconType}
    </>
  );
};

IconType.propTypes = {
  typeEvent: PropTypes.string,
  iconFill: PropTypes.string,
};

IconType.defaultProps = {
  typeEvent: null,
  iconFill: 'gradient',
};

export default IconType;
