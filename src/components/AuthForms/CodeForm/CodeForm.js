import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import InputMask from 'react-input-mask';
import InputField from '../../Inputs/InputField/InputField';
import Button from '../../Button/Button';
import Captcha from '../../Captcha/Captcha';
import {
  useCheckPhoneMutation,
  useConfirmPhoneMutation,
  usePasswordVerifyPhoneMutation,
  usePasswordConfirmPhoneMutation,
  useEmailChangeConfirmMutation,
  useEmailChangeVerifyPhoneMutation,
  usePhoneChangeConfirmMutation,
  usePhoneChangeUpdateMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} from '../../../services/authApi';
import {
  getCaptcha,
  setStep,
  FormType,
  setPhone,
  setError,
  getError,
  setPhoneRegister,
} from '../../../features/Auth/authSlice';
import { phoneRegex, codeRegex } from '../../../helpers/regex';
import { getRawNumber } from '../../../helpers/getRawNumber';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useGetParams from '../../../hooks/useGetParams';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { formatPhoneForMask } from '../../../helpers/format';
import styles from '../AuthForms.module.scss';

const CodeForm = ({ type, userInfo, buttonTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendCode, setSendCode] = useState(null);
  const [captchaCheck, setCaptchaCheck] = useState(false);
  const [update, setUpdate] = useState(false);
  const [disabledCodeInput, setDisabledCodeInput] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [validationPhone, setValidationPhone] = useState(!!userInfo);
  const intervalRef = useRef(null);
  const isCaptcha = useSelector((state) => getCaptcha(state.auth));
  const errorMessage = useSelector((state) => getError(state.auth));
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: userInfo ? formatPhoneForMask(userInfo.phone) : '',
      code: '',
    },
  });
  const [checkPhone] = type === 'reset' ? usePasswordVerifyPhoneMutation() : (
    type === 'updateEmail' ? useEmailChangeVerifyPhoneMutation() : (type === 'updatePhone' ? usePhoneChangeConfirmMutation() : useCheckPhoneMutation())
  );

  const [confirmPhone] = type === 'reset' ? usePasswordConfirmPhoneMutation() : (
    type === 'updateEmail' ? useEmailChangeConfirmMutation() : (type === 'updatePhone' ? usePhoneChangeUpdateMutation() : useConfirmPhoneMutation())
  );
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const { data: user, isSuccess } = useGetUserQuery(undefined, { skip: !update });
  const [getUserTrigger] = useLazyGetUserQuery();

  useEffect(() => {
    if (sendCode === 90) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setSendCode((prev) => prev - 1);
      }, 1000);
    }

    if (sendCode === 0) {
      clearInterval(intervalRef.current);
      setDisabledButton(false);
    }
  }, [sendCode]);

  const urlParams = useGetParams();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(
        setStep(type === 'reset' ? FormType.RESETPHONE : (
          type === 'updateEmail' ? FormType.UPDATEEMAIL : (
            type === 'updatePhone' ? FormType.FINAL : FormType.REGISTRATION)
        )),
      );
    }
  }, [isSuccess]);

  const onSubmitCheckPhone = async (formData) => {
    dispatch(setError(null));
    if (!sendCode) {
      setSendCode(90);
      setDisabledButton(true);
    }
    let data;
    if (type !== 'updatePhone') {
      data = {
        phone: userInfo ? userInfo.phone : getRawNumber(formData.phone),
        captcha_token: isCaptcha,
      };
    } else {
      data = {
        phone: getRawNumber(formData.phone),
        captchaToken: isCaptcha,
        // expires: urlParams?.expires,
        signature: urlParams?.signature,
      };
    }
    try {
      const result = await checkPhone(data);
      if (result) {
        setDisabledCodeInput(false);
        // eslint-disable-next-line no-shadow
        const { error, data } = result;

        if (error) {
          if (error.status === 422) {
            dispatch(setError(error.data.message));
          }
          if (error.status === 410) {
            dispatch(setError(null));
            navigate('/recovery-account', { replace: true });
          }
        }

        if ((type !== 'reset' && type !== 'updatePhone' && type !== 'updateEmail')
        && data && data.success && data.message === 'Данный номер телефона уже зарегистрирован') {
          dispatch(setPhoneRegister(true));
          navigate('/sign-in', { replace: true });
        }
      }
    } catch (error) {
      if (error.data) {
        dispatch(setError(error.data?.message));
      }
    }
  };

  const onCapchaSubmit = () => {
    setCaptchaCheck(true);
    setDisabledButton(false);
  };

  const onSubmit = async ({ phone, code }) => {
    dispatch(setError(null));
    const data = {
      phone: userInfo ? userInfo.phone : getRawNumber(phone),
      code,
    };

    dispatch(setPhone(phone));

    try {
      const result = await confirmPhone(data).unwrap();
      if (result.success) {
        if (type !== 'registration' && type !== 'reset') {
          setUpdate(true);
          getUserTrigger();
        }
        dispatch(setStep(type === 'reset' ? FormType.RESETPHONE : (type === 'updateEmail' ? FormType.UPDATEEMAIL : (type === 'updatePhone' ? FormType.FINAL : FormType.REGISTRATION))));
      }
    } catch (error) {
      dispatch(setError(error.data?.message));
    }
  };

  const changeStep = () => {
    dispatch(setStep(FormType.VERIFITYEMAIL));
  };

  const phoneRegexValidation = () => {
    const phoneValue = getValues().phone;
    const regTest = new RegExp(phoneRegex);
    const regTestResult = regTest.test(phoneValue);
    setValidationPhone(regTestResult);
  };

  const buttonLink = (
    <div className={`${styles.bottom} ${styles.bottomLink} ${styles.singleBottomLink}`}>
      <button type="button" onClick={changeStep}>
        {buttonTitle}
      </button>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputsWrapper}>
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          rules={{
            required: 'Пожалуйста, введите свой номер',
            pattern: { value: phoneRegex, message: 'Некорректный номер телефона' },
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Телефон"
              value={watch('phone')}
              error={errors.phone?.message}
              className="input-field"
            >
              <InputMask
                autoComplete="off"
                {...register('phone')}
                mask="+7 999 999 9999"
                value={value}
                disabled={userInfo}
                onChange={(e) => {
                  onChange(e);
                  phoneRegexValidation();
                }}
                type="tel"
              />
            </InputField>
          )}
        />
        <Captcha
          className={styles.captcha}
          onSuccess={() => {
            onCapchaSubmit();
          }}
        />
        <div className={styles.codeCheck}>
          <Button
            typeButton="button"
            className={`${styles.codeBtn} ${sendCode ? styles.timer : ''}`}
            disabled={!captchaCheck || !validationPhone || errors.phone?.message || disabledButton}
            onClick={handleSubmit((d) => onSubmitCheckPhone(d))}
          >
            {sendCode ? `запросить повторно (${sendCode} сек)` : 'Запросить звонок'}
          </Button>
          <Controller
            control={control}
            name="code"
            defaultValue=""
            rules={{
              pattern: codeRegex,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                disabled={!watch('phone')}
                label="Последние 4 цифры номера"
                value={watch('code')}
                error={errors.code?.message}
                className={`input-field ${styles.codeField}`}
              >
                <InputMask
                  {...register('code')}
                  mask="9999"
                  value={value}
                  onChange={onChange}
                  disabled={disabledCodeInput}
                />
              </InputField>
            )}
          />
          {(type === 'reset' && !isMobile) && buttonLink}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit" className={styles.submit} disabled={(watch('code').length < 4 || errors.code)} typeButton="button-fill">
          продолжить
        </Button>
        {(type === 'reset' && isMobile) && buttonLink}
      </div>
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </form>
  );
};

CodeForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  phoneValue: PropTypes.string,
  type: PropTypes.string,
  buttonTitle: PropTypes.string,
  userInfo: PropTypes.objectOf(),
};

CodeForm.defaultProps = {
  phoneValue: '',
  type: 'registration',
  buttonTitle: 'Восстановить по e-mail',
  userInfo: null,
};

export default CodeForm;
