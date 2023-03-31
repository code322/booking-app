import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import {
  accessTokenSelector,
  isLoggedInSelector,
  logout,
} from '../state/authSlicer/authSlicer';

import { axiosPrivate } from '../helpers/api';
const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const accessToken = useAppSelector(accessTokenSelector);
  const [isAuth, setIsAuth] = useState<boolean | null>(isLoggedIn);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const isAuth = async () => {
      if (!accessToken) {
        return;
      }
      try {
        await axiosPrivate.get(`/api/auth/private-routes`);
        setIsAuth(true);
      } catch (error) {
        dispatch(logout() as any);
        setIsAuth(false);
      }
    };
    isAuth();
  }, [accessToken, dispatch]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
