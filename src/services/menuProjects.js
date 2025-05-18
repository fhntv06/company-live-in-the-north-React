import apiSlice from './apiSlice';
import { normalizeToCamelKeys } from '../helpers/format';

export const menuProjectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuProjects: builder.query({
      query: () => 'menu-projects',
      transformResponse: (response) => {
        const dataSorted = response.data.sort((prev, next) => prev.order - next.order);
        return normalizeToCamelKeys(dataSorted);
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMenuProjectsQuery,
} = menuProjectsApi;
