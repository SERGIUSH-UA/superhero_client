import {ISuperhero} from "../../models/ISuperhero";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SuperheroState {
    superhero: ISuperhero;
    onlyRead: boolean;
    error: string;
    id: number;
}

const initialState: SuperheroState = {
    superhero: {id: -1, nickname:'',origin_description:'', superpowers:'', real_name:'', catch_phrase:'', main_image:'',
    author_id: 0, createdAt: '', followers: [], images: [], images_array: [], images_string: ''},
    onlyRead: true,
    error: '',
    id: 0
}

export const superheroSlice = createSlice({
    name: 'superhero',
    initialState,
    reducers:{
        setOnlyRead(state, action: PayloadAction<boolean>){
            state.onlyRead = action.payload;
        },
        setId(state, action: PayloadAction<number>){
            state.id = action.payload;
        },
        setHero(state, action: PayloadAction<ISuperhero>){
            state.superhero = action.payload;
        },
        setSupNickname(state, action: PayloadAction<string>){
            state.superhero.nickname = action.payload;
        },
        setSupOriginDescription(state, action: PayloadAction<string>){
            state.superhero.origin_description = action.payload;
        },
        setSupSuperpowers(state, action: PayloadAction<string>){
            state.superhero.superpowers = action.payload;
        },
        setSupRealName(state, action: PayloadAction<string>){
            state.superhero.real_name = action.payload;
        },
        setSupCatchPhrase(state, action: PayloadAction<string>){
            state.superhero.catch_phrase = action.payload;
        }

    }
})

export default superheroSlice.reducer;