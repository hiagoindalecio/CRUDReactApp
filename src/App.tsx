import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './Contexts/auth';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;