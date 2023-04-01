import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
