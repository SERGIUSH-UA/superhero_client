import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISuperhero} from "../models/ISuperhero";
import {IUser} from "../models/IUser";

interface IFetchAll {
    count: number;
    rows: ISuperhero[]
}

export const superheroAPI = createApi({
    reducerPath: 'superheroAPI',
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    endpoints: (build) => ({
        // login: build.mutation(),
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
            }
        }),
        fetchOne: build.query<ISuperhero, number>({
            query: (id: number) => {
                return {
                    url: `/api/superheros/${id}`
                }
            }
        }),
        create: build.mutation<ISuperhero, ISuperhero>({
            query: (hero:ISuperhero) => {
                return {
                    url: `/api/superheros`,
                    method: 'POST',
                    body: hero
                }
            }
        }),
        update: build.mutation<ISuperhero, ISuperhero>({
            query: (hero) => {
                return {
                    url: `/api/superheros/${hero.id}`,
                    method: 'PUT',
                    body: hero
                }
            }
        }),
        delete: build.mutation<ISuperhero, ISuperhero>({
            query: (hero: ISuperhero) => {
                return {
                    url: `/api/superheros/${hero.id}`,
                    method: 'DELETE'
                }
            }
        }),
        addFavorite: build.mutation<IUser, any>({
            query: (arg) => {
                console.log(arg)
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