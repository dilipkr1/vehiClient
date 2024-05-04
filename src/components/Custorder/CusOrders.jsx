import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { OrderContext } from "../../context/OrderContext";

export default function CusOrders() {
  const { orderData } = useContext(OrderContext);
  const { packageData } = useContext(PackageContext);
  const navigate = useNavigate();
  const [phone1, setPhone1] = useState(null);
  const [phone2, setPhone2] = useState(null);
  const { state } = useContext(AuthContext);
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }
  const { Orders } = state;

  const handleClick = (x) => {
    setOrderId(x);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${baseUrl}/contacts/update-number`, {
        orderId: orderId,
        phone1: phone1,
        phone2: phone2,
        isAllowedPhone: true,
        isAllowedMsg: false,
      });
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        console.log("Updated successfully");
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

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

  return (
    <div style={{ height: "auto", overflow: "auto" }} className="">
      <div className="lg:mx-20 lg:px-10 flex flex-col justify-center items-center lg:items-start ">
        <div className="flex justify-center items-center">
          <span className="text-3xl p-2 font-bold text-pgcolor ">
            Your Orders
          </span>
        </div>
        <div className="flex px-5  flex-col lg:grid-col-3 justify-between lg:justify-start  border-1 to-black">
          {Orders.map((order, index) => (
            <div className="lg:flex lg:gap-16   px-1 gap-2" key={order._id}>
              {order.cartItems.map((item) => (
                <div key={item._id} className=" gap-3 ">
                  {packageData.map((product) => {
                    if (product._id === item.product_id) {
                      return (
                        <div
                          className="flex justify-between gap-2 lg:gap-4 items-center"
                          key={product._id}
                        >
                          <img
                            loading="lazy"
                            style={{ borderRadius: "5%" }}
                            src={product.packageImg}
                            alt={product.packageName}
                            className="w-32 h-20 lg:ml-4"
                          />
                          <p className="w-48">{product.packageName}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
              <div className="flex flex-col mt-4 lg:mt-8 lg:min-w-56">
                <h1>
                  <strong className="font-bold">Vehicle Number:</strong>
                  <strong className="text-logoClr font-bold ">
                    {" "}
                    {order.cartItems[0].car_No}
                  </strong>
                </h1>
                <h2>
                  <span className="font-bold">Date:</span>
                  {formatDate(order.createdAt)}
                </h2>
                {/* <h1>
                  <span className="font-bold text-left">Total:</span>
                  {order.subTotal}&nbsp;&nbsp;&nbsp;&nbsp;
                </h1> */}
                <h1>
                  <span className="font-bold">Status:</span> {order.status}
                </h1>
              </div>
              <div className="EmgContact lg:ml-4 flex gap-2 justify-start items-center">
                <div className="gap-2 lg:flex flex-col">
                  <span
                    style={{ color: "green" }}
                    className="font-sans text-xl"
                  >
                    <strong>Add</strong> Emergency Contact:&nbsp;
                  </span>
                  <input
                    required
                    className="w-48 lg:w-full px-1 py-1 bg-color7 rounded formInput mt-2"
                    type="tel"
                    id="phone1"
                    name="phone1"
                    onClick={() => handleClick(Orders[index].orderId)}
                    onChange={(e) => setPhone1(e.target.value)}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    oninput="this.value = this.value.slice(0, 10)"
                    placeholder="Enter Family Contact Number 1"
                  />
                  <input
                    required
                    className="w-48 lg:w-full px-1 py-1 bg-color7 rounded formInput mt-4"
                    type="tel"
                    id="phone2"
                    name="phone2"
                    onClick={() => handleClick(Orders[index].orderId)}
                    onChange={(e) => setPhone2(e.target.value)}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    oninput="this.value = this.value.slice(0, 10)"
                    placeholder="Enter Family Contact Number 2"
                  />
                  {success && (
                    <p style={{ color: "green" }}>Successfully Updated</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-black text-white p-2 px-3 mt-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
