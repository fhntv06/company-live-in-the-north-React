import { createSlice } from '@reduxjs/toolkit';
import { profileApi } from '../../services/profileApi';

const initialState = {
  favorites: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(profileApi.endpoints.getUserAllFavorites.matchFulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const {
  setFavorites,
} = favoritesSlice.actions;

export const getFavorites = (state) => state.favorites;
export const getIsFavorite = (state, type, id) => state.favorites[type]?.some(
  (item) => item.favorableId === id,
);

export default favoritesSlice.reducer;
