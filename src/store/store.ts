import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import superheroReducer from './reducers/SuperheroSlice'
import {userAPI} from "../services/user.service";
import {superheroAPI} from "../services/superhero.service";

const rootReducer = combineReducers({
    userReducer,
    superheroReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [superheroAPI.reducerPath]: superheroAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware).concat(superheroAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];