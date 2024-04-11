import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import roundLogo from "../../images/vehiclean.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { style } from "@mui/system";

const EyeClosedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#bbb"
    stroke="#bbb"
    className="w-[18px] h-[18px] absolute right-2 cursor-pointer transition-opacity duration-300"
    viewBox="0 0 128 128"
  >
    <path
      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
      data-original="#000220"
    ></path>
  </svg>
);

const EyeOpenIcon = (
  <svg
    fontWeight={900}
    xmlns="http://www.w3.org/2000/svg"
    fill="#bbb"
    stroke="#bbb"
    className="w-[18px] h-[18px] absolute right-2 cursor-pointer transition-opacity duration-300"
    viewBox="0 0 120 128"
  >
    <path
      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
      data-original="#000000"
    ></path>
  </svg>
);

export default function Login() {
  const { setIsAuthenticated, isAuthenticated, state } =
    useContext(AuthContext);
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: " ",
    password: " ",
  });

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgot, setForgot] = useState(null);
  const [showText, setShowText] = useState(true);
  const [otpError, setOtpErrro] = useState(false);
  const [sendText, setSendText] = useState(true);
  const [newPasswrod, setNewPassword] = useState(false);
  const [success, setSuccess] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSendOtp = async () => {
    if (formData.mobileNumber.length !== 10) {
      setError("Please enter your mobile number!");
      return;
    }
    try {
      const url = `${baseUrl}/auth/sendOtp`;
      const response = await axios.post(url, {
        mobileNumber: formData.mobileNumber,
      });

      if (response.status === 200) {
        console.log("successfully sent");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setOtpErrro("Server Err " || error.response.data.message);
      } else {
        setOtpErrro("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleSendBtn = async () => {
    setSendText(false);
    setForgot(true);
    await handleSendOtp();
  };

  const handleForgot = async (e) => {
    setShowText(false);
  };
  const handleVerifyOtp = async () => {
    try {
      const url = `${baseUrl}/auth/verify-otp`;
      const response = await axios.post(url, {
        mobileNumber: formData.mobileNumber,
        enteredOtp: formData.enteredOtp,
      });
      console.log(response);
      if (response.status === 200) {
        setNewPassword(true);
        setForgot(false);
        console.log("successfully verified");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePassowrdType = () => {
    setPasswordType("text");
    if (passwordType == "text") {
      setPasswordType("password");
    }
  };

  const handleChangePassword = async () => {
    console.log("from Change Pass", formData);
    const url = `${baseUrl}/auth/change-pass`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        const { token, existingUser } = response.data;
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload();
      } else {
        const errorData = response.data;
        console.error("Login Error:", errorData);
        setError(errorData.message || "Login Failed. Please try again later.");
      }
    } catch (error) {
      setError("Wrong Credentials" || error);
    }
  };

  useEffect(() => {
    const LoginUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    LoginUser();
  }, [isAuthenticated]);
  return (
    <div className="lg:flex justify-between mt-20  pt-10">
      <div className="img w-full lg:mx-5 lg:pl-5">
        <img
          className="rounded-xl w-full h-auto"
          src="https://cdn.leonardo.ai/users/e2c6caa2-d846-4b69-b9d3-e029a1ac4231/generations/fe23f836-6e28-4e06-bdf4-f973ac1949c2/Default_Imagine_a_sleek_modern_car_cleaning_facility_bathed_in_0.jpg"
          alt=""
        />
      </div>
      <div
        // style={{ width: "400px" }}
        class="max-w-md lg:w-96 flex flex-col   mx-10 bg-white  rounded-lg overflow-hidden"
      >
        <div class="text-2xl py-4 px-6 bg-gray-900 text-black text-center font-bold ">
          Sign In
        </div>
        <div className="flex justify-center">
          {error && <p className="text-red text-sm">{error}</p>}
          {otpError && (
            <p className="text-red text-sm">{"otp error " + otpError}</p>
          )}
        </div>
        <form
          class="max-w-md w-full mx-auto"
          action="#"
          onSubmit={handleSubmit}
        >
          <>
            {newPasswrod && (
              <>
                <div className="mt-8">
                  <div class="relative flex items-center">
                    <input
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                      name="password1"
                      id="password1"
                      required
                      class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter New password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? EyeClosedIcon : EyeClosedIcon}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div class="relative flex items-center">
                    <input
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                      name="password2"
                      id="password2"
                      required
                      class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Confirm password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? EyeClosedIcon : EyeClosedIcon}
                    </div>
                  </div>
                </div>

                <button
                  className="text-white p-2 mt-2 bg-black"
                  onClick={handleChangePassword}
                >
                  Change Now
                </button>
              </>
            )}
            {sendText && (
              <div>
                <div class="relative flex items-center">
                  <input
                    type="tel"
                    name="mobileNumber"
                    id="mobileNumber"
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter Your Mobile Number"
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    oninput="this.value = this.value.slice(0, 10)"
                  />
                </div>
              </div>
            )}
            <div class="mt-8">
              <div class="relative flex items-center">
                {showText && (
                  <>
                    {" "}
                    <input
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? EyeClosedIcon : EyeClosedIcon}
                    </div>{" "}
                  </>
                )}{" "}
                {sendText && !showText ? (
                  <div className="mt-2">
                    {success && (
                      <p style={{ color: "green" }}>
                        Password Changed Sucessfully
                      </p>
                    )}
                    <button
                      className="text-center tracking-wide p-2 bg-black text-white"
                      onClick={handleSendBtn}
                    >
                      Send Otp
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>

          {forgot && (
            <p style={{ color: "green" }} className="text-xs font-sans">
              Otp has been sent on &nbsp;*****{formData.mobileNumber.slice(-2)}
            </p>
          )}
          <div class="flex items-center justify-between gap-2 mt-1">
            {forgot && (
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
          </div>
          {showText && (
            <div>
              <a
                onClick={handleForgot}
                href="jajvascript:void(0);"
                class="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          )}
          {showText && (
            <div class="mt-12">
              <button
                type="submit"
                class="w-full   py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-black hover:bg-logoClr focus:outline-none"
              >
                Sign in
              </button>

              <p class="text-xs text-center mt-8">
                Don't have an account{" "}
                <Link className="text-xs  font-bold underline" to="/signup">
                  Register Here
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
