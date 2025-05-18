import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import plural from 'plural-ru';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTile from '../../components/Profile/ProfileTile/ProfileTile';
import Icon from '../../components/Icon/Icon';
import { GradientLight, GradientViolet } from '../../helpers/gradients';
import styles from './ProfilePage.module.scss';
import Qr from '../../components/Profile/Qr/Qr';
import AllEvents from '../../components/AllEvents/AllEvents';
import UserInfo from '../../components/UserInfo/UserInfo';
import Button from '../../components/Button/Button';
import Wallet from '../../components/Wallet/Wallet';
import ShareModal from '../../components/ShareModal/ShareModal';
import DiscussionCard from '../../components/Discussion/DiscussionCard/DiscussionCard';
import useMediaQuery from '../../hooks/useMediaQuery';
import { normalizeCost } from '../../helpers/format';
import useModal from '../../hooks/useModal';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal';
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';
import { logoutAction, getUser, getIsAuth } from '../../features/Auth/authSlice';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import { useGetAllDiscussionsByUserQuery } from '../../services/discussionApi';
import { useGetAllvotingsByUserQuery } from '../../services/votesApi';
import { useGetCartQuery, useGetOrdersQuery, useGetUserCareWishesQuery } from '../../services/profileApi';
import { useGetCareExecutionsQuery } from '../../services/xmasTreeApi';
import { getUnreadCounter } from '../../features/Notification/notificationSlice';
import QRModal from '../../components/QRModal/QRModal';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import getOrderOptions from '../../helpers/getOrderOptions';
import filterOrders from '../../helpers/filterOrders';
import CareOfTreeBanner from '../../components/CareOfTreeBanner/CareOfTreeBanner';

const ProfilePage = () => {
  const isMobile = useMediaQuery('(max-width: 757px)');
  const isMedium = useMediaQuery('(max-width: 1023px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(getUser);
  const limit = 2;

  const { data: discussion } = useGetAllDiscussionsByUserQuery({ limit });
  const { data: votes } = useGetAllvotingsByUserQuery({ limit });
  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isFetching: isFetchingOrders,
  } = useGetOrdersQuery();
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const unreadNotifications = useSelector((state) => getUnreadCounter(state.notification));

  const {
    isOpen: isShareModalOpen, openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  const {
    isOpen: isFeedbackModalOpen, openModalHandler: openFeedbackModalHandler,
    closeModalHandler: closeFeedbackModalHandler,
  } = useModal();

  const { data: cart } = useGetCartQuery(undefined, {
    skip: !isAuth,
  });
  const {
    isOpen: isQRModalOpen, openModalHandler: openQRModalHandler,
    closeModalHandler: closeQRModalHandler,
  } = useModal();

  const {
    isOpen: isSubscribeModalOpen, openModalHandler: openSubscribeModalHandler,
    closeModalHandler: closeSubscribeModalHandler,
  } = useModal();

  const [filteredOrders, setFilteredOrders] = useState(null);
  const [orderOptions, setOrderOptions] = useState(null);

  useEffect(() => {
    const newOrders = filterOrders(ordersData?.orders);

    setFilteredOrders(newOrders);
    setOrderOptions(getOrderOptions(newOrders));
  }, [ordersData]);

  const sliceCount = isMedium ? (isMobile ? 1 : 2) : 4;

  const dataActivities = discussion && votes
    ? [...discussion, ...votes].slice(0, sliceCount)
    : [];

  const { data: care } = useGetUserCareWishesQuery();

  const { data: execution } = useGetCareExecutionsQuery();

  const cartCountString = plural(cart ? cart?.totalCount : 'нет', '%d товар', '%d товара', '%d товаров');

  const onLogaut = async () => {
    dispatch(logoutAction());
    navigate('/sign-in', { replace: true });
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in', { replace: true });
    }
  }, [isAuth]);

  if (isLoadingOrders || isFetchingOrders) {
    return <MainPreloader />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Мой кабинет</h1>
          <NavLink to="notifications" className={styles.bell}>
            <Icon name="bell" className={styles.bellIcon} />
            {unreadNotifications > 0 && (
              <span className={styles.notifications}>{unreadNotifications}</span>
            )}
          </NavLink>
        </div>
        {!isMobile && (
          <div className={styles.headerButtons}>
            <Button
              onClick={openSubscribeModalHandler}
              typeButton="button-white"
              className={styles.subscribeButton}
            >
              подписаться на рассылку
            </Button>
            <Button typeButton="button" onClick={openFeedbackModalHandler}>
              Обратная связь
            </Button>
          </div>
        )}
      </div>
      <VisibleWrapper className={styles.profileInfoContainer}>
        <div className={styles.profileMainInfo}>
          <UserInfo data={userProfile} onClick={onLogaut} />
          {!isMobile && (
          <Button
            className={styles.inviteButton}
            typeButton="button"
            onClick={openShareModalHandler}
          >
            Пригласить друга
            <Wallet
              needPlus
              balance={1000}
              clickabel={false}
              className={styles.wallet}
            />
          </Button>
          )}
        </div>
        <div className={styles.tiles}>
          <ProfileTile
            to={!orderOptions?.withoutLink ? 'orders' : null}
            tileName="Мои заказы"
            title={orderOptions?.title}
            additionalText={orderOptions?.additionalText}
            className={styles.tile}
            icon={orderOptions?.showIcon && (
              <Icon
                name="order-box"
                className={styles.icon}
                fill="url(#order-box-gradient)"
              >
                {GradientViolet(
                  'order-box-gradient',
                  27.6637,
                  4.78157,
                  3.99999,
                  3.99999,
                )}
              </Icon>
            )}
          >
            {filteredOrders?.ready?.length > 0 && <Qr onClick={openQRModalHandler} />}
          </ProfileTile>
          <ProfileTile
            to="/cart"
            tileName="Корзина"
            title={cartCountString}
            gray
            className={styles.tile}
            icon={(
              <Icon className={styles.icon} name="basket" fill="url(#paint0_linear_2802_31622)">
                {GradientLight('paint0_linear_2802_31622', 27.3327, 0.666016, 0, -3.26179e-09)}
              </Icon>
              )}
          />
          <div className={styles.tileWithLink}>
            <ProfileTile
              to="bonus-history"
              tileName="Мои бонусы"
              additionalText="Ваша история начислений"
              additionalTextHide={isMobile}
              title={normalizeCost(userProfile.bonusCount)}
              className={styles.tile}
              icon={(
                <Icon name="coin" className={styles.icon} fill="url(#coin-gradient)">
                  {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
                </Icon>
                )}
            />
            {!isMobile && (
            <AllEvents href="/bonus-program" text={'Подробнее\nо\u00A0программе'} className={styles.bigButton} />
            )}
          </div>
          <ProfileTile
            to="favorites"
            title="Избранное"
            className={styles.tile}
            icon={(
              <Icon className={classnames(styles.icon, styles.booksmarkIcon)} name="booksmark" stroke="url(#booksmark-gradient)">
                {GradientViolet('booksmark-gradient', 12.8696, 3.32598, 0.999995, 0.999995)}
              </Icon>
              )}
          />
        </div>
      </VisibleWrapper>
      {care && care.length > 0 && (
        <div className={styles.bannerWrapper}>
          <div className={styles.banner}>
            <CareOfTreeBanner care={care} execution={execution} />
          </div>
        </div>
      )}
      {dataActivities && dataActivities.length > 0 && (
      <div className={styles.activities}>
        <h2 className={styles.activityTitle}>Мои активности</h2>
        <div className={styles.activitiesList}>
          {dataActivities.map((item) => (
            <DiscussionCard
              key={item.id}
              isActivity
              type={(!item.voteAnswerGroups || !item.voteAnswers) ? 'discussion' : 'voting'}
              className={classnames(
                styles.activityCard,
                { [styles.withBorder]: !item.voteAnswerGroups || !item.voteAnswers },
              )}
              data={item}
            />
          ))}
          <div className={styles.moreButtonWrapper}>
            <Link
              to="activities"
              className={styles.moreButton}
            >
              смотреть все
            </Link>
          </div>
        </div>
      </div>
      )}

      {isMobile && (
        <div className={styles.mobileButtons}>
          <button type="button" onClick={openSubscribeModalHandler} className={styles.mobileButton}>
            <span>Подписаться на рассылку</span>
            <span>
              <Icon name="chevron" className={styles.chevron} />
            </span>
          </button>
          <button type="button" className={styles.mobileButton} onClick={openFeedbackModalHandler}>
            <span>
              <Icon name="chat" className={styles.icon} fill="url(#chat-gradient)">
                {GradientLight('chat-gradient', 24, 0, 0.400391, 0.400391)}
              </Icon>
              Обратная связь
            </span>
          </button>
          <Link className={styles.mobileButton} to="/bonus-program">
            <span>
              <Icon name="coin" className={styles.icon} fill="url(#coin-gradient)">
                {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
              </Icon>
              Бонусная программа
            </span>
            <span>
              <Icon name="chevron" className={styles.chevron} />
            </span>
          </Link>
          <button type="button" className={styles.mobileButton} onClick={openShareModalHandler}>
            <span>Пригласить друга</span>
            <span>
              <Wallet
                needPlus
                balance={1000}
                clickabel={false}
                className={styles.wallet}
              />
            </span>
          </button>
          <button type="button" className={styles.mobileButton} onClick={onLogaut}>
            <span>
              Выйти
            </span>
          </button>
        </div>
      )}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={closeShareModalHandler}
        title="Это ваша персональная ссылка"
        description="Отправьте её другу и получите 1000 баллов после его регистрации и подтверждения электронной почты на портале."
        link={`${window.location.origin}/sign-up?referralCode=${userProfile.referralCode}`}
      />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModalHandler} />
      <SubscribeModal isOpen={isSubscribeModalOpen} onClose={closeSubscribeModalHandler} />
      <QRModal
        isOpen={isQRModalOpen}
        onClose={closeQRModalHandler}
        data={filteredOrders?.ready.at(0)}
        isLoading={isLoadingOrders || isFetchingOrders}
      />
    </div>
  );
};

export default ProfilePage;
