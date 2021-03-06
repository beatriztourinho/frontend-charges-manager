import React from "react";
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import ClientDetails from '../../pages/ClientDetails';
import Dashboard from '../../pages/Dashboard';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Component from "../../pages/Component";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/component" element={<><Component /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute redirectTo='login' />} >
                <Route path="/" element={<Home />} />
                <Route path="/client-details" element={<ClientDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

function PrivateRoute({ redirectTo }) {
    const { getItem } = useLocalStorage()
    const isAuthorized = getItem('token')
    return isAuthorized ? <Outlet /> : <Navigate to={redirectTo} />
}