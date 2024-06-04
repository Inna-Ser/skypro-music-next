import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/user",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password, username }) => ({
        url: "/signup/",
        method: "POST",
        body: {
          email,
          password,
          username,
        },
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login/",
        method: "POST",
        body: {
          email,
          password,
        },
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

// export const {
//     useSignUpMutation,
//     useSignInMutation
// } = authApi

export const useSignUpMutation = () => authApi.endpoints.signUp.useMutation();
export const useSignInMutation = () => authApi.endpoints.signIn.useMutation();
