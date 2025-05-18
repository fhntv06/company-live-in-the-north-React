import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'user/cart-products',
      transformResponse: (response) => ({
        products: response.data.map((item) => normalizeToCamelKeys(item)),
        totalSum: response.total_sum,
        totalCount: response.count,
      }),
      providesTags: ['Cart'],
    }),
    getOrders: builder.query({
      query: (
        { limit = 9999, skip = 0, isActive = null } =
        { limit: 9999, skip: 0, isActive: null },
      ) => ({
        url: `user/orders?limit=${limit}&skip=${skip}${isActive !== null ? `&filter[is_active]=${isActive}` : ''}`,
      }),
      transformResponse: (response) => ({
        orders: response.data.map((item) => normalizeToCamelKeys(item)),
        totalCount: response.count,
      }),
      providesTags: ['Orders'],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `orders/cancel/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Orders'],
    }),
    getBonusHistory: builder.query({
      query: () => 'user/bonus-history',
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getBonusesFaqs: builder.query({
      query: () => 'faqs?type=3',
      transformResponse: (response) => response.data,
    }),
    getFavorites: builder.query({
      query: () => '/user/favorites',
      transformResponse: (response) => {
        const normalized = response.data.map((item) => normalizeToCamelKeys(item));

        return {
          all: normalized,
          events: normalized.filter((item) => item.favorableType === 'AfishaEvent'),
          activities: normalized.filter((item) => item.favorableType === 'Discussion' || item.favorableType === 'Voting'),
          places: normalized.filter((item) => item.favorableType === 'AfishaPlace'),
          products: normalized.filter((item) => item.favorableType === 'WarehouseProduct'),
        };
      },
      providesTags: ['Favorite'],
    }),
    getUserAllFavorites: builder.query({
      query: () => '/user/favorites/ids',
      transformResponse: (response) => {
        const normalized = response.data.map((item) => normalizeToCamelKeys(item));

        return {
          all: normalized,
          events: normalized.filter((item) => item.favorableType === 'AfishaEvent'),
          activities: normalized.filter((item) => item.favorableType === 'Discussion' || item.favorableType === 'Voting'),
          places: normalized.filter((item) => item.favorableType === 'AfishaPlace'),
          products: normalized.filter((item) => item.favorableType === 'WarehouseProduct'),
        };
      },
      providesTags: ['Favorite'],
    }),
    toggleDiscussionFavorite: builder.mutation({
      query: (id) => ({
        url: `discussions/${id}/toggle-favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorite'],
    }),
    toggleVotingFavorite: builder.mutation({
      query: (id) => ({
        url: `votings/${id}/toggle-favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorite'],
    }),
    toggleEventFavorite: builder.mutation({
      query: (slug) => ({
        url: `afisha/events/${slug}/toggle-favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorite'],
    }),
    togglePlaceFavorite: builder.mutation({
      query: (id) => ({
        url: `afisha/places/${id}/toggle-favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorite'],
    }),
    toggleProductFavorite: builder.mutation({
      query: (id) => ({
        url: `warehouse-products/${id}/toggle-favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorite'],
    }),
    updateSubscription: builder.mutation({
      query: (credentials) => ({
        url: '/user/update-subscription',
        method: 'POST',
        body: {
          is_news_subscribed: credentials.isNewsSubscribed,
          is_afisha_subscribed: credentials.isAfishaSubscribed,
        },
      }),
    }),
    confirmEmail: builder.mutation({
      query: () => ({
        url: 'user/verify-email-resend',
        method: 'POST',
      }),
    }),
    getUserCareWishes: builder.query({
      query: () => 'user/care-wishes',
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetOrdersQuery,
  useCancelOrderMutation,
  useGetBonusHistoryQuery,
  useGetBonusesFaqsQuery,
  useGetFavoritesQuery,
  useGetUserAllFavoritesQuery,
  useToggleDiscussionFavoriteMutation,
  useToggleVotingFavoriteMutation,
  useToggleEventFavoriteMutation,
  useTogglePlaceFavoriteMutation,
  useToggleProductFavoriteMutation,
  useUpdateSubscriptionMutation,
  useConfirmEmailMutation,
  useGetUserCareWishesQuery,
} = profileApi;
