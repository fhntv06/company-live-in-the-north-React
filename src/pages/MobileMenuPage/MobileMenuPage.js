import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MobileMenuPage.module.scss';
import Search from '../../components/Search/Search';
import HeaderMenu from '../../components/Header/Menu/Menu';
import ProjectCard from '../../components/ProjectsCard/ProjectCard/ProjectCard';
import ProjectCardBig from '../../components/ProjectsCard/ProjectCardBig/ProjectCardBig';
import SocialIconsList from '../../components/SocialIconsList/SocialIconsList';
import Icon from '../../components/Icon/Icon';
import useMediaQuery from '../../hooks/useMediaQuery';
import MakeagencyLink from '../../components/MakeagencyLink/MakeagencyLink';
import MunicipalityDropdown from '../../components/MunicipalityDropdown/MunicipalityDropdown';
import { useGetMenuProjectsQuery } from '../../services/menuProjects';

const MobileMenuPage = () => {
  const { data: menuCards } = useGetMenuProjectsQuery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (!isMobile) {
      navigate('/');
    }
  }, [isMobile]);

  return (
    <div className={styles.menuPage}>
      <div className={`input-field ${styles.search}`}>
        <Search />
      </div>
      <div className={`select__button ${styles.selectButtonWrapper}`}>
        <Icon name="geo" className={styles.geoIcon} />
        <MunicipalityDropdown />
      </div>
      <div className={styles.mainLinksWrapper}>
        <HeaderMenu type="sub" />
      </div>
      <div className={styles.contentCards}>
        <ProjectCardBig className={styles.cardBig} data={menuCards && menuCards[0]} />
        <div className={styles.cardsSmall}>
          {menuCards && menuCards.map((item, index) => index > 0
            && (
            <ProjectCard
              className={styles.cardSmall}
              key={item.href}
              data={item}
            />
            ))}
        </div>
      </div>
      <div className={styles.social}>
        <SocialIconsList contrast iconClassName={styles.socialSvg} />
      </div>
      <div className={styles.contacts}>
        <span className={styles.email}>info@nasevere.live</span>
        <span className={styles.address}>
          г. Салехард, ул. имени Василия Подшибякина, д. 25 А,
        </span>
        <span className={styles.organization}>
          Ассоциация «Совет муниципальных образований Ямало-Ненецкого автономного округа»
        </span>
      </div>
      <MakeagencyLink className={styles.makeLink} />
    </div>
  );
};

export default MobileMenuPage;
