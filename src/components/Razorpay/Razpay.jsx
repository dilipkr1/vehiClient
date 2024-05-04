import React, { useState } from "react";
import axios from "axios";

const RazPay = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    price: "",
    phone: "",
    name: "",
  });

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/payment`,
        formData
      );
      console.log(response.data);
      // Redirect user to the payment page or handle the response accordingly
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error
    }
  };

  return (
    <form
      className="mt-20 mb-10 flex flex-col justify-center items-center gap2"
      onSubmit={handleSubmit}
    >
      <div className="mt-5">
        <label htmlFor="user_id">User ID:</label>
        <input
          className="border p-1 mt-2"
          type="text"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          className="border p-1 mt-2"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          className="border p-1 mt-2"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          className="border p-1 mt-2 "
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <button className="bg-color3 text-white font-roboto p-3" type="submit">
        Pay Now
      </button>
    </form>
  );
};

export default RazPay;
