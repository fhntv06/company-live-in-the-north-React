import apiSlice from './apiSlice';
import { formatParams, normalizeToCamelKeys } from '../helpers/format';
import { getTomorrowDate } from '../helpers/helpersCalendar';

export const afishaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({
        // eslint-disable-next-line camelcase
        limit, skip, category_slug, filters,
      }) => ({
        // eslint-disable-next-line camelcase
        url: formatParams('afisha/events', { limit, skip, category_slug }, filters),
      }),
      transformResponse: (response) => ({
        data: response.data.map((item) => normalizeToCamelKeys(item)),
        total: response.count,
      }),
    }),
    getMainEvents: builder.query({
      query: () => {
        const tomorrow = getTomorrowDate();
        return {
          url: `afisha/events?main=1&date_start=${tomorrow}&limit=9`,
        };
      },
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getSimilarEvents: builder.query({
      query: (categoryId) => `afisha/events?category_id[]=${categoryId}`,
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getPushkinCardEvents: builder.query({
      query: (id) => `afisha/events?pushkin_card=1&exclude=${id}`,
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getEventById: builder.query({
      query: (id) => `afisha/events/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    getTags: builder.query({
      query: () => 'afisha/tags',
      transformResponse: (response) => response.data,
    }),
    getAllPlaces: builder.query({
      query: () => 'afisha/places',
      transformResponse: (response) => response.data,
    }),
    getPlaceById: builder.query({
      query: (id) => `afisha/places/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    getAllCategories: builder.query({
      query: () => 'afisha/categories',
      transformResponse: (response) => response.data.sort((a, b) => a.priority - b.priority),
    }),
    getAllCompilations: builder.query({
      query: () => 'afisha/compilations',
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getCompilationById: builder.query({
      query: (id) => `afisha/compilations/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: 'afisha/reviews',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetTagsQuery,
  useGetAllPlacesQuery,
  useGetPlaceByIdQuery,
  useGetAllCategoriesQuery,
  useGetMainEventsQuery,
  useGetAllCompilationsQuery,
  useGetCompilationByIdQuery,
  useGetSimilarEventsQuery,
  useGetPushkinCardEventsQuery,
  useCreateReviewMutation,
  useToggleFavoriteEventMutation,
  useToggleFavoritePlaceMutation,
} = afishaApi;
