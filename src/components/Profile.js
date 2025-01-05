// src/components/ResetPassword.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext.js';
const Profile = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(authTokens, "token herer");
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/get/`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}` ,
         }});

      const data = await response.json();
      console.log(data, "data")
      if (response.ok) {
        if (data.success){
            toast.success(data.message || 'Password reset successfully. Please log in.', {
              position: 'top-right',
            });
            navigate('/');
        }
        else{
            toast.error(data.error || 'Password reset failed.');
        }
      } else {
        toast.error(data[0] || 'Error resetting password.', { position: 'top-right' });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            style={{ backgroundColor: '#bcbcad3b' }}
        >
        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="password"
            placeholder="Old Password"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
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
            Change Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
