import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "../Message/Messages";
export default function GetUid() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [text, setText] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderData } = useContext(OrderContext);
  const [userId, setUserId] = useState(null);

 
  useEffect(() => {
    setIsLoading(false);
  }, [orderData]);

  useEffect(() => {
    if (!orderData || orderData.length === 0) return;

    const getProduct = orderData.cartItems
      .map((order) => order.cartItems)
      .flat();
    const getUid = getProduct.find((product) => product.uid === uid);

    if (getUid) {
      const getUserId = orderData.cartItems.find(
        (order) => order.orderId === getUid.orderId
      );
      const userId = getUserId ? getUserId.userId : null;
      setUserId(userId);
    }
    setText("Sorry Not Activated!! Or Invalid UID");
  }, [orderData, uid]);

  useEffect(() => {
    if (userId !== null) {
      navigate("/message");
    }
  }, [userId, navigate]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (userId === null) {
    return (
      <div className="mt-20 pt-10 mx-auto flex justify-center items-center text-pgcolor">
        <p>{text}</p>
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
