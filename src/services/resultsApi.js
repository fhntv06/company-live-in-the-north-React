/* eslint-disable camelcase */
import apiSlice from './apiSlice';
import { normalizeToCamelKeys, formatParams } from '../helpers/format';

export const resultTypes = {
  discussionsCount: 'Провели обсуждений',
  votingsCount: 'Провели голосований',
  ideasCount: 'Собрали идей',
  votesCount: 'Собрали голосов',
  activeUsersCount: 'Пользователей портала',
};

export const resultsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllResults: builder.query({
      query: ({
        limit,
        skip,
        step,
        municipality,
      }) => (
        {
          url: formatParams('discussion-results', {
            limit,
            skip,
            step,
          }, '?project_id=0'),
          headers: {
            'X-Municipality': municipality,
          },
        }),
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
    }),
    getResultsById: builder.query({
      query: (id) => `discussion-results/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
    }),
    getYearResults: builder.query({
      query: (id) => `year-results?filter[municipality_id]=${id}`,
      transformResponse: (response) => {
        let normalized = response.data.map((item) => normalizeToCamelKeys(item));
        normalized = normalized.sort((a, b) => {
          if (a.municipalityId === b.municipalityId) {
            return b.year - a.year;
          }

          return b.id - a.id;
        });

        const reduced = Object.keys(resultTypes).reduce((current, key) => ([
          ...current,
          {
            type: key,
            data: [
              normalized[0][key],
              normalized[1][key],
            ],
          },
        ]), []);

        return {
          years: [normalized[0].year, normalized[1].year],
          results: reduced,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllResultsQuery,
  useGetResultsByIdQuery,
  useGetYearResultsQuery,
} = resultsApi;
