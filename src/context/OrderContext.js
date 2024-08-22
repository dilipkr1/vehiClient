import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
} else {
  baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
}

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, qrCodesResponse] = await Promise.all([
          axios.get(`${baseUrl}/orders`),
          axios.get(`${baseUrl}/getqrcodes`)
        ]);

        setOrderData(ordersResponse.data);
        setQrCodeData(qrCodesResponse.data.data);

        // console.log("Order data:", ordersResponse.data);
        // console.log("QR Code data:", qrCodesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData, qrCodeData, setQrCodeData }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
