import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// define server user a base url

const appApi = createApi({
  reducerPath: `appApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  endpoints: (builder) => ({
    //   creating user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    //   loginUser
    loginUSer: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: (user) => ({
        url: "/logout",
        method: "DELETE",
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginUSerMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;
