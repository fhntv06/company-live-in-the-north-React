import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const xmasTreeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGiftTypes: builder.query({
      query: () => 'care/gift-types',
      transformResponse: (response) => response.data.map((item) => ({
        value: item.id, label: item.name,
      })).sort((a, b) => a.label.localeCompare(b.label)),
    }),
    sendWish: builder.mutation({
      query: (data) => ({
        url: 'care/send-wish',
        method: 'POST',
        body: {
          child_first_name: data.childFirstName,
          child_surname: data.childSurname,
          child_patronymic: data.childPatronymic,
          child_birth_date: data.childBirthDate,
          municipality_id: data.municipalityId,
          municipality_location_id: data.municipalityLocationId,
          snils: data.snils,
          desire: data.wish,
          parent_first_name: data.parentFirstName,
          parent_surname: data.parentSurname,
          parent_patronymic: data.parentPatronymic,
          parent_birth_date: data.parentBirthDate,
          parent_phone: data.parentPhone,
          parent_email: data.parentEmail,
          address: data.address,
          desire_reason: data.cause,
          gift_type_id: data.gift,
          will_attend_matinee: data.willAttendMatinee,
          //   disability: true,
          //   smo_participants_child: false,
          //   orphan: false,
          personal_data_agreement: true,
          event_agreement: true,
          extended_mediables: {
            files: data.files,
          },
        },
      }),
    }),
    getXmasFaqs: builder.query({
      query: () => 'faqs?type=4',
      transformResponse: (response) => response.data,
    }),
    getLimit: builder.query({
      query: () => 'care/wishes/is-limit-reached',
      transformResponse: (response) => response,
    }),
    getSteps: builder.query({
      query: () => 'care/steps',
      // eslint-disable-next-line max-len
      transformResponse: (response) => normalizeToCamelKeys(response.data.sort((a, b) => a.id - b.id)),
    }),
    getRandomWish: builder.query({
      query: () => 'care/get-random-wish',
      transformResponse: (response) => normalizeToCamelKeys(response),
    }),
    sendReserveWish: builder.mutation({
      query: (data) => ({
        url: 'care/reserve-wish',
        method: 'POST',
        body: {
          wish_id: data.wishId,
          first_name: data.firstName,
          surname: data.surname,
          patronymic: data.patronymic,
          phone: data.phone,
          email: data.email,
          municipality_id: data.municipality,
          personal_data_agreement: data.personalDataAgreement,
          event_agreement: data.eventAgreement,
        },
      }),
    }),
    getCareExecutions: builder.query({
      query: () => 'user/care-executions',
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGiftTypesQuery,
  useSendWishMutation,
  useGetXmasFaqsQuery,
  useGetLimitQuery,
  useGetStepsQuery,
  useGetRandomWishQuery,
  useSendReserveWishMutation,
  useGetCareExecutionsQuery,
} = xmasTreeApi;
