import { useEffect } from 'react';

export default function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      const element = event.target;
      if (!ref.current || ref.current.contains(element)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
