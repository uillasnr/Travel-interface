import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tailwindcss/tailwind.css';
import Routes from './Routes';
import { UserProvider } from './hooks/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserProvider >
      <Routes />
    </UserProvider>

  </>
);