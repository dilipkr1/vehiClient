import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import SaveAsIcon from "@mui/icons-material/SaveAs";
import CusOrders from "../Custorder/CusOrders";
import Cusconfig from "../CusConfig/Cusconfig";
export default function CusProfile() {
  const navigate = useNavigate();
  const { state, isAuthenticated } = useContext(AuthContext);
  const { user } = state;
  // const [loading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");

  if (!isAuthenticated) {
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="text-xl font-sans tracking-wide">User Not Found</div>
    );
  }

 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="my-20 pt-20  gap-1 flex flex-col "
    >
      <div className="flex justify-center items-center gap-5 p-3 bg-logoClr font-bold text-xl">
        <div className={`tab1 ${activeTab === "tab1" ? "active" : ""}`}>
          <button
            onClick={() => handleTabClick("tab1")}
            className="underline tracking-wide text-xl fotn-bold font-sans px-3 text-white"
          >
            Profile
          </button>
        </div>
        <div className={`tab2 ${activeTab === "tab2" ? "active" : ""}`}>
          <button
            onClick={() => handleTabClick("tab2")}
            className="underline tracking-wide text-xl fotn-bold font-sans px-3 text-white"
          >
            Orders
          </button>
        </div>
        <div className={`tab3 ${activeTab === "tab3" ? "active" : ""}`}>
          <button
            onClick={() => handleTabClick("tab3")}
            className="underline tracking-wide text-xl fotn-bold font-sans px-3 text-white"
          >
            Config..
          </button>
        </div>
      </div>
      {activeTab === "tab2" && <CusOrders />}
      {activeTab === "tab3" && <Cusconfig />}

      {activeTab === "tab1" && (
        <div className="mt-5  mx-20   px-20 flex  flex-col justify-center items-center  gap-1">
          <Avatar src="/broken-image.jpg" />
          <div className="flex grid-col-3 justify-start ">
            {user.map((customer, index) => (
              <div
                className="lg:flex justify-center items-center gap-2"
                key={index}
              >
                <div>
                  <p>Name: {customer.customerName}</p>
                </div>
                <div>
                  <p>Phone: {customer.customerPhone}</p>
                </div>
                <div>
                  <p>Email: {customer.customerEmail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
