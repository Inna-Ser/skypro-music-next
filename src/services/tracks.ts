import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
    reducerPath: "tracksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://skypro-music-api.skyeng.tech",
    }),
    endpoints: (builder) => ({
        getAllTracks: builder.query({
            query: () => "catalog/track/all",
        }),
        todoLike: builder.mutation({
            query: (id) => `catalog/track/${id}`
        }),
        todoDislike: builder.mutation({
            query: (id) => `catalog/track/${id}`
        }),
    }),
});

export const {
    useGetAllTracksQuery,
    useTodoLikeMutation,
    useTodoDislikeMutation,
} = tracksApi;