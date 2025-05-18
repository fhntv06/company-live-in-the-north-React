import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import VisibleWrapper from '../../../components/VisibleWrapper/VisibleWrapper';
import styles from './DiscussionDescription.module.scss';

const text = 'Принимая участие в круговороте идей на нашем портале, вы не только делаете регион лучше, но и получаете YAMALCOIN';

const DiscussionDescription = () => {
  const navigate = useNavigate();
  const changeNavigate = () => {
    navigate('/bonus-program', { replace: true });
  };
  return (
    <div className={`${styles.wrapper} ${styles.row}`}>
      <VisibleWrapper className={styles.containerText} overflow roundCorners>
        <p className={styles.text}>{text}</p>
        <div className={styles.button}>
          <Button typeButton="button-white" className={styles.buttonWhiteLayer} onClick={changeNavigate}>
            <div className={styles.buttonContent}>
              <Icon name="yamal-coin-circle" />
              <span>подробнее о программе</span>
            </div>
          </Button>
        </div>
      </VisibleWrapper>
    </div>
  );
};

export default DiscussionDescription;
