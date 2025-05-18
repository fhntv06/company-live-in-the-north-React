/* eslint-disable max-len */
import apiSlice from './apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => 'user/notifications',
      transformResponse: (response) => ({
        notifications: response.filter((item) => !item.read_at).concat(response.filter((item) => item.read_at)),
        readNotifications: response.filter((item) => item.read_at),
        unreadNotifications: response.filter((item) => !item.read_at),
        recentUnreadNotification: response.filter((item) => !item.read_at).at(0),
      }),
      providesTags: ['Notification'],
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `user/notifications/${id}/read`,
        method: 'POST',
      }),
    }),
    readAllNotifications: builder.mutation({
      query: () => ({
        url: 'user/notifications/read-all',
        method: 'POST',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
  overrideExisting: true,
  refetchOnMountOrArgChange: true,
});

export const {
  useGetAllNotificationsQuery,
  useReadNotificationMutation,
  useReadAllNotificationsMutation,
} = notificationApi;
