/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React, {
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
// import useModal from '../../hooks/useModal';
import Icon from '../Icon/Icon';
import MakeagencyLink from '../MakeagencyLink/MakeagencyLink';
import SocialIconsList from '../SocialIconsList/SocialIconsList';
import BottomMenuMobile from '../BottomMenuMobile/BottomMenuMobile';
import FormingAdress from '../../helpers/formingAdress';
import styles from './PageFooter.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import {
  closeFeedback,
  getFeedbackIsClosedState,
  openFeedback,
} from '../../features/Feedback/feedbackSlice';
import { useGetMenuProjectsQuery } from '../../services/menuProjects';
import WarningBanners from '../WarningBanners/WarningBanners';

const adress = 'г. Салехард, ул. имени Василия Подшибякина, д. 25 А.';

const PageFooter = () => {
  const dispatch = useDispatch();
  const viewportRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { data: projects } = useGetMenuProjectsQuery();

  const feedbackIsClosed = useSelector(getFeedbackIsClosedState);

  const closeModal = () => {
    dispatch(closeFeedback());
  };

  const openModal = () => {
    dispatch(openFeedback());
  };

  return (
    <>
      <div className={styles.wrapper} ref={viewportRef}>
        <div className={styles.footer}>
          <div className={styles.top}>
            <div className={styles.mainLinks}>
              <Link className={styles.link} to="/discussions">Обсуждения</Link>
              <Link className={styles.link} to="/afisha">Афиша</Link>
              <Link className={styles.link} to="/store">Магазин</Link>
              <Link className={`${styles.link} ${styles.mobile}`} to="#!">Проекты</Link>
            </div>
            <div className={styles.about}>
              <div className={styles.header}>О портале</div>
              <ul className={styles.aboutList}>
                <li className={styles.listItem}>
                  <Link className={styles.link} to="/about">Живём на Севере</Link>
                </li>
                <li className={styles.listItem}>
                  <Link className={styles.link} to="/results">Результаты и статистика</Link>
                </li>
                <li className={styles.listItem}>
                  <Link className={styles.link} to="/bonus-program">Бонусная программа</Link>
                </li>
                <li className={styles.listItem}>
                  <button type="button" className={styles.link} onClick={openModal}>Связаться с нами</button>
                </li>
              </ul>
            </div>
            <div className={styles.projects}>
              <div className={styles.header}>Проекты</div>
              <ul className={styles.projectsList}>
                {projects && projects.length > 0 && projects.map((project) => (
                  <li className={styles.listItem}>
                    <Link
                      target={project.newWindow && '_blank'}
                      rel={project.newWindow && 'noopener noreferrer'}
                      className={styles.link}
                      to={project.link}
                    >
                      {project.name}

                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.social}>
              <div className={`${styles.header} ${styles.headerSocial}`}>Проект в соцсетях</div>
              <SocialIconsList className={styles.socialList} />
            </div>
            <div className={styles.contacts}>
              <Link to="mailto:info@nasevere.live" type="email" className={styles.mail}>info@nasevere.live</Link>
              <span className={styles.geo}>
                <Icon name="geo" className={styles.svg} />
                <span>{parser(FormingAdress(adress))}</span>
              </span>
            </div>
            <div className={styles.geoMedium}>
              <span className={styles.geo}>
                <Icon name="geo" className={styles.svg} />
                {adress}
              </span>
            </div>
          </div>
          <div className={styles.bottom}>
            <MakeagencyLink className={styles.makeLink} />
            <p className={styles.bottomText}>
              Ассоциация «Совет муниципальных образований Ямало-Ненецкого автономного округа»
            </p>
          </div>
        </div>
        {isMobile && <BottomMenuMobile />}
        <FeedbackModal isOpen={feedbackIsClosed} onClose={closeModal} />
      </div>
      <WarningBanners />
    </>
  );
};

PageFooter.propTypes = {};
PageFooter.defaultProps = {};

export default PageFooter;
