import React, { useState } from 'react';
import axios from 'axios';

function RegisterDialog({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', {
        username,
        password
      });
      onRegister();
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 h-80 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Register</h2>
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
      <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded w-full">
        Register
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default RegisterDialog;
