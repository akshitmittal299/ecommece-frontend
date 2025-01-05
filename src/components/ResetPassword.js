// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [new_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or expired token.', { position: 'top-right' });
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/reset-password/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Password reset successfully. Please log in.', {
          position: 'top-right',
        });
        navigate('/login');
      } else {
        toast.error(data.message || 'Error resetting password.', { position: 'top-right' });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            style={{ backgroundColor: '#bcbcad3b' }}
        >
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={new_password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            Reset Password
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

export default ResetPassword;
