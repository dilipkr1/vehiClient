import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Messages from "../Message/Messages";
import loadingGif from "../../images/loading.gif";

export default function GetUid() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [text, setText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { orderData } = useContext(OrderContext);
  const [userId, setUserId] = useState(null);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }
  console.log(uid.toLocaleLowerCase());

  useEffect(() => {
    setIsLoading(false);
  }, [orderData]);

  useEffect(() => {
    if (!orderData || orderData.length === 0) return;
    const getProduct = orderData.cartItems
      .map((order) => order.cartItems)
      .flat();

    const getUid = getProduct.find((product) => {
      if (product.uid.toLowerCase() === uid.toLocaleLowerCase()) {
        return true;
      }
      return false;
    });

    if (!getUid) {
      return (
        <div className="text-black mt-20 pt-20">
          <p>UID Does Not Exist</p>
        </div>
      );
    }

    const orderId = getUid
      ? getUid.orderId
      : orderData.length > 0
      ? orderData[0].orderId
      : null;
    localStorage.setItem("orderId", orderId);

    const cartItem = orderData.cartItems.find(
      (item) => item.orderId === orderId
    );

    if (cartItem) {
      const userId = cartItem.userId;
      localStorage.setItem("userId", userId);
    } else {
      return;
    }

    if (getUid && getUid.qrStatus === true) {
      const getUserId = orderData.cartItems.find(
        (order) => order.orderId === getUid.orderId
      );
      const userId = getUserId ? getUserId.userId : null;
      setUserId(userId);
    }

    if (getUid.qrStatus === false) {
      setText(true);
    }
    setText(true);
  }, [orderData, uid]);

  useEffect(() => {
    if (userId !== null) {
      navigate("/message");
    }
  }, [userId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  if (userId === null) {
    return (
      <div className="h-48 mt-20 pt-10 mx-auto flex flex-col justify-center items-center text-pgcolor">
        {text && (
          <>
            <p className="font-bold tracking-wide font-sans">
              Sorry Not Activated!! Or Invalid UID
            </p>
            <Link to="/activation">
              <button className="text-white p-4 font-bold bg-logoClr">
                Activate Now
              </button>
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-20 pt-20"> </div>
      <div className="hidden">
        <Messages userId={userId} />
      </div>
    </div>
  );
}
