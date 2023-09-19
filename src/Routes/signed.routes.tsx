import React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';

import Main from '../Pages/Main';

const DefaultRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Main} path="/" />
                <Route Component={Main} path="/home" />
            </Routes>
        </BrowserRouter>
    );
}

export default DefaultRoutes;