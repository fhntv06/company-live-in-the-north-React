import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import PropTypes from 'prop-types';
// import { cyrilicRegex } from '../../../helpers/regex';
import InputField from '../Inputs/InputField/InputField';
import Button from '../Button/Button';
import styles from './IdeaForm.module.scss';
import FileUploadController from '../FileUpload/FileUploadController';
import ModalCloseButton from '../Modal/ModalCloseButton';
import { usePostIdeasMutation } from '../../services/ideasApi';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

// заменить позднее
const cyrilicRegex = /^[А-Яа-я]/gm;

const IdeaForm = ({
  className,
  onClose,
  disabled,
  id,
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
      message: '',
    },
  });

  const [sendIdea, { isLoading }] = usePostIdeasMutation();
  const [files, setFiles] = useState();
  const [maxSize, setMaxSize] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSendIdea = async (formData) => {
    const data = {
      discussionId: id,
      message: formData.message,
      files,
    };
    try {
      const result = await sendIdea(data).unwrap();
      if (result.success) {
        setSuccess(true);
      }
    } catch {
      setSuccess(false);
    }
  };

  const sendingRender = () => (
    <div className={classnames(className, styles.form)}>
      <div className={styles.wrapper}>
        <div className={styles.loader}>
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}>
              <SpinnerLoader isLoading={isLoading} />
            </div>
            <h4 className={styles.title}>
              Отправляем сообщение
            </h4>
          </div>
        </div>
      </div>
    </div>
  );

  const onFileSelect = (media) => {
    const oldArray = files;
    const newArray = media;
    const filesObj = { ...oldArray, ...newArray };
    setFiles(filesObj);
  };

  return (
    <>
      {isLoading ? sendingRender() : (
        <form className={classnames(className, styles.form)} onSubmit={handleSubmit(onSendIdea)}>
          <div className={styles.wrapper}>
            {!success ? (
              <>
                <h4 className={styles.title}>
                  Предложите идею
                  <ModalCloseButton onClick={onClose} className={styles.closeButton} />
                </h4>
                <div className={styles.text}>
                  Не нравятся предложенные идеи?
                  <br />
                  Предложи свою!
                </div>
                <InputField
                  value={watch('message')}
                  label="Текст"
                  error={errors.message?.message}
                  className={classnames('input-field', styles.field)}
                >
                  <textarea
                    {...register('message',
                      {
                        required: 'Пожалуйста, напишите вашу идею',
                        pattern: { value: cyrilicRegex, message: 'Ввод только кирилицей' },
                        minLength: { value: 10, message: 'Минимум 10 символов' },
                        disabled,
                      })}
                  />
                </InputField>
                <FileUploadController
                  disabled={disabled}
                  setMaxSize={setMaxSize}
                  onSelect={onFileSelect}
                  mergedFiles={files}
                  setMergedFiles={setFiles}
                />
              </>
            ) : (
              <>
                <h4 className={styles.title}>
                  Спасибо за участие!
                  <ModalCloseButton onClick={onClose} className={styles.closeButton} />
                </h4>
                <div className={styles.text}>
                  Ваша идея принята к рассмотрению.
                </div>
              </>
            ) }

          </div>
          {!success && (
          <Button disabled={disabled || isLoading || maxSize} type="submit" className={styles.submit} typeButton="button-fill">
            отправить
          </Button>
          )}
        </form>
      )}
    </>

  );
};

IdeaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.number,
};

IdeaForm.defaultProps = {
  className: '',
  disabled: true,
  id: null,
};

export default IdeaForm;
