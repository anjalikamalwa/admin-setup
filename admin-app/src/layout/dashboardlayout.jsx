import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer/footer';

const Dashboardlayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Dashboardlayout;
