// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.success){
          toast.success(data.message || 'Password reset link sent successfully!', {
          position: 'top-right',
          });
        // navigate('/login'); // Redirect after success
      }} else {
        toast.error(data.message || 'Error sending reset link.', { position: 'top-right' });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        style={{ backgroundColor: '#bcbcad3b' }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Remembered your password?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
