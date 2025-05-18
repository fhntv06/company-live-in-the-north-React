import { createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import projects from './projects';

export const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState();

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjects: (state) => {
      projectsAdapter.setAll(state, projects);
    },
  },
});

export const getProject = (state, type) => state.find((project) => project.project_type === type);

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectsById,
} = projectsAdapter.getSelectors((state) => state.projects);

export const {
  fetchProjects,
} = projectsSlice.actions;

export const selectProjectCozyYamal = createSelector(
  selectAllProjects,
  getProject(projects, 'yamal'),
);

export default projectsSlice.reducer;
