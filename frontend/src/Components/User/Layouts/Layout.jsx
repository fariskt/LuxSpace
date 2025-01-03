import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();
  const hideRoutes = ["/login", "/signup"];
  const HideNavbar = hideRoutes.includes(location.pathname);

  return (
    <>
      {!HideNavbar && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
