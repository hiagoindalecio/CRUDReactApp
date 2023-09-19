import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './Contexts/auth';
//import { PeopleProvider } from './contexts/people';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
        {/*<PeopleProvider>*/}
        <Routes />
        {/*</PeopleProvider>*/}
    </AuthProvider>
  );
}

export default App;