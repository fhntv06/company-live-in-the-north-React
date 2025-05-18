import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import events from './events';

export const eventsAdapter = createEntityAdapter();

const initialState = eventsAdapter.getInitialState();

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEvents: (state) => {
      eventsAdapter.setAll(state, events);
    },
  },
});

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
} = eventsAdapter.getSelectors((state) => state.events);

export const {
  fetchEvents,
} = eventsSlice.actions;

export const selectByType = createSelector(
  selectAllEvents,
  (_, category) => category,
  (items, category) => {
    if (!category) {
      return items;
    }

    return items.filter((item) => item.category.sysName === category);
  },
);

export const selectEventsByPlaceId = createSelector(
  selectAllEvents,
  (_, placeId) => placeId,
  (items, placeId) => items.filter((item) => (
    item.places?.find((el) => el.id === parseInt(placeId, 10))
  )),
);

export const selectEventsByPushkinsCard = createSelector(
  selectAllEvents,
  (items) => items.filter((item) => {
    if (!item.organization) return false;
    return item.organization.isPushkinsCard;
  }),
);

export default eventsSlice.reducer;
