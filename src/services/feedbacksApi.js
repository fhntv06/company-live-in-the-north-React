import apiSlice from './apiSlice';

const feedbacksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    feedback: builder.mutation({
      query: (credentials) => ({
        url: '/feedbacks',
        method: 'POST',
        body: {
          name: credentials.name,
          phone: credentials.phone,
          email: credentials.email,
          message: credentials.message,
          municipality_id: credentials.municipality,
          user_id: credentials.userId,
          extended_mediables: {
            files: credentials.files,
          },
        },
      }),
    }),
  }),
});

export const {
  useFeedbackMutation,
} = feedbacksApi;

export default feedbacksApi;
