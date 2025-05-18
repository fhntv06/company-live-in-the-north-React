import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import compilations from './compilations';

export const compilationsAdapter = createEntityAdapter();

const initialState = compilationsAdapter.getInitialState();

const compilationsSlice = createSlice({
  name: 'compilations',
  initialState,
  reducers: {
    fetchCompilations: (state) => {
      compilationsAdapter.setAll(state, compilations);
    },
  },
});

export const {
  selectAll: selectAllCompilations,
  selectById: selectCompilationById,
} = compilationsAdapter.getSelectors((state) => state.compilations);

export const selectOtherCompilations = createSelector(
  selectAllCompilations,
  (_, id) => id,
  (items, id) => {
    const filtered = items.filter((item) => item.id !== parseInt(id, 10));

    return filtered.slice(0, 5);
  },
);

export const {
  fetchCompilations,
} = compilationsSlice.actions;

export default compilationsSlice.reducer;
