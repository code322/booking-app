import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { isLoggedInSelector } from '../state/auth/authSlice';

import { axiosPrivate } from '../helpers/api';
const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const [isAuth, setIsAuth] = useState<boolean | null>(isLoggedIn);
  const location = useLocation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const isAuth = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        await axiosPrivate.get(`/api/auth/private-routes`);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    isAuth();
  }, [isLoggedIn, dispatch]);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
