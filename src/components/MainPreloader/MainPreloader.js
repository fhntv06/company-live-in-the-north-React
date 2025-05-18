import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './MainPreloader.module.scss';

const MainPreloader = () => (
  <>
    <div className={styles.wrapper} />
    <div className={styles.snowflakes}>
      <div className={classnames(
        styles.snowflakeWrapper,
        styles.snowflakeWrapper1,
      )}
      >
        <Icon
          name="snowflake"
          className={classnames(
            styles.snowflake,
            styles.snowflake1,
          )}
        />
      </div>
      <div className={classnames(
        styles.snowflakeWrapper,
        styles.snowflakeWrapper2,
      )}
      >
        <Icon
          name="snowflake"
          className={classnames(
            styles.snowflake,
            styles.snowflake2,
          )}
        />
      </div>
      <div className={classnames(
        styles.snowflakeWrapper,
        styles.snowflakeWrapper3,
      )}
      >
        <Icon
          name="snowflake"
          className={classnames(
            styles.snowflake,
            styles.snowflake3,
          )}
        />
      </div>
      <div className={classnames(
        styles.snowflakeWrapper,
        styles.snowflakeWrapper4,
      )}
      >
        <Icon
          name="snowflake"
          className={classnames(
            styles.snowflake,
            styles.snowflake4,
          )}
        />
      </div>
    </div>
  </>
);

export default MainPreloader;
