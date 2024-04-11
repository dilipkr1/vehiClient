import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { OrderContext } from "../../context/OrderContext";

export default function CusOrders() {
  const { orderData } = useContext(OrderContext);
  const { packageData } = useContext(PackageContext);
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { Orders } = state;

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
    <div className="">
      <div className="lg:mx-20 lg:px-20 flex flex-col justify-center lg:items-start ">
        <div className="flex justify-center items-center">
          <span className="text-xl  ">Your Orders</span>
         </div>
        <div className="flex flex-col lg:grid-col-3 justify-start gap-2 border-1 to-black">
          {Orders.map((order, index) => (
            <div className="flex gap-5" key={order._id}>
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-center items-center gap-5"
                >
                  <div className="">
                    <p>Qty : {item.quantity}</p>
                  </div>
                  {packageData.map((product) => {
                    if (product._id === item.product_id) {
                      return (
                        <div className="" key={product._id}>
                          <img
                            loading="lazy"
                            style={{ borderRadius: "50%" }}
                            src={product.packageImg}
                            alt={product.packageName}
                            className="w-10 h-10 ml-4"
                          />
                          <p>{product.packageName}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
              <div className="mt-2">
                <h1>Total: {order.subTotal}</h1>
                <h1>Status : {order.status}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
