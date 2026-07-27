import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('rune_token'));
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('rune_token');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (token) {
      api
        .get('/auth/me')
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token, logout]);

  const login = useCallback((authToken, userData) => {
    localStorage.setItem('rune_token', authToken);
    setToken(authToken);
    setUser(userData);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      isAdmin: user?.role === 'ADMIN',
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
