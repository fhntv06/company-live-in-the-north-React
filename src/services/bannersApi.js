import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => 'banners',
      transformResponse: (response) => ({
        main: response.data.map((item) => normalizeToCamelKeys(item))
          .filter((item) => item.type.key === 'MAIN')
          .sort((item1, item2) => item1.priority - item2.priority),
        project: response.data.map((item) => normalizeToCamelKeys(item))
          .filter((item) => item.type.key === 'PROJECT')
          .sort((item1, item2) => item1.priority - item2.priority),
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBannersQuery,
} = searchApi;
