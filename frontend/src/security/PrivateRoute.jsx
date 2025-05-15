import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './useAuth';
import Cookies from "js-cookie";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    console.log("AUTH " + isAuthenticated() + " token: " + Cookies.get('accessToken'))
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
