import React from "react";


export interface IRoute {
    path: string;
    component: React.ElementType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    MAIN = '/',
    REGISTRATION = '/registration',
    EDIT = '/edit'
}
