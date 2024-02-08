import React from 'react';
import './App.css';
import Router from './page/Route';
import { AuthProvider } from './authContext/authProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
