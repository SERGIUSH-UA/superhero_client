import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISuperhero} from "../models/ISuperhero";
import {IUser} from "../models/IUser";

interface IFetchAll {
    count: number;
    rows: ISuperhero[]
}

interface ICreateUpdate {
    id: number;
    hero: FormData
}

export const superheroAPI = createApi({
    reducerPath: 'superheroAPI',
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    tagTypes:['Superheroes','Hero'],
    endpoints: (build) => ({
        fetchAll: build.query<IFetchAll, any>({
            query: (arg) => {
                const {limit, page} = arg;
                return {
                    url: `/api/superheros`,
                    params:
                        {
                            _limit: limit,
                            _page: page,
                        }
                }
            }, providesTags: result => ['Superheroes']
        }),
        fetchOne: build.query<ISuperhero, number>({
            query: (id: number) => {
                return {
                    url: `/api/superheros/${id}`
                }
            }, providesTags: result => ['Hero']
        }),
        create: build.mutation<ISuperhero, FormData>({
            query: (hero:FormData) => {
                return {
                    url: `/api/superheros`,
                    method: 'POST',
                    //credentials: 'include',
                    body: hero
                }
            }, invalidatesTags: ['Superheroes', 'Hero']
        }),
        update: build.mutation<ISuperhero, ICreateUpdate>({
            query: (arg) => {
                const {hero, id} = arg;
                return {
                    url: `/api/superheros/${id}`,
                    method: 'PUT',
                    //credentials: 'include',
                    body: hero
                }
            }, invalidatesTags: ['Superheroes', 'Hero']
        }),
        delete: build.mutation<ISuperhero, ISuperhero>({
            query: (hero: ISuperhero) => {
                return {
                    url: `/api/superheros/${hero.id}`,
                    method: 'DELETE'
                }
            }, invalidatesTags: ['Superheroes', 'Hero']
        }),
        addFavorite: build.mutation<IUser, any>({
            query: (arg) => {
                const {hero, user} = arg;
                return {
                    url: `/api/superheros/favorite`,
                    method: 'POST',
                    body:{user_id: user.id, superhero_id: hero.id}
                }
            }
        }),
        removeFavorite: build.mutation<IUser, any>({
            query: (arg) => {
                const {hero, user} = arg;
                return {
                    url: `/api/superheros/favorite`,
                    method: 'PUT',
                    body:{user_id: user.id, superhero_id: hero.id}
                }
            }
        }),
    })

})