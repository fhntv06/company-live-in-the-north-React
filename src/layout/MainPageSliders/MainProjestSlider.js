import React from 'react';
import PropTypes from 'prop-types';
import ProjectCardAbout from '../../components/ProjectsCard/ProjectCardAbout/ProjectCardAbout';
import styles from './MainPageSliders.module.scss';
import AboutImg from '../../images/icon_about_component.png'; // TEST
// import SmallImgV2 from '../../images/background_small-v2.png';
import ProjectCardInner from '../../components/ProjectsCard/ProjectCardInner/ProjectCardInner';
import GridSlider from '../../components/Slider/GridSlider';

const mainProject = {
  type: 'about',
  title: 'Сообщество активных жителей Ямала',
  description: 'Портал для тех, кому не безразлично, что происходит в его округе, городе, посёлке, дворе',
  text: 'подробнее о&nbsp;портале',
  href: '/afisha',
  img: AboutImg,
};

// const dataSliderMain = [
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
//   {
//     type: 'inner-project',
//     header: 'елка заботы',
//     title: 'Подарите подарок нуждающемуся ребенку',
//     description: 'Благотворительная акция в помощь детям Ямала',
//     background: SmallImgV2,
//     link: '/afisha',
//   },
// ];

const MainProjestSlider = ({ data }) => (
  <div className={styles.mainSlider}>
    <div className={styles.wrapperMobileCard}>
      <ProjectCardAbout
        title={mainProject.title}
        description={mainProject.description}
        text={mainProject.text}
        href="/about"
        img={mainProject.img}
        className="mobile"
      />
    </div>
    <GridSlider>
      <ProjectCardAbout
        title={mainProject.title}
        description={mainProject.description}
        text={mainProject.text}
        href="/about"
        img={mainProject.img}
      />
      {data && data.map((card) => (
        <ProjectCardInner
          header={card.subtitle}
          title={card.header}
          fontType={card.fontType?.key}
          description={card.description}
          background={card?.bannerImage?.url}
          link={card?.externalLink}
        />
      ))}
    </GridSlider>
  </div>
);

MainProjestSlider.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({})).isRequired,
};

export default MainProjestSlider;
