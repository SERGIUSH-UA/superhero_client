import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    favorite_superheros_ids: number[];
    isLoading: boolean;
    error: string;
    auth: boolean;
    token: string;
}

const initialState: UserState = {
    user: {email:'', password: '', id: 0, username: '', token: '', created_superheros: [], favorite_superheros: []
    },
    isLoading: false,
    error: '',
    auth: false,
    favorite_superheros_ids:[],
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload;
            if(state.user.id){
                state.auth = true;
                state.isLoading = false;
                state.favorite_superheros_ids = [];
                state.user.favorite_superheros.forEach(hero => state.favorite_superheros_ids.push(hero.id))
            }
        },
        setToken(state, action: PayloadAction<string>){
            state.token = action.payload;
            state.auth = true;
        },
        reset(state) {
            state.user = initialState.user;
        }
    },
})

export default userSlice.reducer;