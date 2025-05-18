import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { shape } from 'prop-types';
import parseHtml from 'html-react-parser';
import styles from './XmasTreeThirdStep.module.scss';
import MapContainer from '../../../components/MapContainer/MapContainer';
import { openFeedback } from '../../../features/Feedback/feedbackSlice';
import { selectPointByType } from '../../../features/Municipality/municipalitySlice';
import Button from '../../../components/Button/Button';

const XmasTreeThirdStep = ({ step }) => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(openFeedback());
  };

  const point = useSelector((state) => selectPointByType(state, 2));

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{step && step.id === 3 && step.name}</h2>
      <p className={styles.text}>
        {step && step.id === 3 && parseHtml(step.description)}
      </p>
      <div className={styles.contacts}>
        <p className={styles.address}>
          {point?.address}
        </p>
        <div className={styles.additionalInfo}>
          <span className={styles.phone}>
            <a className={styles.link} href={`tel: ${point?.phone}`}>{point?.phone}</a>
          </span>
          <span className={styles.workingHours}>
            {point && point.workingHours && parseHtml(point.workingHours)}
          </span>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            className={styles.btn}
            typeButton="button-white"
            onClick={openModal}
          >
            Обратная связь
          </Button>
        </div>
        <div className={styles.map}>
          {point && point.coordinate && (
          <MapContainer
            mapCoord={point.coordinate}
            placemarkCoords={[point.coordinate]}
          />
          )}
        </div>
      </div>
    </div>
  );
};

XmasTreeThirdStep.propTypes = {
  step: PropTypes.arrayOf(PropTypes.objectOf(shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }))).isRequired,
};

export default XmasTreeThirdStep;
