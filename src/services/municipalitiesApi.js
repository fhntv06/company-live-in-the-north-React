/* eslint-disable max-len */
import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const municipalitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMunicipalities: builder.query({
      query: () => 'municipalities',
      transformResponse: (response) => ({
        data: response.data.map((item) => normalizeToCamelKeys(item)),
        filtred: response.data.map((item) => ({
          value: item.id, label: item.name,
        })).sort((a, b) => a.value - b.value),
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllMunicipalitiesQuery,
} = municipalitiesApi;
