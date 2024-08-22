import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomerContext } from "../../context/customrContext";
import { AuthContext } from "../../context/AuthContext";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import { OrderContext } from "../../context/OrderContext";
import Swal from 'sweetalert2';

const Activate = () => {
  const { customerData } = useContext(CustomerContext);
  const { setIsAuthenticated, isAuthenticated, state } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, qrCodeData } = useContext(OrderContext);
  const { Orders, user } = state;

  const [loading, setIsLoading] = useState(true);
  const [vehicleNo, setVehicleNo] = useState('');

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (value.length <= 10) {
      setVehicleNo(value);
    }
  };
  const baseUrl = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_LOCALAPI
    : process.env.REACT_APP_BACKEND_LIVEAPI;

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!isAuthenticated) {
      const redirectTo = '/activation';
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (Orders && qrCodeData && user) {
      setIsLoading(false);

      const isOrderExists = qrCodeData?.find((qrcode) =>
        Orders?.some((order) => order.orderId === qrcode.orderId && qrcode.qrStatus === false && qrcode.qrOrderStatus === true)
      );
      console.log("isOrderExists", isOrderExists);

      if (isOrderExists) {
        setOrderId(isOrderExists.orderId);
      } else {
        console.log("order does not exist");
      }
    }
  }, [Orders, qrCodeData, user]);

  const handleVtCode = async () => {
    if (code === '123456' && orderId) {
      console.log("order --- id", orderId)
      await handleServerUpdate(orderId);

    }
    else if (code === '123456') {
      setIsValid(true);
      setShowDetails(true);
      setText('VTCODE Verified. Please enter your details.');

      // Success alert with SweetAlert2
      await Swal.fire({
        title: 'Success',
        text: 'VTCODE Verified. Please enter your details.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } else {
      setIsValid(false);
      setText('Please Enter Valid Code');
      await Swal.fire({
        title: 'Invalid',
        text: 'Please Enter Valid Code',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });
      setText('');
    }
  };

  const handleServerUpdate = async (orderId) => {
    try {
      const response = await axios.put(`${baseUrl}/qrstatus`, {
        orderId: orderId,
        uid: uid,
        qrStatus: true,
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Activated Successfully',
          text: 'Redirecting...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          navigate(`/profile/${uid}`, { replace: true });
          window.location.reload();
        });
        console.log("status updated");
      } else {
        Swal.fire({
          title: 'Failed to Activate Try Again',
          text: 'Please try again.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error updating QR status:", error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || "Something went wrong.",
        icon: 'error',
      });
    }
  };

  const generateOrderId = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(5, 10).replace(/-/g, '');
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderId = formattedDate + String(randomDigits).padStart(4, '0');
    return orderId;
  };

  const getuserId = user?._id;
  console.log("userdata", getuserId);

  const handleSubmitDetails = () => {
    const fullName = document.querySelector("input[name='fullName']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const phone = document.querySelector("input[name='phone']").value.trim();
    const vehicleType = document.querySelector("select[name='vehicleType']").value;
    const vehicleNo = document.querySelector("input[name='vehicleNo']").value.trim();

    if (!fullName) {
      Swal.fire({
        // title: 'Validation Error',
        text: 'Please enter your full name.',
        icon: 'error',
      });
      return;
    }
    if (!email) {
      Swal.fire({
        // title: 'Validation Error',
        text: 'Please enter your email.',
        icon: 'error',
      });
      return;
    }
    if (!phone) {
      Swal.fire({
        // title: 'Validation Error',
        text: 'Please enter your phone number.',
        icon: 'error',
      });
      return;
    }
    if (!vehicleType) {
      Swal.fire({
        // title: 'Validation Error',
        text: 'Please select your vehicle type.',
        icon: 'error',
      });
      return;
    }
    if (!vehicleNo) {
      Swal.fire({
        // title: 'Validation Error',
        text: 'Please enter your vehicle number.',
        icon: 'error',
      });
      return;
    }

    // Determine the prefix based on the vehicle type
    let prefix = '';
    if (vehicleType === 'car') {
      prefix = 'C';
    } else if (vehicleType === 'bike') {
      prefix = 'B';
    }
    const prefixedVehicleNo = `${prefix}-${vehicleNo}`;

    const formData = {
      fullName,
      email,
      phone,
      vehicleNo: prefixedVehicleNo,
      orderId: generateOrderId(),
      userId: getuserId,
      paymentStatus: 'Success',
      orderStatus: 'Order Received',
      qrStatus: true,
      uid: uid
    };

    if (referralCode) {
      formData.referralCode = referralCode;
    }

    console.log("formdata", formData);
    handlePlaceOrderwithAct(formData);
  };

  const handlePlaceOrderwithAct = async (orderData) => {
    try {
      const response = await axios.post(`${baseUrl}/place-order`, orderData);

      if (response.status === 201) {
        Swal.fire({
          title: 'Activated Successfully',
          text: 'Redirecting...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          navigate(`/profile/${uid}`, { replace: true });
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Failed to Place Order',
          text: 'Please try again.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || "Something went wrong.",
        icon: 'error',
      });
    }
  };

  return (
    <div style={{ height: "150vh", position: 'relative' }}>
      <Dialog
        open={open}
        onClose={() => setOpen(true)}
        aria-labelledby="activation-dialog-title"
        aria-describedby="activation-dialog-description"
        style={{ zIndex: 1 }} // Ensure the dialog has a lower z-index than SweetAlert2
      >
        <DialogContent>
          {!showDetails ? (
            <div className="">
              <TextField
                value={code}
                onChange={(e) => setCode(e.target.value)}
                label="Enter VTCODE"
                variant="outlined"
                fullWidth
                margin="normal"
                autoFocus
              />
              {text && (
                <p className={`text-xs tracking-wide ${isValid ? 'text-green' : 'text-red'}`}>
                  {text}
                </p>
              )}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  onClick={handleVtCode}
                  style={{ backgroundColor: 'orange', color: 'white' }}
                >
                  Activate Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <TextField
                name="fullName"
                type="text"
                required
                fullWidth
                label="Full Name"
                variant="outlined"
              />
              <TextField
                name="email"
                required
                fullWidth
                type="email"
                label="Email Address"
                variant="outlined"
              />
              <TextField
                name="phone"
                required
                fullWidth
                label="Phone Number"
                variant="outlined"
                inputProps={{ maxLength: 10 }}
              />
              <select
                name="vehicleType"
                className="w-full border rounded-sm border-[#d1d1d1] p-2 outline-none my-2"
                defaultValue=""
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
              </select>
              <TextField
                name="vehicleNo"
                required
                style={{ textTransform: 'uppercase' }}
                fullWidth
                label="Vehicle Number"
                variant="outlined"
                value={vehicleNo}
                onChange={handleChange}
              />
              <div className="mt-4">
                <Button
                  onClick={handleSubmitDetails}
                  variant="contained"
                  style={{ backgroundColor: 'orange', color: 'white' }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Activate;
