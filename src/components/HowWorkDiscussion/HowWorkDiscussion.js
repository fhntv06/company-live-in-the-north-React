import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import styles from './HowWorkDiscussion.module.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import ModalCloseButton from '../Modal/ModalCloseButton';

const HowWorkDiscussion = ({ isOpen, onClose }) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.left}>
        <h4 className={styles.title}>
          Как устроены обсуждения
          <ModalCloseButton onClick={onClose} className={styles.closeButton} />
        </h4>
        <p className={styles.text}>
          При помощи обсуждений жители Ямала напрямую участвуют в жизни
          муниципалитетов, влияют на принимаемые решения
        </p>
      </div>
      <div className={styles.info}>
        <div className={styles.topRow}>
          <h5 className={styles.title}>Обсуждения проходят в 3 этапа:</h5>
          <div className={classnames(styles.yamalCoinDesktopWrapper)}>
            <span
              className={classnames({ [styles.yamalCoinMobileText]: isMobile })}
            >
              YAMALCOIN
            </span>
            <div className={styles.yamalIconWrapper}>
              <Icon name="yamal-coin" className={styles.svgCoin} />
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.header}>
            1. Муниципалитеты задают темы и собирают идеи
          </div>
          <p className={styles.text}>
            Пользователи сайта предлагают свои идеи и инициативы в рамках
            заданной темы, оценивают предложения других
          </p>
          <div className={styles.header}>
            2. Лучшие идеи допускаются до голосования
          </div>
          <p className={styles.text}>
            Участники сообщества голосуют за понравившуюся идею
          </p>
          <div className={styles.header}>
            3. Идея-победитель воплощается в жизнь
          </div>
        </div>
        <div className={styles.right}>
          <div className={classnames(styles.row, styles.headerRow)}>
            <span
              className={classnames({ [styles.yamalCoinMobileText]: isMobile })}
            >
              YAMALCOIN
            </span>
            <div className={styles.yamalIconWrapper}>
              <Icon name="yamal-coin" className={styles.svgCoin} />
            </div>
          </div>
          <div className={styles.row}>
            <span>Подать идею</span>
            <span>+20</span>
          </div>
          <div className={styles.row}>
            <span>Оценить чужую идею</span>
            <span>+10</span>
          </div>
          <div className={styles.row}>
            <span>Проголосовать</span>
            <span>+50</span>
          </div>
          <div className={styles.row}>
            <span>Стать автором победившей идеи</span>
            <span>+150</span>
          </div>
        </div>
        {isMobile && (
          <div className={styles.btnWrapper}>
            <Button typeButton="button">узнать больше</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

HowWorkDiscussion.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
HowWorkDiscussion.defaultProps = {
  isOpen: false,
};

export default HowWorkDiscussion;
