import React, {FC} from 'react';
import MainAppBar from "../components/navbar/MainAppBar";
import {ISuperhero} from "../models/ISuperhero";
import HeroPage from "../components/heroes/HeroPage";
import './editing.css';
import {useAppSelector} from "../hooks/redux";
import HeroEditCreate from "../components/heroes/HeroEditCreate";

interface IEditingProps {
    hero?: ISuperhero;
}

const Editing:FC<IEditingProps> = ({hero}) => {
    const {onlyRead} = useAppSelector(state => state.superheroReducer);
    return (
        <div>
            <MainAppBar />
            {onlyRead ? <HeroPage /> : <HeroEditCreate/>}
        </div>
    );
};

export default Editing;
