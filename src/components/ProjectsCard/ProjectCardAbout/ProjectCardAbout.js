/* eslint-disable max-len */
import React, { useState } from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import parser from 'html-react-parser';
import styles from './ProjectCardAbout.module.scss';
import Icon from '../../Icon/Icon';
import { GradientLight } from '../../../helpers/gradients';

const ProjectCardAbout = ({
  title,
  description,
  text,
  href,
  img,
  hidden,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const linearId = `arrow-horizontal-gradient-${Math.random()}`;
  // TODO: refactor this
  const logoGroup = [{
    id: 0,
    image: img,
    alt: 'img',
  }, {
    id: 1,
    image: img,
    alt: 'img',
  }];

  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <Link
      onMouseEnter={() => toggleHover()}
      onMouseLeave={() => toggleHover()}
      to={!hidden && href}
      className={`${styles.wrapper} ${className ? styles[className] : ''}`}
    >
      <div className={`${styles.containerLeft} ${className ? styles[className] : ''}`}>
        <div className={styles.containerImage}>
          <img src={img} alt="img" />
          <div className={styles.imagesWrapper}>
            <TransitionGroup className="elements-container">
              {hover && (
                logoGroup.map(({ id, image, alt }) => (
                  <CSSTransition key={id + 1} timeout={500} classNames="slide">
                    <img src={image} alt={alt} />
                  </CSSTransition>
                ))
              )}
            </TransitionGroup>
          </div>

        </div>
        <div className={styles.content}>
          <p className={`${styles.title} ${className ? styles[className] : ''}`}>{title}</p>
          {className !== 'mobile' && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.wrapperMobileContainer}>
          <p className={styles.text}>{parser(text)}</p>
          <Icon className={styles.arrowIcon} name="arrow-horizontal" viewBox="0 0 91 12" fill="none" stroke="#FFFFFF" />
        </div>
      </div>
      <div className={styles.containerRigth}>
        <Icon className={styles.arrowIcon} name="arrow-horizontal" viewBox="0 0 91 12" fill="none" stroke={`url(#${linearId})`}>
          {GradientLight(linearId, 90, 0, 1, 1)}
        </Icon>
        <p className={styles.text}>{parser(text)}</p>
      </div>
    </Link>
  );
};

ProjectCardAbout.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  text: string.isRequired,
  href: string.isRequired,
  img: string,
  className: string,
  hidden: bool,
};

ProjectCardAbout.defaultProps = {
  img: '',
  className: '',
  hidden: false,
};

export default ProjectCardAbout;
