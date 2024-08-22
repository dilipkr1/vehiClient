import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Messages from "../Message/Messages";
import loadingGif from "../../images/loading.gif";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

export default function GetUid() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { orderData, qrCodeData } = useContext(OrderContext);
  const { state } = useContext(AuthContext);
  const { Orders } = state;
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showActivateButton, setShowActivateButton] = useState(false);
  const [userId, setUserId] = useState(null);

  const vehiDigit = parseInt(uid.toLowerCase().slice(2));

  useEffect(() => {
    localStorage.setItem("uid", uid.toLowerCase());
    console.log("UID:", uid.toLowerCase());
  }, [uid]);

  useEffect(() => {
    if (!qrCodeData || !orderData || !orderData.orders) return;

    const getUid = qrCodeData.find(
      (qrcode) =>
        qrcode.uid?.toLowerCase() === uid?.toLowerCase() && qrcode.qrStatus === true && qrcode.qrOrderStatus === true
    );

    if (getUid) {
      const getOrder = orderData.orders.find(
        (order) => order.orderId === getUid.orderId
      );

      if (getOrder) {
        const vehicleNo = getOrder.vehicleNo;
        const ownerPhoneNum = getOrder.customerPhone;
        localStorage.setItem("ownerPhoneNum", getOrder.phone);
        localStorage.setItem("ownerName", getOrder.fullName);
        localStorage.setItem("isAllowedPhone", getOrder.isAllowedPhone);
        localStorage.setItem("isAllowedMsg", getOrder.isAllowedMsg);
        localStorage.setItem('vehicleNo', getOrder.vehicleNo);
        console.log("Order found, userId:", getOrder.userId);
        setUserId(getOrder.userId);
        setIsLoading(false); // Update loading state after data is retrieved
      } else {
        console.error("Order not found with orderId:", getUid.orderId);
        setIsLoading(false); // Update loading state if order is not found
      }
    } else {
      //need to check for logged in user 
      console.error("No matching QR code or QR status inactive");
      setShowActivateButton(true);
      setOpen(true);
      setIsLoading(false);
    }
  }, [orderData, qrCodeData, uid]);

  useEffect(() => {
    if (userId !== null) {
      navigate(`/message`);
    }
  }, [userId, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  if (vehiDigit > 9999 || vehiDigit < 999) {
    navigate("/");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  return (
    <div style={{ height: "150vh" }}>
      {showActivateButton && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              padding: "20px",
              margin: "200px 10px",
            },
          }}
        >
          <DialogContent>
            <div
              style={{
                textAlign: "center",
                paddingBottom: "16px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Link to={`/activation`}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    padding: "10px 20px",
                    marginTop: "10px",
                  }}
                >
                  Activate Now
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Render Messages component with userId as prop */}
      {userId && <Messages userId={userId} />}
    </div>
  );
}
