import {ISuperhero} from "../../models/ISuperhero";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SuperheroState {
    // superhero: ISuperhero;
    isLoading: boolean;
    error: string;
    id: number;
}

const initialState: SuperheroState = {
    // superhero: {id:0, nickname:'',origin_description:'', superpowers:'', real_name:'', catch_phrase:'',},
    isLoading: false,
    error: '',
    id: 0
}

export const superheroSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // setHero(state, action: PayloadAction<ISuperhero>){
        //     // state.superhero = action.payload;
        //     state.isLoading = false;
        // },
        setId(state, action: PayloadAction<number>){
            state.id = action.payload;
        }
    }
})

export default superheroSlice.reducer;