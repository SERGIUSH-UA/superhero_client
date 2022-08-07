import React, {FC, useEffect, useState} from 'react';
import MainAppBar from "../components/navbar/MainAppBar";
import {userAPI} from "../services/user.service";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import HerosList from "../components/HerosList";
import {userSlice} from "../store/reducers/UserSlice";

const Main: FC = () => {

    const {user} = useAppSelector(state => state.userReducer);
    const {setUser} = userSlice.actions;
    const dispatch = useAppDispatch();

    const [token, setToken] = useState('');;
    const {data: userResp} = userAPI.useCheckAuthQuery(token);
    useEffect(()=> {
        if(userResp){
            dispatch(setUser(userResp));
        }
    }, [userResp])
    useAppDispatch();

    useEffect(()=> {
        const localToken = localStorage.getItem('TOKEN');
        if(localToken){
            setToken(localToken);
        }
    },[])

    return (
        <div>
            <MainAppBar />
            <HerosList />
        </div>
    );
};

export default Main;
