import React, { useMemo } from 'react';
import { string, shape } from 'prop-types';
import { useDispatch } from 'react-redux';
import MenuLink from '../../MenuLink/MenuLink';
import OpenMenuItem from '../../OpenMenuItem/OpenMenuItem';
import SocialIconsList from '../../SocialIconsList/SocialIconsList';
import { openFeedback } from '../../../features/Feedback/feedbackSlice';
import styles from './Menu.module.scss';

const menuTop = [
  {
    text: 'Обсуждения',
    link: '/discussions',
    type: 'medium-link',
  },
  {
    text: 'Афиша',
    link: '/afisha',
    type: 'medium-link',
  },
  {
    text: 'Магазин',
    link: '/store',
    type: 'medium-link',
  },
  {
    text: 'О портале',
    link: '/about',
    type: 'medium-link',
    subitems: [
      {
        subtext: 'Живём на Севере',
        sublink: '/about',
        subtype: 'submenu-link',
      },
      {
        subtext: 'Результаты и статистика',
        sublink: '/results',
        subtype: 'submenu-link',
      },
      {
        subtext: 'Бонусная программа',
        sublink: '/bonus-program',
        subtype: 'submenu-link',
      },
      {
        subtext: 'Связаться с нами',
        sublink: '/feedback',
        subtype: 'submenu-link',
        operationType: 'button',
      },
    ],
  },
  // {
  //   text: 'Проекты',
  //   link: '/about',
  //   type: 'medium-link',
  //   subitems: [
  //     {
  //       subtext: 'Уютный ямал',
  //       sublink: '/cozy-yamal',
  //       subtype: 'submenu-link',
  //     },
  //     {
  //       subtext: 'ЯПРИВИТ',
  //       sublink: 'https://xn--b1albzfp9f.xn--80adblbabq1bk1bi8r.xn--p1ai/',
  //       subtype: 'submenu-link',
  //     },
  //     {
  //       subtext: 'Питомцы Ямала',
  //       sublink: 'https://xn--h1aifcq0a9a.xn--80adblbabq1bk1bi8r.xn--p1ai/',
  //       subtype: 'submenu-link',
  //     },
  //     {
  //       subtext: 'Безопасный интернет',
  //       sublink: 'https://xn--80aaabpfimeotkl2bb2c0n.xn--p1ai/',
  //       subtype: 'submenu-link',
  //     },
  //     {
  //       subtext: 'Год экологии',
  //       sublink: 'https://xn--80aaabpfimeotkl2bb2c0n.xn--p1ai/',
  //       subtype: 'submenu-link',
  //     },
  //   ],
  // },
];

const menuSub = [
  {
    text: 'Обсуждения',
    link: '/discussions',
    type: 'burger-link',
  },
  {
    text: 'Афиша',
    link: '/afisha',
    type: 'burger-link',
  },
  {
    text: 'Магазин',
    link: '/store',
    type: 'burger-link',
  },
  {
    text: 'О портале',
    link: '/about',
    type: 'burger-link',
    status: 'active',
    subitems: [
      {
        subtext: 'Живём на Севере',
        sublink: '/about',
        subtype: 'menu-link',
      },
      {
        subtext: 'Результаты и статистика',
        sublink: '/results',
        subtype: 'menu-link',
      },
      {
        subtext: 'Бонусная программа',
        sublink: '/bonus-program',
        subtype: 'menu-link',
      },
      {
        subtext: 'Связаться с нами',
        sublink: '/feedback',
        subtype: 'menu-link',
        operationType: 'button',
      },
    ],
  },
];

const HeaderMenu = ({ type, projects }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openFeedback());
  };

  const params = useMemo(() => {
    const setParams = {
      classMenu: type === 'sub' ? styles.menuSub : styles.menuTop,
    };

    return setParams;
  }, [type]);

  useMemo(() => {
    const arr = [];
    if (projects) {
      projects.forEach((element) => {
        arr.push({
          subtext: element.name, sublink: element.link, subtype: 'submenu-link', newWindow: element.newWindow,
        });
      });
    }

    menuTop.forEach((item) => {
      if (item.text === 'Проекты') {
        item.subitems = arr;
      }
    });
  }, [projects]);

  const formingMenuTop = () => {
    const content = menuTop.map((item, index) => {
      /* eslint-disable max-len */
      if (index < 3) return <MenuLink key={item.link + index} link={item.link} type={item.type}>{item.text}</MenuLink>;

      return <OpenMenuItem onClick={openModal} key={item.link + index} item={item} />;
    });
    return content;
  };

  const formingMenuSub = () => {
    const content = menuSub.map((item, index) => (
      <div key={item.link} className={styles.item}>
        {item.operationType !== 'button' ? <MenuLink link={item.link} type={item.type}>{item.text}</MenuLink> : <button className={styles.subitemsButton} type="button" onClick={openModal}>{item.text}</button>}
        {item.status && (
          <div className={styles.subitems}>
            {item.subitems.map((
              {
                subtext, sublink, subtype, operationType,
              }, i,
            ) => (
              operationType && operationType === 'button' ? <button className={styles.subitemsButton} type="button" onClick={openModal}>{subtext}</button>
                : (
                  <MenuLink newWindow={item.newWindow} key={item.link + index + i} link={sublink} type={subtype}>
                    {subtext}
                  </MenuLink>
                )
            ))}
          </div>
        )}
      </div>
    ));
    return content;
  };

  return (
    <div className={`${styles.menu__items} ${params.classMenu}`}>
      {type === 'top' ? formingMenuTop() : formingMenuSub()}
      {type === 'sub' && (
        <div className={styles.social}>
          <SocialIconsList contrast />
        </div>
      )}
    </div>
  );
};

HeaderMenu.propTypes = {
  type: string.isRequired,
  projects: shape({}),
};

HeaderMenu.defaultProps = {
  projects: null,
};

export default HeaderMenu;
