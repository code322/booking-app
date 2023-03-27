import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsLoggedLocalStorage } from './auth';
import axios from 'axios';
import { API_URL } from '../helpers/api';

const PrivateRoutes = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(
    IsLoggedLocalStorage.getIsLoggedIn()
  );
  useEffect(() => {
    const isAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/refresh`);
        IsLoggedLocalStorage.setIsLoggedInTrue();
        setIsAuth(true);
      } catch (error) {
        IsLoggedLocalStorage.setIsLoggedInFalse();
        setIsAuth(false);
      }
    };
    isAuth();
  }, []);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
