import React, { useEffect, useState, useRef } from 'react';
import styles from './GiveawayPage.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';
import TimeCard from '../../components/TimeCard/TimeCard';
import TagMark from '../../components/Tags/Tag';
import SearchInput from '../../components/Inputs/SearchInput/SearchInput';
import GiveawayCard from '../../components/GiveawayCard/GiveawayCard';
import laptopImg from '../../images/giveaway_items/laptop.png';
import phoneImg from '../../images/giveaway_items/phone.png';
import smartwatchImg from '../../images/giveaway_items/smartwatch.png';
import Button from '../../components/Button/Button';
import Seo from '../../components/Seo/Seo';

const data = {
  tag: 'Викторина',
  winnerCount: 6500,
  winners: [
    {
      id: 123456,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123457,
      name: 'смартфон', // e.g. iPhone 14 Pro Max
      category: 'смартфон',
      image: phoneImg,
    },
    {
      id: 123458,
      name: 'смартчасы', // e.g. Apple Watch Series 9
      category: 'смартчасы',
      image: smartwatchImg,
    },
    {
      id: 123459,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123460,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123461,
      name: 'смартфон', // e.g. iPhone 14 Pro Max
      category: 'смартфон',
      image: phoneImg,
    },
    {
      id: 123462,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123463,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123464,
      name: 'смартчасы', // e.g. Apple Watch Series 9
      category: 'смартчасы',
      image: smartwatchImg,
    },
    {
      id: 123465,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123466,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123467,
      name: 'смартфон', // e.g. iPhone 14 Pro Max
      category: 'смартфон',
      image: phoneImg,
    },
    {
      id: 123468,
      name: 'смартчасы', // e.g. Apple Watch Series 9
      category: 'смартчасы',
      image: smartwatchImg,
    },
    {
      id: 123469,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123470,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123471,
      name: 'ноутбук', // e.g. MacBook Air
      category: 'ноутбук',
      image: laptopImg,
    },
    {
      id: 123472,
      name: 'смартфон', // e.g. iPhone 14 Pro Max
      category: 'смартфон',
      image: phoneImg,
    },
    {
      id: 123473,
      name: 'смартчасы', // e.g. Apple Watch Series 9
      category: 'смартчасы',
      image: smartwatchImg,
    },
  ],
};

const GiveawayPage = () => {
  const [showCounter, setShowCounter] = useState(15);
  const [allCards] = useState(data.winners);
  const [slicedCards, setSlicedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const filteredData = allCards.filter(
      (card) => card.id.toString().includes(searchInputValue),
    );

    setSlicedCards(filteredData);
    setFilteredCards(filteredData.slice(0, showCounter));
    isFirstRender.current = false;
  }, [showCounter, searchInputValue, allCards, isFirstRender.current]);

  const showMoreHandler = () => {
    setShowCounter((prevCounter) => prevCounter + 15);
  };

  const searchInputChangeHandler = (value) => {
    setSearchInputValue(value);
    setShowCounter(15);
  };

  const clearSearchInputHandler = () => {
    setSearchInputValue('');
  };

  return (
    <>
      <Seo title="Результаты | Живём на севере" description="Живём на севере" />
      <PageHeader
        compact
        withoutOffset
        withoutControls
        className={styles.header}
      >
        <div className={styles.headerWrapper}>
          <div className={styles.topRow}>
            <div className={styles.tagWrapper}>
              <TagMark
                className={styles.tagMark}
                type="mark"
              >
                {data.tag}
              </TagMark>
              <p className={styles.winnerCount}>
                {data.winnerCount}
                {' '}
                <span>победителей</span>
              </p>

            </div>
          </div>
          <div className={styles.headerContentWrapper}>
            <div className={styles.timeCardWrapper}>
              <TimeCard
                fromDate={new Date()}
                text="Результаты викторины"
                className={styles.timeCard}
              />
            </div>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Ищи себя среди победителей</h1>
              <div className={styles.searchWrapper}>
                <div className={`${styles.inputField} input-field`}>
                  <SearchInput
                    value={searchInputValue}
                    onChange={searchInputChangeHandler}
                    onClear={clearSearchInputHandler}
                    placeholder="Введите ваш номер"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHeader>
      <main className={styles.main}>
        {!filteredCards.length && !isFirstRender.current && (
        <div className={styles.notFoundWrapper}>
          <h5 className={styles.notFoundTitle}>
            К сожалению, номера по вашему запросу не найдено.
          </h5>
        </div>
        )}
        {filteredCards.length > 0
        && (
        <>
          <div className={styles.cards}>
            {filteredCards.map((winner) => <GiveawayCard data={winner} slideInAnimation />)}
          </div>
          {slicedCards.length > 15 && filteredCards.length < 16 && (
          <div className={styles.moreBtnWrapper}>
            <Button
              typeButton="button"
              className={styles.moreBtn}
              onClick={showMoreHandler}
            >
              Показать больше
            </Button>
          </div>
          )}
        </>
        )}
      </main>
    </>
  );
};

export default GiveawayPage;
