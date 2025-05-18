// eslint-disable-next-line import/no-cycle
import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkPhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/check-phone',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    confirmPhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/confirm-phone',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordVerifyPhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/password/verify-phone',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordConfirmPhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/password/confirm-phone',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordUpdatePhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/password/update-by-phone',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordVerifyEmail: builder.mutation({
      query: (credentials) => ({
        url: '/user/password/verify-email',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordUpdateEmail: builder.mutation({
      query: (credentials) => ({
        url: `/user/password/update-by-email?email=${credentials.email}&signature=${credentials.signature}`,
        method: 'POST',
        body: {
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
        },
      }),
    }),
    emailChangeConfirm: builder.mutation({
      query: (credentials) => ({
        url: 'user/email/confirm',
        method: 'POST',
        body: credentials,
      }),
    }),
    emailChangeUpdate: builder.mutation({
      query: (credentials) => ({
        url: 'user/email/update',
        method: 'POST',
        body: credentials,
      }),
    }),
    emailChangeVerifyPhone: builder.mutation({
      query: (credentials) => ({
        url: '/user/email/verify-phone',
        method: 'POST',
        body: credentials,
      }),
    }),
    phoneChangeConfirm: builder.mutation({
      query: (credentials) => ({
        url: `user/phone/confirm?signature=${credentials.signature}`,
        method: 'POST',
        body: {
          phone: credentials.phone,
          captcha_token: credentials.captchaToken,
        },
      }),
    }),
    phoneChangeUpdate: builder.mutation({
      query: (credentials) => ({
        url: 'user/phone/update',
        method: 'POST',
        body: credentials,
      }),
    }),
    phoneChangeVerifyEmail: builder.mutation({
      query: (credentials) => ({
        url: '/user/phone/verify-email',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => 'user',
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    updateAvatar: builder.mutation({
      query: (credentials) => ({
        url: '/user/update-avatar',
        method: 'POST',
        body: {
          avatar: credentials,
        },
      }),
    }),
    deleteAvatar: builder.mutation({
      query: () => ({
        url: '/user/delete-avatar',
        method: 'DELETE',
      }),
      transformResponse: (response) => response,
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: '/user/update',
        method: 'POST',
        body: credentials,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/user/delete',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckPhoneMutation,
  useConfirmPhoneMutation,
  usePasswordVerifyPhoneMutation,
  usePasswordConfirmPhoneMutation,
  usePasswordUpdatePhoneMutation,
  usePasswordVerifyEmailMutation,
  usePasswordUpdateEmailMutation,
  useEmailChangeConfirmMutation,
  useEmailChangeUpdateMutation,
  useEmailChangeVerifyPhoneMutation,
  usePhoneChangeConfirmMutation,
  usePhoneChangeUpdateMutation,
  usePhoneChangeVerifyEmailMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteAvatarMutation,
} = authApi;

export default authApi;
