import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { logoutAction } from '../features/Auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { selectedMunicipality } = getState().municipalities;
    const { token } = getState().auth;
    headers.set('Accept', 'application/json');
    if (!headers.has('X-Municipality')) {
      headers.set('X-Municipality', selectedMunicipality);
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401
    && (result.meta.request.method === 'POST' || result.meta.request.url.includes('user'))) {
    api.dispatch(logoutAction());
    window.location.replace('/sign-in');
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Cart', 'Products', 'Orders'],
  endpoints: () => ({}),
});

export default apiSlice;
