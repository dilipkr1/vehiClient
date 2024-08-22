import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { initOTPless } from "../../utils/otpless";


const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [token, setToken] = useState(null);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';
    const uid = localStorage.getItem('uid')


    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      // Debugging purposes
      console.log("Token and authentication set.");

      if (uid) {
        navigate(`/activation?redirect=${encodeURIComponent(redirectTo)}`);
      } else {
        navigate('/shop');
      }
    } else {
      console.log("No token found.");
    }

    // Initialize OTPless
    initOTPless(otpless);

    // Cleanup function to remove otpless from window
    return () => {
      window.otpless = undefined;
    };
  }, [location, navigate, setIsAuthenticated]);

  const handleChange = (e) => {
    setMobile(e.target.value);
  };

  const handleServerLogin = (mobile) => {
    axios.post(`${baseUrl}/auth/login`, { mobileNumber: mobile })
      .then(response => {
        // console.log("Server Response:", response.data);
        const { token, existingUser } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/shop';
        navigate(redirectTo);
        window.location.reload()
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const otpless = (otplessUser) => {
    const mobileMap = otplessUser.identities.find(
      (item) => item.identityType === "MOBILE"
    );

    const mobile = mobileMap?.identityValue;

    // console.log("mobile");

    handleServerLogin(mobile);
  };

  return (
    <div className="mt-20 pt-5">
      <div id="otpless-login-page">
        {!isAuthenticated ? (
          ""
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Login;
