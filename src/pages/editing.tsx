import React, {FC} from 'react';
import MainAppBar from "../components/navbar/MainAppBar";
import {ISuperhero} from "../models/ISuperhero";
import HeroPage from "../components/HeroPage";
import './editing.css';

interface IEditingProps {
    hero?: ISuperhero;
}

const Editing:FC<IEditingProps> = ({hero}) => {

    return (
        <div>
            <MainAppBar />
            <HeroPage />
        </div>
    );
};

export default Editing;
