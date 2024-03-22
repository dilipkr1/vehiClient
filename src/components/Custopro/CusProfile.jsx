import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import SaveAsIcon from "@mui/icons-material/SaveAs";
export default function CusProfile() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    phone1: "",
    phone2: "",
  });
  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user || user.length === 0) {
    return (
      <div className="flex flex-col m-5 p-3   mt-20 pt-20  justify-center items-center">
        <p className="text-logoClr font-extrabold text-2xl font-sans  rounded-sm">
          <p>Loading...</p>
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
        console.log("Phone numbers updated successfully");
        navigate("/profile/updated");
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
    <div className="my-20 pt-20  gap-1 flex flex-col ">
      <div className="flex justify-center items-center gap-5 p-3 bg-logoClr font-bold text-xl">
        <div>
          <Link to="/profile">
            {" "}
            <button className="underline tracking-wide text-xl fotn-bold font-sans px-3 text-white">
              Profile
            </button>
          </Link>
        </div>
        <div>
          <Link to="/profile/orders">
            {" "}
            <button className="underline tracking-wide text-xl fotn-bold font-sans px-3 text-white">
              Orders
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-5  mx-20   px-20 flex  flex-col justify-center items-center  gap-1">
        <Avatar src="/broken-image.jpg" />
        <div className="flex grid-col-3 justify-start ">
          {user.map((customer, index) => (
            <div className="flex gap-2" key={index}>
              <div>
                <p>Name: {customer.customerName}</p>
              </div>
              <div>
                <p>Phone: {customer.customerPhone}</p>
              </div>
            </div>
          ))}
        </div>

  
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap   w-full mt-3 gap-4">
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
                // placeholder="Your Mobile Number 1 (e.g., 9876543210)"
                required
              />
            </div>
            <div className="g:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="phone2">
                Family Contact Number 2
              </label>
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
            <button type="submit">
              <SaveAsIcon />
            </button>

            {/* <button><EditIcon/> </button> */}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
