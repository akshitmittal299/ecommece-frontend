// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';  // Use Navigate in v6
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;  // Render protected content if the user is authenticated
};

export default PrivateRoute;
