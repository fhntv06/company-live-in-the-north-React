/* eslint-disable camelcase */
import apiSlice from './apiSlice';
import { normalizeToCamelKeys, formatParams } from '../helpers/format';

export const discussionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDiscussions: builder.query({
      query: ({
        limit, skip, step, dateStart, dateEnd, orderDirection,
      }) => (
        {
          url: formatParams('discussions', {
            limit,
            skip,
            step,
            date_start: dateStart,
            date_end: dateEnd,
            order_direction: orderDirection,
          }),
        }),
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getDiscussionById: builder.query({
      query: (id) => `discussions/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    getAllDiscussionsByUser: builder.query({
      query: ({
        limit,
      }) => (
        {
          url: formatParams('user/discussions', {
            limit,
          }),
        }),
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllDiscussionsQuery,
  useGetDiscussionByIdQuery,
  useGetAllDiscussionsByUserQuery,
} = discussionsApi;
