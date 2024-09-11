import React, { useState } from 'react';
import axios from 'axios';

function LoginDialog({ onLogin, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.access_token);
      onLogin();
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 h-80 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded w-full">
        Login
      </button>
      <p className="mt-4">
        Don't have an account?{' '}
        <button onClick={onRegister} className="text-blue-500">
          Register
        </button>
      </p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default LoginDialog;
