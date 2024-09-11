import React, { useState } from 'react';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loggedIn ? (
        <Dashboard />
      ) : showRegister ? (
        <RegisterDialog onRegister={() => setShowRegister(false)} />
      ) : (
        <LoginDialog 
          onLogin={() => setLoggedIn(true)} 
          onRegister={() => setShowRegister(true)} 
        />
      )}
    </div>
  );
}

export default App;
