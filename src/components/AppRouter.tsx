import React, {FC, useEffect} from 'react';
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "../pages/login";
import Main from "../pages/main";
import Register from "../pages/register";
import {RouteNames} from "../router";
import Editing from "../pages/editing";
import {userSlice} from "../store/reducers/UserSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {userAPI} from "../services/user.service";

const AppRouter: FC = () => {

    const {token} = useAppSelector(state => state.userReducer)
    const {setUser, setToken} = userSlice.actions;
    const dispatch = useAppDispatch();

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
            dispatch(setToken(localToken));
        }
    },[])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={RouteNames.LOGIN} element={<Login/>}/>
                <Route path={RouteNames.REGISTRATION} element={<Register/>}/>
                <Route path={RouteNames.MAIN} element={<Main/>}/>
                <Route path={RouteNames.EDIT} element={<Editing/>}/>
                <Route path={'*'} element={<Navigate to="/" replace={true} />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
