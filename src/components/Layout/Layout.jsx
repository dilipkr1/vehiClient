import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import React from "react";
import { Outlet, useLocation } from "react-router-dom"; 

function Layout() {
  const location = useLocation();
  const isMessagePage = location.pathname === "/message";

  return (
    <div>
      {!isMessagePage && <Navbar />}
      <Outlet /> 
      <Footer />
    </div>
  );
}

export default Layout;
