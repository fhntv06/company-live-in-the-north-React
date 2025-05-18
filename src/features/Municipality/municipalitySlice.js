import { createSelector, createSlice } from '@reduxjs/toolkit';
import authApi from '../../services/authApi';

const initialState = {
  selectedMunicipality: 10,
  municipalities: [],
  municipalitiesList: [],
  points: [],
};

const municipalitiesSlice = createSlice({
  name: 'municipalities',
  initialState,
  reducers: {
    setMunicipalities: (state, action) => {
      const { data } = action.payload;
      const selectedMunicipality = data.find((item) => item.id === state.selectedMunicipality);
      state.municipalities = action.payload;
      state.points = selectedMunicipality.points;
    },
    setMunicipalitiesList: (state, action) => {
      state.municipalitiesList = action.payload;
    },
    setSelectedMunicipality: (state, action) => {
      state.selectedMunicipality = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.selectedMunicipality = payload.data.user.municipality.id;
    });
  },
});

export const getMunicipalities = (state) => state.municipalities.municipalities;
export const getSelectedMunicipalitiesList = (state) => state.municipalitiesList;
export const getSelectedMunicipality = (state) => state.municipalities.selectedMunicipality;

export const selectAllPoints = (state) => state.municipalities.points;

export const getMunicipalityName = createSelector(
  getMunicipalities,
  getSelectedMunicipality,
  (municipalities, id) => municipalities.data.find((item) => item.id === id).name,
);

export const selectPointByType = createSelector(
  selectAllPoints,
  (_, type) => type,
  (points, type) => (
    points.find((point) => point.type.value === type)
  ),
);

export const {
  setMunicipalities,
  setMunicipalitiesList,
  setSelectedMunicipality,
} = municipalitiesSlice.actions;

export default municipalitiesSlice.reducer;
