import React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';

import Login from '../Pages/Login';

const DefaultRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Login} path="/" />
                <Route Component={Login} path="/home" />
            </Routes>
        </BrowserRouter>
    );
}

export default DefaultRoutes;