import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const media = window.matchMedia(query);
  const [match, setMatches] = useState(media.matches);

  useEffect(() => {
    media.addEventListener('change', ({ matches }) => setMatches(matches));
    return () => media.removeEventListener('change', ({ matches }) => setMatches(matches));
  }, []);

  return match;
};

export default useMediaQuery;
