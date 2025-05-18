import React from 'react';

export const GradientLight = (id, x1, x2, y1, y2) => (
  <defs>
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
      <stop stopColor="#87D9E6" />
      <stop offset="0.331705" stopColor="#8994F8" />
      <stop offset="0.679972" stopColor="#B392F4" />
      <stop offset="1" stopColor="#EBC2C6" />
    </linearGradient>
  </defs>
);

export const GradientViolet = (id, x1, x2, y1, y2) => (
  <defs>
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
      <stop stopColor="#E7BECB" />
      <stop offset="0.497153" stopColor="#BF9DEB" />
      <stop offset="1" stopColor="#A293F6" />
    </linearGradient>
  </defs>
);

export const GradientDarkBlue = (id, x1, x2, y1, y2) => (
  <defs>
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
      <stop stopColor="#54E8D3" />
      <stop offset="0.331705" stopColor="#5166F5" />
      <stop offset="0.679972" stopColor="#9963EF" />
      <stop offset="1" stopColor="#FFC194" />
    </linearGradient>
  </defs>
);

export const FilterGradient = (id, x1, y1, width, height) => (
  <defs>
    <filter id={id} x={x1} y={y1} width={width} height={height} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feGaussianBlur in="BackgroundImageFix" stdDeviation=".5" />
      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7033_154" />
      <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_7033_154" result="shape" />
    </filter>
  </defs>
);
