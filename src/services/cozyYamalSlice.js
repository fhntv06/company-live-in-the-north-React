import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const cozyYamalSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCozyYamal: builder.query({
      query: () => 'activities?project_id=2',
      transformResponse: (response) => normalizeToCamelKeys(response.data)[0],
    }),
  }),
});

export const {
  useGetCozyYamalQuery,
} = cozyYamalSlice;
