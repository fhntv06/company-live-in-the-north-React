import { useLayoutEffect, useState } from 'react';

const useResize = () => {
  const [resize, setResize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return resize;
};

export default useResize;
