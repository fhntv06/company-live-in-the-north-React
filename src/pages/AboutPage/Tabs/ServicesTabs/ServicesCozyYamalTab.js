/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TabWrapper from '../TabWrapper';
import styles from './ServicesCozyYamalTab.module.scss';
import Button from '../../../../components/Button/Button';
import { useGetCozyYamalQuery } from '../../../../services/cozyYamalSlice';

const ServicesCozyYamalTab = () => {
  const navigate = useNavigate();

  const { data } = useGetCozyYamalQuery();

  console.log(data);

  return (
    <TabWrapper>
      <div className={styles.info}>
        <h3 className={styles.title}>
          Благодаря сервису «Уютный Ямал» вы можете предложить любую идею по улучшению региона.
        </h3>
        <p className={styles.infoText}>
          Лучшим по итогам четырёх этапов идеям будут выделены деньги из регионального бюджета.
        </p>
      </div>
      {/* <div className={styles.cards}>
        Cards
      </div> */}
      <div className={styles.actions}>
        <Button
          typeButton="button"
          className={styles.button}
          onClick={() => {
            navigate('/cozy-yamal');
          }}
        >
          Уютный ямал
        </Button>
      </div>
    </TabWrapper>
  );
};

export default ServicesCozyYamalTab;
