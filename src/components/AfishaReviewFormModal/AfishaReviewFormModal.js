import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import styles from './AfishaReviewFormModal.module.scss';
import { cyrilicRegex } from '../../helpers/regex';
import ModalCloseButton from '../Modal/ModalCloseButton';
import InputField from '../Inputs/InputField/InputField';
import Button from '../Button/Button';

import BottomSheet from '../Modal/BottomSheet';

const AfishaReviewFormModal = ({
  isOpen, onClose, onSendData,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      review: '',
    },
  });

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} biggerOnKeyboardOpen>
      <form className={styles.form} onSubmit={handleSubmit(onSendData.bind(null, watch('review')))}>
        <h4 className={styles.title}>
          Отзыв
          <ModalCloseButton onClick={onClose} className={styles.closeButton} />
        </h4>
        <div className={styles.text}>
          Расскажите, что вы думаете
        </div>
        <InputField
          value={watch('review')}
          label="Текст"
          error={errors.review?.message}
          className={classnames('input-field', styles.field)}
        >
          <textarea
            {...register('review',
              {
                required: 'Пожалуйста, напишите ваш отзыв',
                pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' },
                minLength: { value: 10, message: 'Минимум 10 символов' },
              })}
          />
        </InputField>
        <Button type="submit" className={styles.submit} typeButton="button-fill">
          отправить
        </Button>
      </form>
    </BottomSheet>
  );
};

AfishaReviewFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSendData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
AfishaReviewFormModal.defaultProps = {
  isOpen: false,
};

export default AfishaReviewFormModal;
