import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import { Switch } from "@mui/material";

const Cusconfig = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [activeTab, setActiveTab] = useState("tab1");
  const [errorMessage, setErrorMessage] = useState(null);
  const [value, setValue] = useState(user[0]?.isAllowedPhone || false);
  const [valueMsg, setValueMsg] = useState(user[0]?.isAllowedMsg || false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    phone1: user[0]?.phone1 || "",
    phone2: user[0]?.phone2 || "",
    isAllowedPhone: user[0]?.isAllowedPhone || false,
    isAllowedmsg: user[0]?.isAllowedMsg || false,
  });

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleClickCall = (e) => {
    const newValue = e.target.checked;
    setValue(newValue);
  };
  const handleClickMesg = (e) => {
    const newValue = e.target.checked;
    setValueMsg(newValue);
  };

  const handleChangePhoneCall = (e) => {
    const newValue = e.target.checked;
    setFormData((prevFormData) => ({
      ...prevFormData,
      isAllowPhone: newValue,
    }));
  };

  const handleChangeMessage = (e) => {
    const newValue = e.target.checked;

    setFormData((prevFormData) => ({ ...prevFormData, isAllowMsg: newValue }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user || user.length === 0) {
    return (
      <div className="flex flex-col m-5 p-3   mt-20 pt-20  justify-center items-center">
        <p className="text-logoClr font-extrabold text-2xl font-sans  rounded-sm">
          <p>User Not Found...</p>
        </p>
      </div>
    );
  }

  const userId = user[0]?.userId;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseUrl}/contacts/update-number`,
        {
          ...formData,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        console.error("Failed to update phone numbers");
        throw new Error(
          response.data.message || "Failed to update phone numbers"
        );
      }
    } catch (error) {
      console.error("Error updating phone numbers:", error.message);
      throw new Error(
        "An unexpected error occurred while updating phone numbers"
      );
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col    w-full mt-3 gap-4">
            <div className="g:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="phone1">
                Family Contact Number 1
              </label>
              <input
                className="w-90 rounded formInput mr-10"
                type="tel"
                id="phone1"
                name="phone1"
                defaultValue={user[0].phone1}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                oninput="this.value = this.value.slice(0, 10)"
                placeholder="Your Mobile Number 1 (e.g., 9876543210)"
                // required
              />
            </div>
            <div className="g:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="phone2">
                Family Contact Number 2
              </label>{" "}
              <input
                className="w-90 rounded formInput mr-10"
                type="tel"
                id="phone2"
                name="phone2"
                defaultValue={user[0].phone2}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                oninput="this.value = this.value.slice(0, 10)"
                placeholder="Your Mobile Number 2 (e.g., 9876543210)"
              />
            </div>

            <div className="flex">
              Disable Spam Call
              <Switch
                name="isAllowPhone"
                onClick={handleClickCall}
                onChange={handleChangePhoneCall}
                // defaultValue={value}
                checked={value}
                disabled={false}
              />
            </div>
            <div className="flex">
              Disable Spam Messge
              <Switch
                name="isAllowMsg"
                onClick={handleClickMesg}
                onChange={handleChangeMessage}
                checked={valueMsg}
                // defaultValue={user[0].valueMsg}
                disabled={false}
              />
            </div>

            <div className="flex justify-between">
              <button className=" bg-logoClr text-sm p-2 rounded" type="submit">
                UPDATE
              </button>
              {showMessage && (
                <p className="ml-5 text-main text-xs font-bold">
                  Updated Successfully
                </p>
              )}
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cusconfig;
