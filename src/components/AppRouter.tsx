import React, {FC} from 'react';
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "../pages/login";
import Main from "../pages/main";
import Register from "../pages/register";
import {RouteNames} from "../router";
import {Edit} from "@mui/icons-material";
import Editing from "../pages/editing";

const AppRouter: FC = () => {
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
