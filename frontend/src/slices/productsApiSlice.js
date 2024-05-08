import { PRODUCT_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({ 
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: PRODUCT_URL,
                params: {
                    keyword,
                    pageNumber,
                },
            }),
            provideTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'DELETE'
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product']
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`
            }),
            keepUnusedDataFor: 5,
        })
    }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery } = productApiSlice;