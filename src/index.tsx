import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root') as unknown as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
