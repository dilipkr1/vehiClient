import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch, Card, CardContent, Typography, Button, Select, MenuItem } from "@mui/material";
import Swal from 'sweetalert2';
import { OrderContext } from "../../context/OrderContext";

const Cusconfig = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { Orders } = state;
  const { orderData } = useContext(OrderContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSpamPhone, setIsSpamPhone] = useState(false);
  const [ispamMsg, setispamMsg] = useState(false);
  const [orderId, setOrderId] = useState("");

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleClickCall = (e) => {
    setIsSpamPhone(e.target.checked);
  };

  const handleClickMesg = (e) => {
    setispamMsg(e.target.checked);
  };

  const handleSubmit = async () => {
    if (!orderId) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select a vehicle number before updating.',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/update-callingsts`,
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
        Swal.fire({
          title: 'Success!',
          text: 'Updated Successfully',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update Spamming Status',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred while updating Spamming Status',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  if (!Orders || Orders.length === 0) {
    return (
      <Card variant="outlined" style={{ maxWidth: 600, margin: 'auto', padding: '16px' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            You Don't have any orders
          </Typography>
          <img
            className="w-30"
            loading="lazy"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU"
            alt="No Orders"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" style={{ maxWidth: 600, margin: 'auto', padding: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Configure Order Settings
        </Typography>
        <Select
          fullWidth
          value={orderId || ""}
          onChange={(e) => setOrderId(e.target.value)}
          variant="outlined"
          style={{ marginBottom: '16px' }}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <em>Choose Your Vehicle Number</em>
              );
            }
            return selected;
          }}
        >
          <MenuItem value="" disabled>
            <em>Choose Your Vehicle Number</em>
          </MenuItem>
          {Orders.map((order) => (
            <MenuItem style={{ textTransform: "uppercase" }} key={order._id} value={order.orderId}>
              {order.vehicleNo}
            </MenuItem>
          ))}
        </Select>


        <div style={{ marginBottom: '16px' }}>
          <Typography variant="body1">Disable Spam Call</Typography>
          <Switch
            checked={isSpamPhone}
            onChange={handleClickCall}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Typography variant="body1">Disable Spam Message</Typography>
          <Switch
            checked={ispamMsg}
            onChange={handleClickMesg}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#F68418' }}
            onClick={handleSubmit}
          >
            UPDATE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cusconfig;
