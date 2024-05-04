import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomerContext } from "../../context/customrContext";
import { useNavigate } from "react-router-dom";

const Activate = () => {
  const [formData, setFormData] = useState({
    phone: "",
  });
  const [errorMessageOtp, setErrorMessageOtp] = useState(null);
  const [getOtp, setGetOtp] = useState(false);
  const { customerData } = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [text, setText] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [customerData]);

  if (!customerData || customerData.length === 0) {
    return;
  }

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const customer = customerData.find(
    (customer) => customer.mobileNumber === formData.phone
  );

  const handleSendBtn = async () => {
    if (formData.phone.length === 10) {
      await handleSendOtp();
    } else {
      setErrorMessageOtp("please enter you number!");
      return;
    }
  };

  const handleSendOtp = async () => {
    if (formData.phone.length !== 10) {
      setErrorMessageOtp("Please enter a valid 10-digit phone number!");
      return;
    }

    try {
      const url = `${baseUrl}/auth/sendOtpActivation`;
      const response = await axios.post(url, {
        mobileNumber: formData.phone,
      });

      if (response.status === 200) {
        setGetOtp(true);
        console.log("Successfully sent OTP");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessageOtp(error.response.data.message);
      } else {
        setErrorMessageOtp("Failed to send OTP. Please try again.");
      }
    }
  };

  const orderId = localStorage.getItem("orderId");
  const userId = localStorage.getItem("userId");

  const handleQrStatus = async () => {
    try {
      const response = await axios.post(`${baseUrl}/orders/qrstatus`, {
        orderId: orderId,
        qrStatus: true,
      });

      if (response.status === 200) {
        setText(true);

        setTimeout(() => {
          setText(false);
        }, 3000);

        console.log("qrstatus updated");
      } else {
        console.error("Failed to update QR status");
      }
    } catch (error) {
      console.error("Error updating QR status:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const url = `${baseUrl}/auth/verify-otp`;
      const response = await axios.post(url, {
        mobileNumber: formData.phone,
        userId: userId,
        enteredOtp: formData.enteredOtp,
      });
      if (response.status === 200) {
        localStorage.removeItem("userId");
        localStorage.removeItem("orderId");
        console.log("successfully verified");
        await handleQrStatus();
        navigate("/");
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
  
  return (
    <div className=" mt-20 py-10 px-5">
      <div className="flex flex-col justify-center items-center">
        <div class="mb-4">
          <h3 className="text-xl font-bold tracking-wider  font-sans my-5">
            Scanner Activation
          </h3>
          <div className="continue">
            {errorMessageOtp && (
              <p className="text-red text-xs font-sans ">{errorMessageOtp}</p>
            )}
          </div>
          {/*    <label class="block text-gray-700 font-bold mb-2" for="phone">
            Phone Number
             </label> */}
          {!getOtp && (
            <div className="flex  justify-center items-center">
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

              <button
                type="button"
                onClick={() => handleSendBtn()}
                className="flex px-4 text-xs items-center justify-center flex-none  py-2 md:px-2 md:py-2 border-2 rounded-lg font-medium border-black bg-black text-white"
              >
                Send
              </button>
            </div>
          )}
        </div>

        {getOtp && (
          <div>
            <div className="flex  justify-center items-center">
              <input
                type="text"
                name="enteredOtp"
                value={formData.enteredOtp}
                onChange={handleChange}
                placeholder="otp"
                maxLength="6"
                class="flex mr-2 w-full text-xs py-2 px-2 border-2 border-black rounded-lg font-medium placeholder:font-normal"
              />
              {text && <p style={{ color: "greenF" }}>{text}</p>}
              <button
                type="button"
                onClick={handleVerifyOtp}
                class="flex items-center text-xs   justify-center flex-none px-4 py-2 md:px-4 md:py-3 border-2 rounded-lg  border-black bg-black text-white"
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activate;
