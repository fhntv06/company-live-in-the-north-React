import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import BonusCard from '../BonusCard/BonusCard';
import SpecialCard from '../SpecialCard/SpecialCard';

import styles from './AfishaSpecialOffersSlider.module.scss';
import GridSlider from '../Slider/GridSlider';

const cards = [
  {
    id: 1,
    type: 'bonuses',
    typeTitle: 'Бонусная программа',
    title: 'Бонусы за активности',
    description: 'Покупайте билеты, посещайте мероприятия, получайте удовольствие и бонусы.',
    url: '/bonus-program',
  },
  {
    id: 2,
    type: 'special',
    addShapes: true,
    icon: 'telegram_special',
    children: 'Будьте в курсе всего — подпишитесь на телеграм-бота',
    url: 'https://t.me/AfishaYanaoBot',
  },
  {
    id: 3,
    type: 'special',
    addShapes: false,
    icon: null,
    balance: 20,
    children: 'Поделитесь мнением — оставьте отзыв о событии',
  },
];

const AfishaSpecialOffersSlider = ({ titleClassName }) => (
  <div className={styles.wrapper}>
    <h2 className={classnames(styles.title, titleClassName)}>Специальные предложения</h2>
    <GridSlider
      withoutIndents
      className={styles.slider}
    >
      {cards.map((card, index) => (
        index === 0 ? (
          <BonusCard
            typeTitle={cards[0].typeTitle}
            title={cards[0].title}
            className={styles.slide}
            link={cards[0].url}
          />
        ) : (
          <SpecialCard
            addShapes={card.addShapes}
            icon={card.icon}
            balance={card.balance}
            className={styles.slide}
            link={card.url}
          >
            {card.children}
          </SpecialCard>
        )
      ))}
    </GridSlider>
  </div>
);

AfishaSpecialOffersSlider.propTypes = {
  titleClassName: PropTypes.string,
};

AfishaSpecialOffersSlider.defaultProps = {
  titleClassName: '',
};

export default AfishaSpecialOffersSlider;
