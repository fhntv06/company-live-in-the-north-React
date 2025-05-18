/* eslint-disable max-len */
import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const ideasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIdeasById: builder.query({
      query: (id) => `ideas?discussion_id=${id}`,
      transformResponse: (response) => {
        // eslint-disable-next-line max-len
        const dataSorted = response.data.sort((preIdea, nextIdea) => nextIdea.likes_count - preIdea.likes_count);
        return normalizeToCamelKeys(dataSorted);
      },
    }),
    postIdeas: builder.mutation({
      query: (data) => ({
        url: 'ideas',
        method: 'POST',
        body: {
          discussion_id: data.discussionId,
          message: data.message,
          extended_mediables: {
            files: data.files,
          },
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetIdeasByIdQuery,
  usePostIdeasMutation,
} = ideasApi;
