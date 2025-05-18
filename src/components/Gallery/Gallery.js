import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Gallery.module.scss';
import GalleryViewer from '../GalleryViewer/GalleryViewer';
import Icon from '../Icon/Icon';

const Gallery = ({
  items,
  maxPreviewItems,
  notScrollable,
  className,
}) => {
  const currentIndexRef = useRef(0);
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const observer = useRef(null);

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photosInViewport, setPhotosInViewport] = useState(maxPreviewItems);
  const [sortedImages, setSortedImages] = useState();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.raw', '.svg', '.webp'];

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { contentRect, target } = entry;
        const arr = target.children;

        let i = 0;
        while (i < arr.length) {
          const { left, width } = arr[i].getBoundingClientRect();
          if (contentRect.width <= left || width === 0) {
            break;
          }

          i++;
        }

        let prevPhotosInViewport;

        if (photosInViewport !== prevPhotosInViewport) {
          setPhotosInViewport((prevState) => {
            prevPhotosInViewport = prevState;
            return i;
          });
        }
      });
    });

    observer.current.observe(viewportRef.current);

    return () => {
      observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const imagesInFiles = [];
      items.forEach((file) => {
        if (imageExtensions.includes(file.media.url.substring(file.media.url.lastIndexOf('.')).toLowerCase())) {
          imagesInFiles.push(file);
        }
      });
      setSortedImages(imagesInFiles);
    }
  }, [items]);

  const onOpenViewer = (index) => {
    currentIndexRef.current = index;
    setViewerIsOpen(true);
    disableBodyScroll(document.body, {
      reserveScrollBarGap: true,
    });
  };

  const onCloseViewer = () => {
    setViewerIsOpen(false);
    enableBodyScroll(document.body);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={classNames(styles.wrapper, className, {
          [styles.notScrollable]: notScrollable,
        })}
      >
        <div
          ref={viewportRef}
          className={styles.viewport}
        >
          {items.slice(0, maxPreviewItems).map((item, index) => (

            imageExtensions.includes(item.media.url.substring(item.media.url.lastIndexOf('.')).toLowerCase())
              ? (
                <button
                  type="button"
                  key={item.id}
                  className={classNames(styles.item, 'gallery__item')}
                  onClick={(e) => { e.stopPropagation(); onOpenViewer(index); }}
                >
                  <img
                    src={item.media.url}
                    alt={item.media.name}
                  />
                </button>
              )
              : (
                <a download href={item.media.url} className={styles.downloadLink}>
                  <Icon name="download" className={styles.icon} />
                  <span>{item.media.url.substring(item.media.url.lastIndexOf('.'))}</span>
                </a>
              )
          ))}
        </div>
        {items.length > maxPreviewItems && (
          <button
            type="button"
            onClick={() => onOpenViewer(photosInViewport)}
            className={classNames(styles.viewMore, styles.item, 'gallery__item')}
          >
            <span className={styles.viewMoreCount}>
              ещё
              {' '}
              {items.length - photosInViewport}
            </span>
            <img src={items[photosInViewport].media.url} alt={items[photosInViewport].media.url} />
          </button>
        )}
      </div>
      {sortedImages && sortedImages.length > 0 && (
      <GalleryViewer
        items={sortedImages}
        isOpen={viewerIsOpen}
        onClose={onCloseViewer}
        activeIndex={currentIndexRef.current}
      />
      )}
    </>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf().isRequired,
  maxPreviewItems: PropTypes.number,
  className: PropTypes.string,
  notScrollable: PropTypes.bool,
};

Gallery.defaultProps = {
  maxPreviewItems: 5,
  notScrollable: false,
  className: '',
};

export default Gallery;
