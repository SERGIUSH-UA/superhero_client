import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../models/IUser";
import {IToken} from "../models/IToken";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    tagTypes: ['User'],
    endpoints: (build) => ({
          // login: build.mutation(),
        checkAuth: build.query<IUser, string>({
            query: (token:string) => {
                return {
                    url: `/auth/check/${token}`
                }
            }, providesTags: result => ['User']
        }),
        login: build.mutation<IToken, IUser>({
            query: (user:IUser) => {
                return {
                    url: `/auth/login`,
                    method: 'POST',
                    body: user
                }
            }, invalidatesTags: ['User']
        }),
        registration: build.mutation<IToken, IUser>({
            query: (user:IUser) => {
                return {
                    url: `/auth/registration`,
                    method: 'POST',
                    body: user
                }
            }, invalidatesTags: ['User']
        })
    })

})