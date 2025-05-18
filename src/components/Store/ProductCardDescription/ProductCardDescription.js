import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Spoiler from '../../Spoiler/Spoiler';
import styles from './ProductCardDescription.module.scss';

const ProductCardDescription = ({ description, attributes }) => (
  <>
    {description && (
      <div className={styles.card}>
        <p className={styles.cardTitle}>Описание</p>
        <Spoiler
          maxLines={3}
          moreButtonText="Развернуть"
        >
          <div className={styles.description}>{parse(description)}</div>
        </Spoiler>
      </div>
    )}
    { attributes.length > 0 && (
      <div className={styles.card}>
        <Spoiler
          maxLines={3}
          moreButtonText="Развернуть"
        >
          <ul className={styles.attributesList}>
            {attributes.map((item) => (
              <li className={styles.attribute}>
                <span className={styles.attributeName}>{item.attributeName}</span>
                <span className={styles.attributeValue}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Spoiler>
      </div>
    )}
  </>
);

ProductCardDescription.propTypes = {
  description: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
};

ProductCardDescription.defaultProps = {
  attributes: [],
};

export default ProductCardDescription;
