import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';
import makeBirdPagesAnimation from './make_bird_pages';
import styles from './MakeagencyLink.module.scss';

const MakeagencyLink = ({ className }) => {
  const birdRef = useRef();
  const animationRef = useRef();
  const animationData = makeBirdPagesAnimation;

  const play = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  useEffect(() => {
    if (!birdRef.current) return () => {};

    const stop = () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };

    animationRef.current = lottie.loadAnimation({
      name: 'bird',
      container: birdRef.current,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      animationData,
    });

    animationRef.current.addEventListener('complete', stop);

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.birdAnimation} ref={birdRef} onMouseEnter={play} />
      <a
        href="https://makeagency.ru"
        target="_blank"
        title="Разработка сайта — Digital-агентство Мэйк"
        className={styles.link}
        onMouseEnter={play}
        rel="noreferrer"
      >
        Разработка — Мэйк
      </a>
    </div>
  );
};

MakeagencyLink.propTypes = {
  className: PropTypes.string,
};
MakeagencyLink.defaultProps = {
  className: '',
};

export default MakeagencyLink;
