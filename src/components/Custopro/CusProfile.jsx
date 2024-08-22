import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SettingsIcon from "@mui/icons-material/Settings";
import CusOrders from "../Custorder/CusOrders";
import Cusconfig from "../CusConfig/Cusconfig";
import loadingGif from "../../images/loading.gif";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";  

export default function CusProfile() {
  const navigate = useNavigate();
  const { state, isAuthenticated } = useContext(AuthContext);
  const { user } = state;
  const [activeTab, setActiveTab] = useState("tab1");
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    email: ""
  });
  const { enqueueSnackbar } = useSnackbar(); // Optional: for notifications

  const baseUrl = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_LOCALAPI
    : process.env.REACT_APP_BACKEND_LIVEAPI;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        mobileNumber: user.mobileNumber || "",
        email: user.email || ""
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    navigate("/login");
  }

 

  const userId = user?._id 

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleCancelClick = () => {
    setEditable(false);
    setFormData({
      username: user.data.username || "",
      mobileNumber: user.data.mobileNumber || "",
      email: user.data.email || ""
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${baseUrl}/update-user/${userId}`, formData);
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setEditable(false);
    } catch (error) {
      enqueueSnackbar("Failed to update profile", { variant: "error" });
      console.error("Error updating profile", error);
    }
  };

  return (
    <div style={{ height: "100vh" }} className="flex flex-col my-20 pt-20">
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="profile tabs"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            value="tab1"
            label="Profile"
            icon={<AccountCircleIcon />}
            iconPosition="start"
          />
          <Tab
            value="tab2"
            label="Orders"
            icon={<Inventory2Icon />}
            iconPosition="start"
          />
          <Tab
            value="tab3"
            label="Configuration"
            icon={<SettingsIcon />}
            style={{ fontSize: "12px" }}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <div className="flex-grow overflow-y-auto">
        {activeTab === "tab2" && <CusOrders />}
        {activeTab === "tab3" && <Cusconfig />}
        {activeTab === "tab1" && (
          <div className="flex justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
              <Avatar
                alt={formData.username}
                src="/broken-image.jpg"
                sx={{ width: 100, height: 100, mb: 4, mx: 'auto' }}
              />
              <div className="flex flex-col gap-4">
                <TextField
                  label="Name"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editable}
                />
                <TextField
                  label="Phone"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editable}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editable}
                />
                <div className="flex justify-end mt-4">
                  {!editable ? (
                    <Button style={{ backgroundColor: "#F68418" }} variant="contained" onClick={handleEditClick}>
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" style={{ backgroundColor: "#C0C0C0", color: "#ffffff", marginRight: "20px" }} onClick={handleCancelClick}>
                        Cancel
                      </Button>
                      <Button style={{ backgroundColor: "#F68418", margiLeft: "20px" }} variant="contained" onClick={handleSaveClick} className="ml-2">
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
