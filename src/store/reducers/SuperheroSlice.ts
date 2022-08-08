import {ISuperhero} from "../../models/ISuperhero";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IImagesArray {
    img: string;
    title: string;
}

interface SuperheroState {
    superhero: ISuperhero;
    onlyRead: boolean;
    error: string;
    id: number;
    images_array: IImagesArray[];
    removeImg: string;
    mainImg: string;
}

const initialState: SuperheroState = {
    superhero: {id: -1, nickname:'',origin_description:'', superpowers:'', real_name:'', catch_phrase:'', main_image:'',
    author_id: 0, createdAt: '', followers: [], images: '', images_string: ''},
    onlyRead: true,
    error: '',
    id: 0,
    images_array: [],
    removeImg: '',
    mainImg: ''
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
            if (state.superhero.images !== ''){
                const img_arr = state.superhero.images.split(';');
                state.images_array = [];
                img_arr.forEach((img, index)=> {
                    if(img) {state.images_array.push({img,
                    title: state.superhero.nickname + '_0' + index})}})
            }
            state.mainImg = state.superhero.main_image;
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
        },
        resetSup(state){
            state.superhero = initialState.superhero;
            state.removeImg = initialState.removeImg;
            state.images_array = initialState.images_array;
            state.mainImg = initialState.mainImg;
        },
        addToRemoveImg(state,  action: PayloadAction<string>) {
            state.removeImg = state.removeImg + action.payload + ';';
        },
        setMainImg(state,  action: PayloadAction<string>) {
            state.mainImg = action.payload;
        },

    }
})

export default superheroSlice.reducer;