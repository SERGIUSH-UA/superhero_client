import React, {FC} from 'react';
import MainAppBar from "../components/navbar/MainAppBar";
import HerosList from "../components/HerosList";

const Main: FC = () => {

    return (
        <div>
            <MainAppBar />
            <HerosList />
        </div>
    );
};

export default Main;
