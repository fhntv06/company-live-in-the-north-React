import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totalSum: 0,
  confirmed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, { payload }) => {
      state.orders = payload.orders;
      state.totalSum = payload.totalSum;
      state.confirmed = false;
    },
    confirm: (state) => {
      state.confirmed = true;
    },
    clear: (state) => {
      state.orders = [];
      state.totalSum = 0;
      state.confirmed = false;
    },
  },
});

export const { createOrder, confirm, clear } = orderSlice.actions;

export const selectOrderData = (state) => ({
  orders: state.order.orders,
  totalSum: state.order.totalSum,
  confirmed: state.order.confirmed,
});

export default orderSlice.reducer;
