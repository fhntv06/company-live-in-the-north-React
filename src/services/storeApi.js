import apiSlice from './apiSlice';
import { formatParams, normalizeToCamelKeys } from '../helpers/format';

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ limit, skip, filters }) => formatParams('warehouse-products', { skip, limit }, filters),
      transformResponse: (response) => ({
        data: response.data.map((item) => normalizeToCamelKeys(item)),
        totalCount: response.count,
        categories: Object.keys(response.categories).map((key) => (
          { value: key, label: response.categories[key] }
        )),
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `warehouse-products/${id}`,
      transformResponse: (response) => normalizeToCamelKeys(response.data),
      providesTags: ['Product'],
    }),
    getSimilarProducts: builder.query({
      query: (id) => `warehouse-products?filter[exclude]=${id}&limit=6`,
      transformResponse: (response) => (
        response.data.map((item) => normalizeToCamelKeys(item))
      ),
      providesTags: ['Product'],
    }),
    addInCart: builder.mutation({
      query: (id) => ({
        url: 'cart-products',
        method: 'POST',
        body: {
          warehouse_product_id: id.id,
        },
      }),
      invalidatesTags: (result, error, arg) => (arg.invalidate ? ['Product', 'Cart'] : ['Cart']),
    }),
    increaseProductInCart: builder.mutation({
      query: (id) => ({
        url: `cart-products/${id}/increase`,
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
    decreaseProductInCart: builder.mutation({
      query: (id) => ({
        url: `cart-products/${id}/decrease`,
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `cart-products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart', 'Product'],
    }),
    deleteMultipleProducts: builder.mutation({
      query: (ids) => ({
        url: 'cart-products/destroy-selected',
        method: 'POST',
        body: {
          cart_product_ids: ids,
        },
      }),
      invalidatesTags: ['Cart', 'Product'],
    }),
    createOrder: builder.mutation({
      query: (ids) => ({
        url: 'orders/checkout',
        method: 'POST',
        body: {
          cart_product_ids: ids,
        },
      }),
      transformResponse: (response) => ({
        totalSum: response.total_sum,
        orders: response.data.map((item) => normalizeToCamelKeys(item)),
      }),
    }),
    confirmOrder: builder.mutation({
      query: (data) => ({
        url: 'orders/confirm',
        method: 'POST',
        body: { orders: data },
      }),
      invalidatesTags: ['Cart', 'Product'],
    }),
    getStoreFaqs: builder.query({
      query: () => 'faqs?type=2',
      transformResponse: (response) => response.data,
    }),
    getPartners: builder.query({
      query: () => 'partners',
      transformResponse: (response) => response.data.map((item) => normalizeToCamelKeys(item)),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetSimilarProductsQuery,
  useAddInCartMutation,
  useIncreaseProductInCartMutation,
  useDecreaseProductInCartMutation,
  useDeleteFromCartMutation,
  useDeleteMultipleProductsMutation,
  useCreateOrderMutation,
  useAddProductInFavoritesMutation,
  useConfirmOrderMutation,
  useGetStoreFaqsQuery,
  useGetPartnersQuery,
} = storeApi;
