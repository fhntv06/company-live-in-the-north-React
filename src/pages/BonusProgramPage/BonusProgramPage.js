import React from 'react';

import { useSelector } from 'react-redux';

import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileTile from '../../components/Profile/ProfileTile/ProfileTile';
import SliderShop from '../../components/SliderShop/SliderShop';
import Icon from '../../components/Icon/Icon';
import BonusProgramFaq from './BonusProgramFaq';
import SpecialCardMini from '../../components/SpecialCard/SpecialCardMini';

import { normalizeCost } from '../../helpers/format';
import { GradientLight } from '../../helpers/gradients';

// import { fetchProducts, selectAllProducts } from '../../features/Products/productsSlice';
import { getUser } from '../../features/Auth/authSlice';
import { useGetAllProductsQuery } from '../../services/storeApi';

import styles from './BonusProgramPage.module.scss';
import DocumentLink from '../../components/Documents/DocumentLink';
import Seo from '../../components/Seo/Seo';

const specialCards = [
  {
    id: 1,
    title: 'Подать идею',
    count: 20,
  },
  {
    id: 2,
    title: 'Оценить чужую идею',
    count: 10,
  },
  {
    id: 3,
    title: 'Проголосовать',
    count: 50,
  },
  {
    id: 4,
    title: 'Стать автором победившей идеи',
    count: 150,
  },
];

const BonusProgramPage = () => {
  const limit = 6;
  const user = useSelector(getUser);
  const {
    data: products,
  } = useGetAllProductsQuery({
    limit,
  });

  return (
    <>
      <Seo title={'Бонусная программа | Живём на севере'} description={'Совершая действия на портале "Живём на Севере" вы зарабатываете бонусные баллы "YAMALCOIN"ы'} />
      <PageHeader
        withoutControls
        compact
        withoutBackLink
      >
        <h1 className={styles.title}>Бонусная программа</h1>
      </PageHeader>
      <div className={styles.pageContainer}>
        <div className={styles.info}>
          <p className={styles.infoLeft}>
            Совершая действия на&nbsp;портале &laquo;Живём на&nbsp;Севере&raquo;
            вы&nbsp;зарабатываете бонусные баллы&nbsp;&mdash; YAMALCOIN&rsquo;ы
          </p>
          <div className={styles.infoCenter}>
            <Icon name="coin" className={styles.icon} fill="url(#coin-gradient)">
              {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
            </Icon>
            <p>
              Баллы начисляются за&nbsp;идеи, участие в&nbsp;голосованиях и&nbsp;
              обсуждениях, отзывы и&nbsp;другие активности.
              <p>&nbsp;</p>
              Потратить YAMALCOIN можно в&nbsp;магазине на&nbsp;сувенирную продукцию,
              а&nbsp;также воспользоваться предложениями от&nbsp;наших партнёров.
            </p>
          </div>
          {user && (
          <div className={styles.infoRight}>
            <ProfileTile
              to="/profile/bonus-history"
              tileName="Мои бонусы"
              title={user.bonusCount && normalizeCost(user?.bonusCount)}
              className={styles.tile}
              icon={(
                <Icon name="coin" className={styles.tileIcon} fill="url(#coin-gradient)">
                  {GradientLight('coin-gradient', 2.00781, 22.0078, 1.99805, 1.99805)}
                </Icon>
              )}
            />
          </div>
          )}
        </div>
        <div className={styles.pageContent}>
          <div className={styles.earn}>
            <div className={styles.earnTop}>
              <h2 className={styles.earnTitle}>Как заработать бонусы</h2>
              <DocumentLink href={`${process.env.PUBLIC_URL}/Бонусная программа.pdf`} className={styles.doc} openInNewTab />
            </div>
            <div className={styles.cards}>
              {
                specialCards.map((card) => (
                  <SpecialCardMini
                    key={card.id}
                    className={styles.card}
                    data={card}
                  />
                ))
              }
            </div>
          </div>
          {products && products.data.length > 0 && (
          <SliderShop
            className={styles.sliderProducts}
            products={products.data}
            title="На что потратить"
          />
          )}
        </div>
        <BonusProgramFaq />
      </div>
    </>
  );
};

export default BonusProgramPage;
