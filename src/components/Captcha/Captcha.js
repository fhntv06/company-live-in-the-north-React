import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SmartCaptcha } from '@yandex/smart-captcha';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { setCaptcha, getCaptcha } from '../../features/Auth/authSlice';
import './captcha.scss';

const Captcha = ({ className, onSuccess }) => {
  const dispatch = useDispatch();
  const isCaptcha = useSelector((state) => getCaptcha(state.auth));
  const handleSuccess = useCallback((res) => {
    onSuccess(res);
    console.log(res);
    dispatch(setCaptcha(res));
  }, []);

  useEffect(() => {
    console.log(isCaptcha);
  }, [isCaptcha]);
  return (
    <div className={className}>
      <SmartCaptcha
        sitekey={process.env.REACT_APP_CAPTCHA_KEY}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

Captcha.propTypes = {
  className: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

Captcha.defaultProps = {
  className: '',
};

export default Captcha;
