// src/components/Signup.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(username, password, "herererererer")
      const response = await axios.post('http://localhost:8000/api/signup/', {
        username,
        password,
      });
      login(response.data);  // Assuming the signup returns JWT tokens
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-10">
      <h2 className="text-2xl font-semibold">Signup</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
