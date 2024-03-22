import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Workdetails from "../Howworks/Workdetails";
import Bestsellingpro from "../Bestproduct/Bestsellingpro";
import Parking from "../Parkingtags/ParkingTag";
import Contact from "../Contact/Contact";

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
