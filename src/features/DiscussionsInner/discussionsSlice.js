import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import discussions from './discussions';

export const discussionsAdapter = createEntityAdapter();

const initialState = discussionsAdapter.getInitialState();

const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    fetchDiscussons: (state) => {
      discussionsAdapter.setAll(state, discussions);
    },
  },
});

export const {
  selectAll: selectAllDiscussions,
  selectById: selectDiscussionById,
} = discussionsAdapter.getSelectors((state) => state.discussions);

export const {
  fetchDiscussons,
} = discussionsSlice.actions;

export default discussionsSlice.reducer;
