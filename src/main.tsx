import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContextProvider } from './utils/UserContext.tsx';
// import './index.css'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
