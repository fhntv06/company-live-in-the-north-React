import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import places from './places';

export const placesAdapter = createEntityAdapter();

const initialState = placesAdapter.getInitialState();

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    fetchPlaces: (state) => {
      placesAdapter.setAll(state, places);
    },
  },
});

export const {
  selectAll: selectAllPlaces,
  selectById: selectPlacesById,
} = placesAdapter.getSelectors((state) => state.places);

export const {
  fetchPlaces,
} = placesSlice.actions;

export default placesSlice.reducer;
