import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./messages.css";
import { useNavigate } from "react-router-dom";
import vehicln from "../../images/vehiclean.png";
import { CustomerContext } from "../../context/customrContext";
import { Input } from "@mui/material";
import { OrderContext } from "../../context/OrderContext";
import loadingGif from "../../images/loading.gif";

export default function Messages({ userId }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [getmessage, setMessage] = useState("The car is in no parking.");
  const [selectedOption, setSelectedOption] = useState("sun");
  const { customerData } = useContext(CustomerContext);
  const [enteredCar_No, setEnteredCar_No] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { orderData } = useContext(OrderContext);
  const [text, setText] = useState("Please Enter Valid Car Number");
  const [isValid, setIsValid] = useState(false);
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  useEffect(() => {
    if (userId && customerData && orderData) {
      setIsLoading(false);
    }
  }, [userId, customerData, orderData]);
 


  let lastFourDigits;

  useEffect(() => {
    if (lastFourDigits === enteredCar_No) {
      setIsValid(true);
      setText("Vehicle number is correct.")
    } else {
      setIsValid(false);
      setText("Vehicle number is incorrect.")

    }
  }, [lastFourDigits, enteredCar_No]);



  if (!customerData || !orderData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }



  const foundUserIds = orderData.cartItems.filter(
    (order) => order.userId === userId
  );
  foundUserIds.forEach((order) => {
    localStorage.setItem("phone1", order.cartItems[0].phone1);
    localStorage.setItem("phone2", order.cartItems[0].phone2);
    localStorage.setItem("car_No", order.cartItems[0].car_No);
  });

  const phone1 = localStorage.getItem("phone1");
  const phone2 = localStorage.getItem("phone2");

  // }
  const foundCustomer = customerData.find(
    (customer) => customer.userId === userId
  );

  if (foundCustomer) {
    const ownerPhoneNum = foundCustomer.customerPhone;
    localStorage.setItem("ownerPhoneNum", ownerPhoneNum);
    localStorage.setItem("ownerName", foundCustomer.customerName);
    localStorage.setItem("isAllowedPhone", foundCustomer.isAllowedPhone);
    localStorage.setItem("isAllowedMsg", foundCustomer.isAllowedMsg);
  }

  const isSpamMsg = localStorage.getItem("isAllowedMsg");
  const isSpamCall = localStorage.getItem("isAllowedPhone");
  const ownerPhoneNum = localStorage.getItem("ownerPhoneNum");
  const ownerName = localStorage.getItem("ownerName");
  const carNumber = localStorage.getItem("car_No");

  if (carNumber) {
    lastFourDigits = carNumber.toString().slice(-4);
  }

  console.log(lastFourDigits, ownerPhoneNum, phone1, phone2);

  let car_status = [
    "The lights of this car are on.",
    "The car is in no parking.",
    "There is a baby or pet in the car.",
    "The window or car is open.",
    "In case of Accident",
    "Something wrong with this car.",
  ];

  const handleMessage = async (e) => {
    const getvalue = e.target.value;
    const index = car_status[getvalue];
    setMessage(index);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/msg/send-message`, {
        message: `Hi ${ownerName}, a user reported 
Your Vehicle Number #${carNumber} 
${getmessage} 
This message is generated from QR code on your vehicle
Regards
VehiConnect`,
        numbers: ownerPhoneNum,
      });

      if (response.status === 200) {
        navigate("/message/success");
        localStorage.clear();
      }
    } catch (error) {
      localStorage.removeItem("ownerPhoneNum");
      console.error("Error:", error);
    }
  };

  function changeBackgroundColor(option) {
    setSelectedOption(option);
  }

  const randNum = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const temperoryKey = randNum();

  const handleCall = async () => {
    const key = temperoryKey;
    const number = ownerPhoneNum || phone1 || phone2;

    try {
      const response = await fetch(`${baseUrl}/msg/send-call`, {
        method: "POST",
        body: new URLSearchParams({
          key: key,
          number: number,
          "max-call-duration": 900,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to call API");
        localStorage.clear();
      }
      const data = await response.json();
    } catch (error) {
      localStorage.clear();
      console.error("Error:", error);
    }
  };

  return (
    <div className="overflow-hidden overflow-y-hidden zoom">
      <div className="conatactNavbar">
        <a href="/">
          <img className="contactLogo" src={vehicln} alt="logo_vehicCL" />
        </a>
      </div>

      <hr className="bg-black w-full " />
      <div className="contact w-full">
        <div className="contactBox">
          <div className="contactTitleBox gap-1">
            <h3 className="contactTitle pb-3 font-bold font-sans text-center text-2xl tracking-wide leading-20">
              Contact Vehicle Owner.
            </h3>
            <hr className="w-full" />
            <p
              style={{ padding: "10px 10px" }}
              className="contactParagraph tracking-wide font-sans font-normal"
            >
              Please select a reason why do you want to contact the owner.
            </p>
          </div>
          <form onSubmit={sendMessage}>
            <div className="chooseOption">
              <label
                className={`custom ${selectedOption === "sun" ? "active" : ""}`}
                onClick={() => changeBackgroundColor("sun")}
              >
                <i className="fa-regular fa-sun pr-2"></i>The lights of this car
                are on.
                <input
                  type="radio"
                  value="0"
                  name="radio"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className={`custom ${selectedOption === "parking" ? "active" : ""
                  }`}
                onClick={() => changeBackgroundColor("parking")}
              >
                <i className="fa-solid fa-square-parking pr-2"></i>The car is in
                no parking.
                <input
                  type="radio"
                  name="radio"
                  value="1"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className={`custom ${selectedOption === "baby" ? "active" : ""
                  }`}
                onClick={() => changeBackgroundColor("baby")}
              >
                <i className="fa-solid fa-baby pr-2"></i>There is a baby or pet
                in car.
                <input
                  type="radio"
                  name="radio"
                  value="2"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className={`custom ${selectedOption === "window" ? "active" : ""
                  }`}
                onClick={() => changeBackgroundColor("window")}
              >
                <i className="fa-solid fa-window-maximize pr-2"></i>The window
                or car is open.
                <input
                  type="radio"
                  name="radio"
                  value="3"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className={`custom ${selectedOption === "acc" ? "active" : ""}`}
                onClick={() => changeBackgroundColor("acc")}
              >
                <i className="fa-solid fa-window-maximize pr-2"></i>In case of
                Accident
                <input
                  type="radio"
                  name="radio"
                  value="4"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className={`custom ${selectedOption === "wrong" ? "active" : ""
                  }`}
                onClick={() => changeBackgroundColor("wrong")}
              >
                <i className="fa-solid fa-triangle-exclamation pr-2"></i>
                Something wrong with this car.
                <input
                  type="radio"
                  name="radio"
                  value="5"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="p-3">
              <p className={`text-xs tracking-wide ${isValid ? 'text-green ' : 'text-red'}`}>
                {text}
              </p>
              <input
                onChange={(e) => setEnteredCar_No(e.target.value)}
                type="text"
                maxLength={4}
                placeholder="Please Enter Last 4 digits of Car"
                className="border-black border w-80 mx-auto p-4 p m-2 text-xs text-black font-normal tracking-wide
            "
              />
            </div>
            {isValid && (
              <div className="contactBtn text-white">
                {isSpamMsg === "true" ? (
                  <span className="cursor-pointer btn">Can't Message</span>
                ) : (
                  <button type="submit" className="btn">
                    {/* {isSpamMsg ? "Sorry you can't Message" : "Message"} */}
                    Message
                  </button>
                )}
                <button className="btn text-white">
                  {isSpamCall === "true" ? (
                    <span className="cursor-pointer btn "> Can't Call</span>
                  ) : (
                    <a
                      onClick={handleCall}
                      href={`tel:01205136511,${temperoryKey}`}
                    >
                      Call Now
                    </a>
                  )}
                </button>
              </div>
            )}
          </form>

          <hr className="hrLine" />
          <div className="contactFooterSec">
            <p>
              <a className="link" href="ttps://vehiclean.in/urgent">
                <span className="text-xs text-pgcolor tracking-tight">
                  Urgency?
                </span>
              </a>
              <a className="link" href="https://vehiclean.in/connect">
                <span className="text-xs text-pgcolor tracking-tight font-extralight">
                  Connect with VehiConnect
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
