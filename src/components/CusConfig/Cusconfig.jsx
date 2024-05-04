import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import { Switch } from "@mui/material";
import { OrderContext } from "../../context/OrderContext";

const Cusconfig = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { Orders, user } = state;

  const { orderData } = useContext(OrderContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSpamPhone, setIsSpamPhone] = useState(false);
  const [ispamMsg, setispamMsg] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [orderId, setOrderId] = useState(null);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleClickCall = (e) => {
    const newValue = e.target.checked;
    setIsSpamPhone(newValue);
  };
  const handleClickMesg = (e) => {
    const newValue = e.target.checked;
    setispamMsg(newValue);
   };

  if (!Orders || Orders.length === 0) {
    return (
      <div className="flex flex-col m-5 p-3   mt-20 pt-20  justify-center items-center">
        <p className="text-logoClr font-extrabold text-2xl font-sans  rounded-sm">
          You Don't have any order ?
        </p>
        <img
          className="w-30 "
          loading="lazy"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU"
        />
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/contacts/update-callingsts`,
        {
          orderId: orderId,
          isAllowedMsg: ispamMsg,
          isAllowedPhone: isSpamPhone,
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
        console.error("Failed to update Spamming Status");
      }
    } catch (error) {
      console.error("Error updating Spamming Status:", error.message);
      throw new Error(
        "An unexpected error occurred while updating Spamming Status"
      );
    }
  };
  return (
    <div>
      <div className="flex mt-10 flex-col gap-8 justify-center items-center">
        <div className="OrderOptioins">
          <select
            className=" border-none bg-logoClr text-white font-sans tracking-wide rounded-2xl p-2 px-4"
            onChange={(e) => setOrderId(e.target.value)}
            // onclick = {}
          >
            <option className="font-bold " value="">
              Choose Your Vehicle Number
            </option>
            {Orders.map((order, index) => (
              <option key={index} value={order.cartItems[0].orderId}>
                {order.cartItems[0].car_No}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          Disable Spam Call
          <Switch
            name="isAllowedPhone"
            onClick={handleClickCall}
            // onChange={handleChangePhoneCall}
            checked={isSpamPhone}
            disabled={false}
          />
        </div>
        <div className="flex">
          Disable Spam Messge
          <Switch
            name="isAllowedMsg"
            onClick={handleClickMesg}
            // onChange={handleChangeMessage}
            checked={ispamMsg}
            disabled={false}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className=" bg-logoClr text-sm p-2 px-3 rounded"
          >
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
    </div>
  );
};

export default Cusconfig;
