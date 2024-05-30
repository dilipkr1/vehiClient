import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { OrderContext } from "../../context/OrderContext";
import loadingGif from "../../images/loading.gif";
export default function CusOrders() {
  const { orderData } = useContext(OrderContext);
  const { packageData } = useContext(PackageContext);
  const navigate = useNavigate();
  const [phone1, setPhone1] = useState(null);
  const [phone2, setPhone2] = useState(null);
  const { state } = useContext(AuthContext);
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }
  const { Orders } = state;

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  }, []);

  const handleClick = (x) => {
    setOrderId(x);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

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
      <div className="flex flex-col m-5 p-3 mt-20 pt-20 justify-center items-center">
        <p className="text-logoClr font-extrabold text-2xl font-sans rounded-sm">
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
    <div
      style={{ height: "auto", overflow: "auto" }}
      className="flex flex-wrap justify-center"
    >
      {Orders.map((order, index) => (
        <div
          key={order._id}
          className="bg-white rounded-lg overflow-hidden shadow-lg m-4 border border-gray-200"
          style={{ width: "400px" }}
        >
          <div className="p-4">
            {order.cartItems.map((item) => (
              <div key={item._id} className="mb-1">
                {packageData.map((product) => {
                  if (product._id === item.product_id) {
                    return (
                      <div
                        key={product._id}
                        className="flex flex-col items-start"
                      >
                        <img
                          loading="lazy"
                          style={{ borderRadius: "5%", width: "100%" }}
                          src={product.packageImg}
                          alt={product.packageName}
                          className="h-40"
                        />
                        <p className="m-0 p-0">{product.packageName}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex justify-start items-start">
                {" "}
                <h1 className="font-bold">
                  Vehicle Number: {order.cartItems[0].car_No}
                </h1>
                {/* <p className="text-logoClr font-bold"></p> */}
              </div>
              <div className="flex justify-start gap-2 items-center">
                <span className="font-bold">Date:</span>{" "}
                {formatDate(order.createdAt)}
                <h1 className="font-bold">Status:</h1>
                <p>{order.status}</p>
              </div>
            </div>
            <div className="mt-1">
              <h1 className="font-bold">Add Emergency Contact:</h1>
              <input
                required
                className="w-full px-2 py-1 bg-gray-100 rounded border mt-2"
                type="tel"
                id="phone1"
                name="phone1"
                onClick={() => handleClick(Orders[index].orderId)}
                onChange={(e) => setPhone1(e.target.value)}
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter Family Contact Number 1"
              />
              <input
                required
                className="w-full px-2 py-1 bg-gray-100 border mt-1 rounded "
                type="tel"
                id="phone2"
                name="phone2"
                onClick={() => handleClick(Orders[index].orderId)}
                onChange={(e) => setPhone2(e.target.value)}
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter Family Contact Number 2"
              />
              {success && (
                <p className="text-green-500">Successfully Updated</p>
              )}
              <button
                onClick={handleSubmit}
                className="bg-black text-white p-2 px-3 mt-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
