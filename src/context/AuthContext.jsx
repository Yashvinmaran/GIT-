// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  useEffect(() => {
    // Check if user is already logged in via token
    const validateToken = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      
      try {
        // Set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch user data
        const res = await api.get('/users/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Token validation failed:', err);
        // Clear invalid token
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      } finally {
        setAuthLoading(false);
      }
    };
    
    validateToken();
  }, [token]);
  
  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Login failed. Please check your credentials.' 
        };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };
  
  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Registration failed. Please try again.' 
        };
      }
    } catch (err) {
      console.error('Registration error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };
  
  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/users/profile', profileData);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update profile. Please try again.' 
      };
    }
  };
  
  const resetPassword = async (email) => {
    try {
      await api.post('/auth/reset-password', { email });
      return { success: true };
    } catch (err) {
      console.error('Password reset error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to send reset email. Please try again.' 
      };
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};