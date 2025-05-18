import {
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { sortingDateDown } from '../DiscussionData/formingData';
import results from './results';

export const resultsAdapter = createEntityAdapter();

const initialState = resultsAdapter.getInitialState();

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    fetchResults: (state) => {
      resultsAdapter.setAll(state, results);
    },
  },
});

// new result for municipality
// TODO: later for municipality
export const getRecentlyResult = (state) => sortingDateDown(state)[0];

export const {
  selectAll: selectAllResults,
  selectById: selectResultById,
} = resultsAdapter.getSelectors((state) => state.results);

export const {
  fetchResults,
} = resultsSlice.actions;

export const selectResultsRecently = createSelector(
  selectAllResults,
  getRecentlyResult,
);

export default resultsSlice.reducer;
