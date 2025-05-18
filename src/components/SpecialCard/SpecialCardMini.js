import React from 'react';

import PropTypes, {
  number, shape, string,
} from 'prop-types';

import Wallet from '../Wallet/Wallet';

import styles from './SpecialCard.module.scss';

const SpecialCardMini = ({ className, data }) => (
  <div className={`${styles.cardMini} ${className}`}>
    <p>
      {data.title}
    </p>
    <div>
      <Wallet className={styles.wallet} balance={data.count} />
    </div>
  </div>
);

SpecialCardMini.propTypes = {
  className: PropTypes.string,
  data: shape({
    title: string,
    count: number,
  }).isRequired,
};

SpecialCardMini.defaultProps = {
  className: '',
};

export default SpecialCardMini;
