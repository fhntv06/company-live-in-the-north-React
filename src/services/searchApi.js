/* eslint-disable max-len */
import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';
import formRestData from '../helpers/formGeneralSearchData';

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralSearchResults: builder.query({
      query: (q) => `search?query=${q}&limit=9999`,
      transformResponse: (response) => response.data.map((item, index) => ({
        id: item.id,
        indexID: index + 1,
        name: item.name,
        info: item.type === 'AfishaEvent' ? item.content : item.description,
        ...formRestData(item),
      })),
    }),
    getAfishaEventSearchResults: builder.query({
      query: ({ searchQuery, limit, skip }) => `afisha/events/search?query=${searchQuery}&limit=${limit}&skip=${skip}`,
      transformResponse: (response) => ({
        data: response.data.map((item) => normalizeToCamelKeys(item)),
        total: response.count,
      }),
    }),
    getAfishaPlaceSearchResults: builder.query({
      query: ({ searchQuery, limit, skip }) => `afisha/places/search?query=${searchQuery}&limit=${limit}&skip=${skip}`,
      transformResponse: (response) => ({
        data: response.data.map((item) => normalizeToCamelKeys(item)),
        total: response.count,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGeneralSearchResultsQuery,
  useLazyGetGeneralSearchResultsQuery,
  useGetAfishaEventSearchResultsQuery,
  useGetAfishaPlaceSearchResultsQuery,
} = searchApi;
