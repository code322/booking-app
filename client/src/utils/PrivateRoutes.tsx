import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsLoggedLocalStorage } from './auth';

const PrivateRoutes = () => {
  const isLoggedIn = IsLoggedLocalStorage.getIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
