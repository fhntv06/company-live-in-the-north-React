import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import votes from './votes';

export const votesAdapter = createEntityAdapter();

const initialState = votesAdapter.getInitialState();

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    fetchVotes: (state) => {
      votesAdapter.setAll(state, votes);
    },
  },
});

export const {
  selectAll: selectAllVotes,
  selectById: selectVoteById,
} = votesAdapter.getSelectors((state) => state.votes);

export const {
  fetchVotes,
} = votesSlice.actions;

export default votesSlice.reducer;
