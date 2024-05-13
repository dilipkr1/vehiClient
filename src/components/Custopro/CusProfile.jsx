import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CusOrders from "../Custorder/CusOrders";
import Cusconfig from "../CusConfig/Cusconfig";
import Inventory2Icon from "@mui/icons-material/Inventory2";

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
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
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
      <div className="flex flex-col h-screen ">
        <div className="bg-logoClr  flex justify-center items-center gap-14 p-3 font-bold text-xl">
          <button
            className={`tab-button ${
              activeTab === "tab1" ? "active" : ""
            } text-xl`}
            onClick={() => handleTabClick("tab1")}
          >
            <AccountCircleIcon />
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            <Inventory2Icon />
            Orders
          </button>
          <button
            className={`tab-button ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabClick("tab3")}
          >
            <i class="fa-solid fa-gears fa-2x"></i> Configauration
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {activeTab === "tab2" && <CusOrders />}
          {activeTab === "tab3" && <Cusconfig />}
          {activeTab === "tab1" && (
            <div className="m-5 flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <Avatar
                  style={{ fontSize: "40px" }}
                  src="/broken-image.jpg"
                  className="mx-auto mb-4"
                />
                {user.map((customer, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <div className="flex justify-start ">
                        <p className="text-gray-600">Name:</p>
                        <p className="font-semibold">{customer.customerName}</p>
                      </div>
                      <div className="flex justify-start ">
                        <p className="text-gray-600">Phone:</p>
                        <p className="font-semibold">
                          {customer.customerPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start ">
                      <p className="text-gray-600">Email:</p>
                      <p className="font-semibold">{customer.customerEmail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
