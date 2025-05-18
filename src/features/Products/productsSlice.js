import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import products from './products';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state) => {
      productsAdapter.setAll(state, products);
    },
  },
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.products);

export const {
  fetchProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
