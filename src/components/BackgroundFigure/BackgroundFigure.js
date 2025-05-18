import React from 'react';
import styles from './BackgroundFigure.module.scss';

import topBackgroundFigure from '../../images/figure/figure_group_top.webp';
import middleBackgroundFigure from '../../images/figure/figure_group_middle.webp';
import bottomBackgroundFigure from '../../images/figure/figure_group_bottom.webp';

const BackgroundFigure = () => (
  <div className={styles.wrapper}>
    <img src={topBackgroundFigure} alt="img" className={styles.topFigure} />
    <img src={middleBackgroundFigure} alt="img" className={styles.middleFigure} />
    <img src={bottomBackgroundFigure} alt="img" className={styles.bottomFigure} />
  </div>
);

export default BackgroundFigure;
