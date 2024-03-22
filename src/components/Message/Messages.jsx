import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./messages.css";
import { useNavigate } from "react-router-dom";
import vehicln from "../../images/vehiclean.png";
import { CustomerContext } from "../../context/customrContext";

 
export default function Messages({ userId }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [getmessage, setMessage] = useState("The car is in no parking.");
  const [selectedOption, setSelectedOption] = useState("sun");
  const { customerData } = useContext(CustomerContext);

  useEffect(() => {
    if (userId && customerData) {
      setIsLoading(false);
    }
  }, [userId, customerData]);

   if (!customerData) {
    return <p>Loading..</p>;
  }

  const foundCustomer = customerData.find(
    (customer) => customer.userId === userId
  );

  if (foundCustomer) {
    const ownerPhoneNum = foundCustomer.customerPhone;
    localStorage.setItem("ownerPhoneNum", ownerPhoneNum);
  }

  console.log(localStorage.getItem("ownerPhoneNum"));

  const ownerPhoneNum = localStorage.getItem("ownerPhoneNum");

  let car_status = [
    "The lights of this car are on.",
    "The car is in no parking.",
    "There is a baby or pet in the car.",
    "The window or car is open.",
    "Something wrong with this car.",
  ];

  const handleMessage = async (e) => {
    const getvalue = e.target.value;
    const index = car_status[getvalue];
    setMessage(index);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(temperoryKey) 
    console.log(ownerPhoneNum);
    const headers = {
      Authorization:
        "MHQh1iNDzafynGpruWlcK5e9YA07ILBxRk6UmFTZEdXv8J2VtgLsgtfyr2aGXBEWp0UduhTNnlSz1FO8",
    };
    try {
      const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          route: "q",
          message: { getmessage },
          flash: 0,
          numbers: { ownerPhoneNum },
        },
        { headers: headers }
      );
      if (response.status === 200) {
        console.log("message sent successfully");
        localStorage.removeItem("ownerPhoneNum");
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
    console.log(temperoryKey)
    const username = "7852010838";
    const password = "admin";
    const key = temperoryKey;
    const number = ownerPhoneNum;

    const auth = btoa(`${username}:${password}`);
    const url = "https://telephonycloud.co.in/api/v1/mask";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          key: key,
          number: number,
          " max-call-duration": 900,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to call API");
        localStorage.removeItem("ownerPhoneNum");
      }
      const data = await response.json();
      navigate("/message/success");
      console.log(data);
    } catch (error) {
      localStorage.removeItem("ownerPhoneNum");
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
                className={`custom ${
                  selectedOption === "parking" ? "active" : ""
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
                className={`custom ${
                  selectedOption === "baby" ? "active" : ""
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
                className={`custom ${
                  selectedOption === "window" ? "active" : ""
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
                className={`custom ${
                  selectedOption === "wrong" ? "active" : ""
                }`}
                onClick={() => changeBackgroundColor("wrong")}
              >
                <i className="fa-solid fa-triangle-exclamation pr-2"></i>
                Something wrong with this car.
                <input
                  type="radio"
                  name="radio"
                  value="4"
                  onClick={handleMessage}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="contactBtn text-white">
              <button type="submit" className="btn">
                Message
              </button>
              <button className="btn text-white">
                <a
                  onClick={handleCall}
                  href={`tel:01205136386,${temperoryKey}`}
                >
                  Call Now
                </a>
              </button>
            </div>
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
                  Connect with VEHICONNECT
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
