import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsLoggedLocalStorage } from './auth';
import axios from 'axios';
import { API_URL, axiosPrivate } from '../helpers/api';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { logout } from '../state/authSlicer/authSlicer';

const PrivateRoutes = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(
    IsLoggedLocalStorage.getIsLoggedIn()
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    const isAuth = async () => {
      try {
        await axiosPrivate.get(`/api/auth/private-routes`);
        // IsLoggedLocalStorage.setIsLoggedInTrue();
        setIsAuth(true);
      } catch (error) {
        IsLoggedLocalStorage.setIsLoggedInFalse();
        dispatch(logout() as any);
        setIsAuth(false);
        console.log(error);
      }
    };
    isAuth();
  }, []);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
