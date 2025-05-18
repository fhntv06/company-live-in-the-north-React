import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { inclineFirstname, inclineLastname } from 'lvovich';
import styles from './CareOfTreeBanner.module.scss';

const CareOfTreeBanner = ({ care, execution }) => {
  const content = (careWish) => {
    let careStatus;
    if (careWish) {
      switch (careWish.status.value) {
        case 1:
          careStatus = `Ваша заявка №${careWish.id} на ${careWish.gift} для ${inclineFirstname(careWish.childFirstName, 'genitive')} ${inclineLastname(careWish.childSurname, 'genitive')} находится на рассмотрении`;
          break;
        case 2:
          careStatus = `Ваша заявка №${careWish.id} на ${careWish.gift} для ${inclineFirstname(careWish.childFirstName, 'genitive')} ${inclineLastname(careWish.childSurname, 'genitive')} принята`;
          break;
        case 3:
          careStatus = `Ваша заявка №${careWish.id} на ${careWish.gift} для ${inclineFirstname(careWish.childFirstName, 'genitive')} ${inclineLastname(careWish.childSurname, 'genitive')} отклонена`;
          break;
        case 4:
          careStatus = `Ваша заявка №${careWish.id} на ${careWish.gift} для ${inclineFirstname(careWish.childFirstName, 'genitive')} ${inclineLastname(careWish.childSurname, 'genitive')} зарезервирована`;
          break;
        default:
          break;
      }
    }
    return careStatus;
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerTag}>ёлка заботы</div>
      {care && care.length > 0 && care.map((careItem) => (
        <div className={styles.bannerDescription}>
          {content(careItem)}
        </div>
      ))}
      {execution && execution.length > 0 ? (
        <>
          <Link to="reserved-gifts" className={styles.bannerLink} />
          <div className={styles.bannerDescription}>
            Забронированные подарки
          </div>
        </>
      ) : null}
    </div>
  );
};

CareOfTreeBanner.propTypes = {
  care: PropTypes.arrayOf(PropTypes.objectOf(shape({
    status: PropTypes.number,
    realName: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
  }))).isRequired,
  execution: PropTypes.arrayOf(),
};

CareOfTreeBanner.defaultProps = {
  execution: null,
};

export default CareOfTreeBanner;
