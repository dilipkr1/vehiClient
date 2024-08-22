import React, { useContext, useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function CusOrders() {
  const { state } = useContext(AuthContext);
  const { Orders } = state;
  const [phones, setPhones] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_LOCALAPI
    : process.env.REACT_APP_BACKEND_LIVEAPI;

  useEffect(() => {
    // Initialize phones state with existing phone numbers from Orders
    const initialPhones = Orders.reduce((acc, order) => {
      acc[order.orderId] = {
        phone1: order.phone1 || "",
        phone2: order.phone2 || "",
      };
      return acc;
    }, {});
    setPhones(initialPhones);
  }, [Orders]);

  const handleInputChange = (orderId, phoneKey, value) => {
    setPhones((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [phoneKey]: value,
      },
    }));
  };

  const handleSubmit = async (orderId) => {
    setLoading(true);
    try {
      const { phone1, phone2 } = phones[orderId] || {};
      const response = await axios.put(`${baseUrl}/update-number`, {
        orderId,
        phone1,
        phone2,
        isAllowedPhone: true,
        isAllowedMsg: false,
      });

      if (response.status === 200) {
        setSuccess((prev) => ({
          ...prev,
          [orderId]: true,
        }));
        setTimeout(() => {
          setSuccess((prev) => ({
            ...prev,
            [orderId]: false,
          }));
        }, 3000);

        // Update the order data after successful submission
        // Update the `Orders` state with new data if needed
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format to a readable date and time
  }

  if (!Orders || Orders.length === 0) {
    return (
      <div className="flex flex-col m-5 p-3 mt-20 pt-20 justify-center items-center">
        <p className="text-logoClr font-extrabold text-2xl font-sans rounded-sm">
          You Don't have any orders
        </p>
      </div>
    );
  }

  return (
    <Grid container spacing={2} className="p-4">
      {Orders.map((order) => (
        <Grid item xs={12} md={6} lg={4} key={order._id}>
          <Card className="shadow-lg border rounded-lg overflow-hidden" style={{ maxHeight: "auto" }}>
            <CardContent style={{ gap: "10px", display: "flex", flexDirection: "column", padding: "8px" }}>
              <Typography
                variant="body2"
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <span>Order ID: {order.orderId}</span>
                <span className="font-bold">Vehicle Number: {order.vehicleNo}</span>
                <span>Date: {formatDate(order.createdAt)}</span>
                <span>Order Status: {order.orderStatus}</span>
              </Typography>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" style={{ fontSize: "10px" }}>
                  Add Family Contact
                </Typography>
                <IconButton onClick={() => handleExpandClick(order.orderId)}>
                  {expandedOrderId === order.orderId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>

              <Collapse in={expandedOrderId === order.orderId}>
                <TextField
                  fullWidth
                  label="Family Contact Number 1"
                  variant="outlined"
                  margin="normal"
                  value={phones[order.orderId]?.phone1 || ""}
                  onChange={(e) => handleInputChange(order.orderId, "phone1", e.target.value)}
                  inputProps={{ maxLength: 10 }}
                  type="tel"
                  style={{ fontSize: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Family Contact Number 2"
                  variant="outlined"
                  margin="normal"
                  value={phones[order.orderId]?.phone2 || ""}
                  onChange={(e) => handleInputChange(order.orderId, "phone2", e.target.value)}
                  inputProps={{ maxLength: 10 }}
                  type="tel"
                  style={{ fontSize: "10px" }}
                />
                {success[order.orderId] && (
                  <Typography variant="body2" color="green" style={{ fontSize: "10px" }}>
                    Successfully Updated
                  </Typography>
                )}
                <Button
                  variant="contained"
                  className="mt-4"
                  onClick={() => handleSubmit(order.orderId)}
                  disabled={loading}
                  style={{ fontSize: "12px", padding: "10px", backgroundColor: '#F68418' }}
                >
                  {loading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
