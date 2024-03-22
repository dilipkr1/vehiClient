// components/Signup.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const displayNow = "none";
  const naviagte = useNavigate();
  const [getOtp, setGetOtp] = useState();
  const [send, setSent] = useState("Send Otp");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageOtp, setErrorMessageOtp] = useState(null);

  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

   const handleSendOtp = async () => {
    if (formData.phone.length === 10) {
      setGetOtp(1);
    } else {
      setErrorMessageOtp("please enter you number!");
      return;
    }
    try {
      const url = `${baseUrl}/auth/sendOtp`;

      const response = await axios.post(url, {
        mobileNumber: formData.phone,
      });

      console.log(response.data);
      if (response.data.status === 200) {
        setSent("Otp Sent");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessageOtp("please try, again later");
      } else {
        setErrorMessageOtp("Failed to send OTP. Please try again.");
      }
    }
  }; 

  const handleVerifyOtp = async () => {
    try {
      const url = `${baseUrl}/auth/verify-otp`;
      const response = await axios.post(url, {
        mobileNumber: formData.phone,
        enteredOtp: formData.enteredOtp,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("successfully verified");
        naviagte("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessageOtp(error.response.data.message);
      } else {
        setErrorMessageOtp("Failed to verify OTP. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await handleSendOtp();
      } else {
        const data = await response.json();
        setErrorMessage(
          data.message || "Registration failed. Please try again later."
        );
      }
    } catch (error) {
      console.log("error", errorMessage);
    }
  };

  return (
    <div className="lg:flex justify-between mt-20  pt-10">
      <div className="img w-full mx-5 pl-5">
        <img className="rounded-xl w-full h-auto" src="https://cdn.leonardo.ai/users/e2c6caa2-d846-4b69-b9d3-e029a1ac4231/generations/fe23f836-6e28-4e06-bdf4-f973ac1949c2/Default_Imagine_a_sleek_modern_car_cleaning_facility_bathed_in_0.jpg" alt="" />
      </div>
      <div
        style={{ width: "400px" }}
        class="max-w-md lg:w-70 flex flex-col   mx-10 bg-white  rounded-lg overflow-hidden"
      >
        <div class="text-2xl py-4 px-6 bg-gray-900 text-black text-center font-bold uppercase">
          Register
        </div>
        <form onSubmit={handleSubmit} class="py-4 px-4">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="create your password"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone">
              Phone Number
            </label>
            <div className="flex  justify-between">
              <input
                class="shadow mr-2 appearance-none border  rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                oninput="this.value = this.value.slice(0, 10)"
                placeholder="Enter your phone number"
                required
              />

              {/* <button
                type="button"
                onClick={() => handleSendOtp()}
                class="flex text-xs items-center justify-center flex-none px-3 py-2 md:px-2 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              >
                {send}
              </button> */}
            </div>
          </div>

          <div className="continue">
            {errorMessageOtp && (
              <p className="text-red text-xs font-sans ">{errorMessageOtp}</p>
            )}
          </div>
          {getOtp && (
            <div>
              <h2 class="text-lg font-semibold mb-4">Enter OTP</h2>
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  name="enteredOtp"
                  value={formData.enteredOtp}
                  onChange={handleChange}
                  placeholder="otp"
                  maxLength="6"
                  class="flex mr-2 w-full py-2 px-2 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  class="flex items-center   justify-center flex-none px-4 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-50 text-white   border-t-2 border-b-2 bg-black   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
          {errorMessage && <p className="text-red">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
