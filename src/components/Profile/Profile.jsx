import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const naviagte = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;

  // if (!user || user.length === 0) {
  //   return <p>Loading</p>;
  // }
  // console.log(user);

  return (
    <div className="home text-main mt-20 pt-20 lg:mx-20 lg:px-20 flex flex-col lg:flex-row">
      <div className="Profile flex flex-col justify-center items-center lg:w-3/4">
        <Avatar src="/broken-image.jpg" />
        <div className="flex justify-center ">
          {user.map((customer, index) => (
            <div className="flex gap-2" key={index}>
              <div>
                <p>Name: {customer.customerName}</p>
                <p>Email: {customer.customerEmail}</p>
              </div>
              <div>
                <p>Phone: {customer.customerPhone}</p>
                <p>Address: {customer.customerAddresss}</p>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
