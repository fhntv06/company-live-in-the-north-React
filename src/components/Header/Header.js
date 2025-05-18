/* eslint-disable max-len */
import React, {
  useEffect, createRef, useState,
} from 'react';
import {
  bool,
} from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import Logo from '../../logo.svg';
import Icon from '../Icon/Icon';
import HeaderMenu from './Menu/Menu';
import MunicipalityDropdown from '../MunicipalityDropdown/MunicipalityDropdown';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import Wallet from '../Wallet/Wallet';
import MenuLink from '../MenuLink/MenuLink';
import Button from '../Button/Button';
import ProjectCardBig from '../ProjectsCard/ProjectCardBig/ProjectCardBig';
import ProjectCard from '../ProjectsCard/ProjectCard/ProjectCard';
import SocialIconsList from '../SocialIconsList/SocialIconsList';
import { GradientViolet } from '../../helpers/gradients';
import { getIsAuth, getUser } from '../../features/Auth/authSlice';
import styles from './Header.module.scss';
import BasketLink from '../BasketLink/BasketLink';
import MakeagencyLink from '../MakeagencyLink/MakeagencyLink';
import {
  useGetCartQuery,
  useGetUserAllFavoritesQuery,
} from '../../services/profileApi';
import PushNotification from '../PushNotification/PushNotification';
import useHandleNotifications from '../../hooks/useHandleNotifications';
import { getUnreadCounter } from '../../features/Notification/notificationSlice';
import overlayBg from '../../images/modal-bg-min.jpg';
import { useGetMenuProjectsQuery } from '../../services/menuProjects';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ProfileGradient } from '../BottomMenuMobile/BottomMenuIcons';

const Header = ({
  needBasket,
}) => {
  const headerRef = createRef();
  const searchRef = createRef();
  const [scroll, setScroll] = useState(false);
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedOnSearch, setOpenedOnSearch] = useState(false);
  const location = useLocation();
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const unreadCounter = useSelector((state) => getUnreadCounter(state.notification));

  useGetUserAllFavoritesQuery(undefined, { skip: !isAuth });

  useHandleNotifications();
  const user = useSelector(getUser);

  const { data: cart, isSuccess } = useGetCartQuery(undefined, {
    skip: !isAuth,
  });

  const { data: menuCards } = useGetMenuProjectsQuery();
  const isTiny = useMediaQuery('(max-width: 360px)');
  const isSmall = useMediaQuery('(max-width: 750px)');

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY > 0 && scroll !== 'scroll') {
        setScroll(styles.scroll);
      } else {
        setScroll('');
      }
    };
    window.addEventListener('scroll', () => {
      checkScrollPosition();
    });
    return () => window.removeEventListener('scroll', () => checkScrollPosition());
  }, []);

  useEffect(() => {
    if (focus && open) {
      searchRef?.current.focus();
    } else {
      searchRef?.current.blur();
    }
  }, [focus, open]);

  useEffect(() => {
    if (open) {
      disableBodyScroll(headerRef.current);
    } else {
      enableBodyScroll(headerRef.current);
      setOpenedOnSearch(false);
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handler = (state) => {
    if (state) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    setFocus(state);
  };

  const headerClasses = classnames(
    styles.wrapper,
    {
      [styles.open]: open,
      [styles.openedOnSearch]: openedOnSearch,
      [styles.mobileMenuPage]: location.pathname === '/menu',
    },
  );

  const openOnSearchClickHandler = () => {
    handler(true);
    setOpenedOnSearch(true);
  };

  return (
    <div className={headerClasses}>
      <div ref={headerRef} className={`${styles.header} ${scroll}`}>
        <div className={styles.headerTop}>
          <div className={styles.logoWrapper}>
            <Link className={styles.logo} to="/">
              <img src={Logo} alt="Logo" />
              <div className={styles.logoText}>Живём на&nbsp;севере</div>
            </Link>
          </div>
          <div className={styles.menuLinks}>
            <div className={styles.menuIcons}>
              <Button
                className={styles.buttonSearch}
                onClick={openOnSearchClickHandler}
              >
                <Icon className={styles.icon} name="search" />
              </Button>
              <Button
                className={styles.burger}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <div className={styles.burger__line} />
              </Button>
            </div>
            <div className={styles.links}>
              <HeaderMenu projects={menuCards} type="top" />
            </div>
          </div>
          <div className={classnames(
            styles.headerProfileData,
            { [styles.headerProfileNotAuth]: !isAuth },
          )}
          >
            <div className={`${styles.select__button} select__button`}>
              <MunicipalityDropdown />
            </div>
            {isAuth && (
            <MenuLink to="profile/favorites" className={styles.favourites} type="link">
              <Icon name="shortcut" className={styles.icon} fill="none" stroke="url(#shortcut-header-gradient)">
                {GradientViolet('shortcut-header-gradient', 12.8696, 3.32598, 0.999995, 0.999995)}
              </Icon>
              <p>Избранное</p>
            </MenuLink>
            )}

            <div className={classnames(
              styles.menuIconsMobile,
              { [styles.hiddenSearchButton]: isTiny && isSuccess && cart.products.length > 0 },
            )}
            >
              <Button
                className={styles.buttonSearch}
                onClick={openOnSearchClickHandler}
              >
                <Icon className={styles.icon} name="search" />
              </Button>
            </div>
            {!isAuth && !isSmall && (
              <MenuLink to="/sign-in" className={styles.login} type="link">
                <ProfileGradient className={styles.icon} />
                <p>Войти</p>
              </MenuLink>
            )}
            {needBasket && (isSuccess && cart.products.length > 0) && (
              <BasketLink count={cart.totalCount} className={styles.basket} />
            )}
            {isAuth && (
              <>
                <Link className={styles.wallet} to="/profile/bonus-history">
                  <Wallet
                    needPlus={false}
                    balance={user && user?.bonusCount}
                    animateOnChange
                  />
                </Link>
                <div className={styles.avatar}>
                  <Avatar
                    href="/profile"
                    name={user?.firstName}
                    surname={user?.surname}
                    avatar={user?.avatar?.url}
                  />
                  <div className={classnames(
                    styles.redDot,
                    { [styles.visible]: unreadCounter },
                  )}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.headerDropdown}>
          <div className={styles.dropdownTop}>
            <div className={`input-field ${styles.search}`}>
              <Search
                ref={searchRef}
                focus={focus}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                menuIsOpen={open}
              />
            </div>
            <div className={styles.buttonClose}>
              <Button
                typeButton="button-close"
                onClick={() => handler(false)}
              />
            </div>
          </div>
          <div className={styles.dropdownContent}>
            <HeaderMenu projects={menuCards} type="sub" />
            <div className={styles.contentCardsWrapper}>
              <div className={styles.contentCards}>
                <ProjectCardBig data={menuCards && menuCards[0]} />
                <div className={styles.cardsSmall}>
                  {/* eslint-disable max-len */}
                  {menuCards && menuCards.slice(0, 5).map((item, index) => index > 0 && <ProjectCard key={item.id + Math.random()} data={item} />)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.social}>
            <SocialIconsList contrast iconClassName={styles.socialSvg} />
          </div>
          <div className={styles.contacts}>
            <span className={styles.email}>info@nasevere.live</span>
            <span className={styles.address}>г. Салехард, ул. имени Василия Подшибякина, д. 25 А, </span>
            <span className={styles.organization}>Ассоциация «Совет муниципальных образований Ямало-Ненецкого автономного округа»</span>
          </div>
          { open && <MakeagencyLink className={styles.makeLink} /> }
        </div>
        <PushNotification
          className={styles.notifications}
        />
      </div>
      <button
        className={styles.background}
        style={{ backgroundImage: `url(${overlayBg})` }}
        onClick={() => handler(false)}
        label="background"
        type="button"
      />
    </div>
  );
};

Header.propTypes = {
  needBasket: bool,
};

Header.defaultProps = {
  needBasket: false,
};

export default Header;
