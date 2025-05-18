import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parseHtml from 'html-react-parser';
import styles from './SearchHint.module.scss';

const SearchHint = ({
  name, info, page, href, image,
}) => (
  <Link to={href} className={styles.card}>
    <div className={styles.wrapper}>
      <p className={styles.name}>{name}</p>
      <div className={styles.info}>
        {image && <img src={image} alt={name} className={styles.img} />}
        <div className={styles.textBlock}>
          {info && <p className={styles.text}>{parseHtml(info)}</p>}
          <span className={styles.page}>{page}</span>
        </div>
      </div>
    </div>
  </Link>
);

SearchHint.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  image: PropTypes.string,

};
SearchHint.defaultProps = {
  image: null,
};

export default SearchHint;
