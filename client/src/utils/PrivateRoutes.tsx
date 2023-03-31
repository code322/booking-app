import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsLoggedLocalStorage } from './auth';
import axios from 'axios';
import { API_URL } from '../helpers/api';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { accessTokenSelector, logout } from '../state/authSlicer/authSlicer';

import { axiosPrivate } from '../helpers/api';
const PrivateRoutes = () => {
  const accessToken = useAppSelector(accessTokenSelector);
  const [isAuth, setIsAuth] = useState<boolean | null>(
    IsLoggedLocalStorage.getIsLoggedIn()
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    const isAuth = async () => {
      if (!accessToken) {
        // setIsAuth(false);
        return;
      }
      try {
        await axiosPrivate.get(`/api/auth/private-routes`);
        IsLoggedLocalStorage.setIsLoggedInTrue();
        setIsAuth(true);
      } catch (error) {
        IsLoggedLocalStorage.setIsLoggedInFalse();
        dispatch(logout() as any);
        setIsAuth(false);
      }
    };
    isAuth();
  }, [accessToken, dispatch]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
