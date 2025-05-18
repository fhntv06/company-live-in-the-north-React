import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import cozyYamal from './cozyYamal';

export const cozyYamalAdapter = createEntityAdapter();

const initialState = cozyYamalAdapter.getInitialState();

const cozyYamalSlice = createSlice({
  name: 'cozy-yamal',
  initialState,
  reducers: {
    fetchCozyYamalData: (state) => {
      cozyYamalAdapter.setAll(state, cozyYamal);
    },
  },
});

export const {
  selectAll: selectAllcozyYamalData,
  selectById: selectCozyYamalDataById,
} = cozyYamalAdapter.getSelectors((state) => state.cozyYamalData);

export const {
  fetchCozyYamalData,
} = cozyYamalSlice.actions;

export default cozyYamalSlice.reducer;
