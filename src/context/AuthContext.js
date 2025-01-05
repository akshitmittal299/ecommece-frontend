// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import {jwtDecode as jwt_decode} from 'jwt-decode';

const AuthContext = createContext();

const isTokenValid = (token) => {
  const decoded = jwt_decode(token);
  const now = Date.now() / 1000; // Current time in seconds
  return decoded.exp > now; // Check if token has expired
};

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (!storedTokens) return null;

    const parsedTokens = JSON.parse(storedTokens);
    if (isTokenValid(parsedTokens.access)) {
      return parsedTokens;
    } else {
      localStorage.removeItem('authTokens');
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    return authTokens ? jwt_decode(authTokens.access) : null;
  });

  const login = (tokens) => {
    setAuthTokens(tokens);
    setUser(jwt_decode(tokens.access));
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const refreshTokens = useCallback(async () => {
    if (!authTokens || !authTokens.refresh) {
      console.warn('No refresh token available');
      logout();
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh tokens:', error);
      logout();
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) {
      const decoded = jwt_decode(authTokens.access);

      // Schedule token refresh
      const refreshTime = (decoded.exp * 1000) - Date.now() - 60000; // Refresh 1 minute before expiry
      const refreshInterval = setInterval(() => {
        refreshTokens();
      }, refreshTime);

      // Schedule logout when access token expires
      const expiryTime = (decoded.exp * 1000) - Date.now();
      const logoutTimer = setTimeout(() => {
        logout();
      }, expiryTime);

      return () => {
        clearInterval(refreshInterval);
        clearTimeout(logoutTimer);
      };
    }
  }, [authTokens, refreshTokens]);

  const contextData = {
    user,
    authTokens,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
