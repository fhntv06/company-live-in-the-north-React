import {
  createSlice,
} from '@reduxjs/toolkit';
import { normalizeToCamelKeys } from '../../helpers/format';
// eslint-disable-next-line import/no-cycle
import authApi from '../../services/authApi';

export const FormType = {
  AUTH: 'AUTH',
  CODE: 'CODE',
  REGISTRATION: 'REGISTRATION',
  FINAL: 'FINAL',
  VERIFITYEMAIL: 'VERIFITYEMAIL',
  VERIFITYEMAILFINAL: 'VERIFITYEMAILFINAL',
  RESETEMAIL: 'RESETEMAIL',
  RESETPHONE: 'RESETPHONE',
  RESETFINAL: 'RESETFINAL',
  UPDATEEMAIL: 'UPDATEEMAIL',
  PHONECONFIRM: 'PHONECONFIRM',
  PHONEUPDATE: 'PHONEUPDATE',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    step: FormType.CODE,
    phone: '',
    code: '',
    name: '',
    email: '',
    password: '',
    address: '',
    token: null,
    loading: false,
    error: null,
    isAuth: false,
    captchaToken: '',
    typeReset: 'phone',
    phoneIsRegister: false,
  },
  reducers: {
    logoutAction: (state) => {
      state.step = FormType.CODE;
      state.user = null;
      state.phone = '';
      state.code = '';
      state.name = '';
      state.email = '';
      state.password = '';
      state.address = '';
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuth = false;
      state.captchaToken = '';
      state.typeReset = 'phone';
      state.phoneIsRegister = false;
    },
    loginAction: (state, { payload }) => {
      state.isAuth = true;
      state.token = payload.data.token;
      state.user = normalizeToCamelKeys(payload.data.user);
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCaptcha: (state, action) => {
      state.captchaToken = action.payload;
    },
    setData: (state, action) => {
      state.phone = action.payload.phone;
      state.name = action.payload.name;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTypeReset(state, action) {
      state.typeReset = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhoneRegister(state, action) {
      state.phoneIsRegister = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setNewBalance: (state, { payload }) => {
      state.user.bonusCount = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      },
    );
    builder.addMatcher(
      authApi.endpoints.updateAvatar.matchFulfilled, (state, { payload }) => {
        state.user = normalizeToCamelKeys(payload.data);
      },
    );
    builder.addMatcher(
      authApi.endpoints.deleteAvatar.matchFulfilled, (state, { payload }) => {
        state.user = normalizeToCamelKeys(payload.data);
      },
    );
    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled, (state, { payload }) => {
        state.user = normalizeToCamelKeys(payload.data);
      },
    );
  },
});

export const getStep = (state) => state.step;
export const getIsAuth = (state) => state.isAuth;
export const getUser = (state) => state.auth?.user;
export const getToken = (state) => state.token;
export const getCaptcha = (state) => state.captchaToken;
export const getPhone = (state) => state.phone;
export const getError = (state) => state.error;
export const getTypeReset = (state) => state.typeReset;
export const getEmail = (state) => state.email;
export const getPhoneRegister = (state) => state.phoneIsRegister;

export const getBalance = (state) => state.user?.bonusCount;

export const getMunicipalityId = (state) => state.auth.user?.municipality?.id;

export const {
  logoutAction,
  loginAction,
  setToken,
  setUser,
  setStep,
  setError,
  setData,
  setLoading,
  setCaptcha,
  setPhone,
  setTypeReset,
  setEmail,
  setPhoneRegister,
  setNewBalance,
} = authSlice.actions;

export default authSlice.reducer;
