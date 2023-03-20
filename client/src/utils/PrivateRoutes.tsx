import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsLoggedLocalStorage } from './auth';
import axios from 'axios';
import { API_URL } from '../helpers/api';

const PrivateRoutes = () => {
  const [state, setState] = useState<boolean | null>(false);
  useLayoutEffect(() => {
    const isAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/refresh`);
        setState(true);
        IsLoggedLocalStorage.setIsLoggedInTrue();
      } catch (error) {
        setState(false);
        IsLoggedLocalStorage.setIsLoggedInFalse();
      }
    };
    isAuth();
  }, []);
  const isLoggedIn = IsLoggedLocalStorage.getIsLoggedIn();
  console.log(state);

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
