import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import {
  usePasswordVerifyEmailMutation,
  useEmailChangeUpdateMutation,
  usePhoneChangeVerifyEmailMutation,
} from '../../../services/authApi';
import {
  setStep,
  FormType,
  setEmail,
  setError,
  getError,
} from '../../../features/Auth/authSlice';
import { emailRegex } from '../../../helpers/regex';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import useMediaQuery from '../../../hooks/useMediaQuery';
import styles from '../AuthForms.module.scss';

const EmailForm = ({ type, buttonTitle }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => getError(state.auth));
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const [confirmEmail] = type === 'reset' ? usePasswordVerifyEmailMutation() : (type === 'updatePhone' ? usePhoneChangeVerifyEmailMutation() : useEmailChangeUpdateMutation());
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const onSubmit = async ({ email }) => {
    dispatch(setError(null));
    dispatch(setEmail(email));
    const data = {
      email,
    };
    try {
      const result = await confirmEmail(data).unwrap();
      if (result.success) {
        dispatch(setStep(FormType.VERIFITYEMAILFINAL));
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
    }
  };

  const changeStep = () => {
    dispatch(setStep(FormType.CODE));
  };

  const buttonLink = (
    <div className={styles.codeCheck}>
      <div className={`${styles.bottom} ${styles.bottomLink} ${styles.singleBottomLink}`}>
        <button type="button" onClick={changeStep}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputsWrapper}>
        <InputField
          label="E-mail"
          value={watch('email')}
          error={errors.email?.message}
          className="input-field"
        >
          <input
            autoComplete="off"
            {...register('email',
              { required: 'Пожалуйста, введите свой E-mail', pattern: { value: emailRegex, message: 'Некорректный E-mail' } })}
          />
        </InputField>
        {!isMobile && type === 'reset' && buttonLink}
      </div>
      <div className={`${styles.buttonWrapper} ${styles.buttonWrapperSingleRow}`}>
        <Button type="submit" className={styles.submit} disabled={(watch('email').length < 4 || errors.email)} typeButton="button-fill">
          продолжить
        </Button>
        {isMobile && type === 'reset' && buttonLink}
      </div>
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
};

EmailForm.propTypes = {
  buttonTitle: PropTypes.string,
  type: PropTypes.string,
};

EmailForm.defaultProps = {
  buttonTitle: 'Восстановить по телефону',
  type: 'registration',
};

export default EmailForm;
