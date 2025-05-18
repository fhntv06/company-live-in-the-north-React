import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbackIsClosed: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    closeFeedback: (state = initialState) => {
      state.feedbackIsClosed = false;
    },
    openFeedback: (state = initialState) => {
      state.feedbackIsClosed = true;
    },
  },
});

export const {
  closeFeedback,
  openFeedback,
} = feedbackSlice.actions;

export const getFeedbackIsClosedState = (state) => state.feedback?.feedbackIsClosed;

export default feedbackSlice.reducer;
