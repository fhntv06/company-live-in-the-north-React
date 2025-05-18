import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

const defaultSettings = {
  minDist: 50,
  // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
  maxDist: 120,
  // максимальная дистанция, не превышая которую может пройти указатель,
  // чтобы жест считался как свайп (px)
  maxTime: 700,
  // максимальное время, за которое должен быть совершен свайп (ms)
  minTime: 50,
  // минимальное время, за которое должен быть совершен свайп (ms)
  maxMoveDist: null,
};

const eventsUnify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

export default function useSwipe(ref, settings = defaultSettings, axis = 'x') {
  const [swiped, setSwiped] = useState(false);
  const { maxDist, maxMoveDist } = settings;
  const matches = useMediaQuery('(max-width: 757px)');

  let startPosition = 0;
  let currentPosition = 0;

  const key = `page${axis.toUpperCase()}`;

  useEffect(() => {
    if (!ref.current) {
      return null;
    }
    const el = ref.current;

    const swipeStart = (e) => {
      if (!matches) return;

      const event = eventsUnify(e);
      startPosition = event[key];
    };
    const swipeMove = (e) => {
      if (!matches) return;
      const event = eventsUnify(e);

      currentPosition = event[key] - startPosition;
      const position = swiped ? currentPosition : Math.min(0, currentPosition);

      if (Math.abs(position) > maxMoveDist && maxMoveDist) {
        return;
      }

      el.style.transform = `translate${axis.toUpperCase()}(${position}px)`;
    };

    const swipeEnd = () => {
      if (!matches) return;
      el.style = null;
      if (currentPosition < 0 && Math.abs(currentPosition) > maxDist) {
        setSwiped(true);
      } else {
        setSwiped(false);
      }
    };

    el.addEventListener('touchstart', swipeStart);
    el.addEventListener('touchmove', swipeMove);
    el.addEventListener('touchend', swipeEnd);

    return () => {
      el.removeEventListener('touchstart', swipeStart);
      el.removeEventListener('touchmove', swipeMove);
      el.removeEventListener('touchend', swipeEnd);
    };
  }, [ref, matches]);

  return [
    swiped,
    setSwiped,
  ];
}
