// src/components/Login.js
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/login/',{
        method : 'Post',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({email,password,})
      });
      if (response.ok){
        const data = await response.json();
        login(data["data"])
        // localStorage.setItem('access', data["data"]["access"]);
        // localStorage.setItem('refresh', data["data"]["refresh"]);
        navigate('/profile');
      }
      else {
        alert("Login Failed")
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-10">
      <h2 className="text-2xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
