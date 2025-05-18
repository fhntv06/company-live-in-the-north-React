import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationIsClosed: false,
  notifications: null,
  isFetching: false,
  readNotifications: null,
  unreadNotifications: null,
  unreadCounter: 0,
  notification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state = initialState, action) => {
      state.notifications = action.payload;
    },
    setReadNotifications: (state = initialState, action) => {
      state.readNotifications = action.payload;
    },
    setUnreadNotifications: (state = initialState, action) => {
      state.unreadNotifications = action.payload;
      state.unreadCounter = action.payload.length;
    },
    setNotification: (state = initialState, action) => {
      state.notification = action.payload;
    },
    closeNotification: (state = initialState) => {
      state.notificationIsClosed = true;
    },
    openNotification: (state = initialState) => {
      state.notificationIsClosed = false;
    },
    setIsFetching: (state = initialState, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setNotification,
  setNotifications,
  setReadNotifications,
  setUnreadNotifications,
  setIsFetching,
  closeNotification,
  openNotification,
} = notificationSlice.actions;

export const getAllNotifications = (state) => state.notifications;
export const getReadNotifications = (state) => state.readNotifications;
export const getUnreadNotifications = (state) => state.unreadNotifications;
export const getRecentUnreadNotification = (state) => state.notification;
export const getUnreadCounter = (state) => state.unreadCounter;
export const getNotificationIsClosedState = (state) => state.notificationIsClosed;
export const getIsFetching = (state) => state.isFetching;

export default notificationSlice.reducer;
