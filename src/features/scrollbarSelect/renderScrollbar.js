import React, {
  useRef, useEffect,
} from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import useResize from '../../hooks/useResize';

let timer = null;

export const handleScrollFrame = (values = { top: 0 }, element, move) => {
  const content = element.querySelector('.select__scrollbar-content');
  const track = element.querySelector('.select__scrollbar-track-vertical');
  const thumb = element.querySelector('.select__scrollbar-thumb-vertical');

  if (content && track && thumb) {
    const scrollRatio = content.offsetHeight / content.scrollHeight;
    const height = content.offsetHeight * scrollRatio;
    const offsetThumb = content.offsetHeight - track.offsetHeight;

    thumb.style.display = height === content.offsetHeight ? 'none' : '';
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${(content.offsetHeight - height - offsetThumb) * values.top}px)`;

    if (move) thumb.classList.add('move');
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => thumb.classList.remove('move'), 1000);

    document.addEventListener('mouseup', () => thumb.classList.remove('catch'));
  }
};

const RenderScrollbar = ({ children }) => {
  const selectRef = useRef(null);
  const resize = useResize();

  useEffect(() => {
    if (!selectRef.current) return () => {};

    const selectMenu = selectRef.current.container.closest('.select__menu');
    const selectButton = selectRef.current.container.closest('.select__button');

    const { right } = selectMenu.getBoundingClientRect();

    if (right > (window.innerWidth || document.documentElement.clientWidth)) {
      selectMenu.classList.add('outsideViewportFromRight');
      if (selectButton) {
        selectButton.style.setProperty('--fixed-width', `${selectMenu.clientWidth}px`);
      }
    } else {
      selectMenu.classList.remove('outsideViewportFromLeft');
    }

    return () => {
      if (selectButton) {
        selectButton.style.removeProperty('--fixed-width');
      }
    };
  }, [resize]);

  useEffect(() => {
    if (!selectRef.current) return;

    const scrollContent = selectRef.current.container.querySelector('.select__menu-list');

    selectRef.current.container.style.setProperty(
      '--scrollbar-visibility', `${selectRef.current.container.offsetHeight >= 300 ? 'block' : 'none'}`,
    );

    scrollContent.addEventListener('scroll', ({
      target: {
        scrollHeight, scrollTop, offsetHeight,
      },
    }) => {
      selectRef.current.container.style.setProperty(
        '--before-opacity', `${scrollTop ? '1' : 0}`,
      );

      selectRef.current.container.style.setProperty(
        '--after-opacity', `${offsetHeight + scrollTop >= scrollHeight ? '0' : '1'}`,
      );
    });
  }, []);

  const activeThumb = ({ currentTarget }) => currentTarget.classList.add('catch');

  return (
    <Scrollbars
      ref={selectRef}
      onScrollFrame={(values) => handleScrollFrame(values, selectRef.current.container, true)}
      className="select__scrollbar"
      renderView={() => <div className="select__scrollbar-content select__menu-list" />}
      renderTrackVertical={() => <div className="select__scrollbar-track-vertical" />}
      renderThumbVertical={
        () => (
          <div
            className="select__scrollbar-thumb-vertical"
            role="button"
            aria-label="Scrollbar"
            tabIndex={-10}
            onMouseDown={(e) => activeThumb(e)}
          />
        )
      }
    >
      {/* eslint react/prop-types: 0 */}
      {children}
    </Scrollbars>
  );
};

export default RenderScrollbar;
