import React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';

import Main from '../Pages/Main';
import Configuration from '../Pages/Configuration';

const DefaultRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Main} path="/" />
        <Route Component={Main} path="/home" />
        <Route Component={Configuration} path="/config" />
      </Routes>
    </BrowserRouter>
  );
}

export default DefaultRoutes;