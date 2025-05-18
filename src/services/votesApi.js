import apiSlice from './apiSlice';
import { normalizeToCamelKeys, formatParams } from '../helpers/format';

export const votesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVotes: builder.query({
      query: ({
        limit, skip, step, dateStart, dateEnd, orderDirection,
      }) => (
        {
          url: formatParams('votings', {
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
    getVotingById: builder.query({
      query: (id) => `votings/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    setVoted: builder.mutation({
      query: (data) => ({
        url: 'users-vote-answers',
        method: 'POST',
        body: {
          user_id: data.userId,
          vote_answer_id: data.voteAnswerId,
        },
      }),
    }),
    deleteVote: builder.mutation({
      query: (id) => ({
        url: `users-vote-answers/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllvotingsByUser: builder.query({
      query: ({
        limit,
      }) => (
        {
          url: formatParams('user/votings', {
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
  useGetAllVotesQuery,
  useGetVotingByIdQuery,
  useSetVotedMutation,
  useDeleteVoteMutation,
  useGetAllvotingsByUserQuery,
} = votesApi;
