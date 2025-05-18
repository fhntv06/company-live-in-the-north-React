import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const ideasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIdeasById: builder.query({
      query: (id) => `ideas?discussion_id=${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    setLike: builder.mutation({
      query: (data) => ({
        url: 'likes',
        method: 'POST',
        body: {
          type: 1,
          likeable_id: data.likeableId,
          likeable_type: data.likeableType,
        },
      }),
    }),
    deleteLike: builder.mutation({
      query: (id) => ({
        url: `likes/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSetLikeMutation,
  useDeleteLikeMutation,
} = ideasApi;
