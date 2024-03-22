import Bestsellingpro from "./components/Bestproduct/Bestsellingpro";
import Home from "./components/Home/Home";
import Workdetails from "./components/Howworks/Workdetails";
import News from "./components/News/News";
import Parking from "./components/Parkingtags/ParkingTag";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import Layout from "./components/Layout/Layout";
import Nopage from "./components/Nopage/Nopage";
import Signup from "./components/Signup/Signup";

import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Checkout from "./components/Checkout/Checkout";
import Singleproduct from "./components/Singleproduct/SingleProduct";
import OrderPlaced from "./components/Shop/OrderPlaced";
import Messages from "./components/Message/Messages";
import CusOrders from "./components/Custorder/CusOrders";
import CusProfile from "./components/Custopro/CusProfile";
import GetUid from "./components/GetUid/GetUid";


function App() {
  return (

    <div className="App" >
      <BrowserRouter>
        <Routes  >

          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Home />
                  <Workdetails />
                  <Parking />
                  <Bestsellingpro />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/message">
              <Route index element={<Messages />} />
              <Route path="/message/success" element={<OrderPlaced title="Successfully Your Message has been Sent " paragraph="know more" bgColor="" />} />


            </Route>
            <Route path="shop">
              <Route index element={<Shop />} />
              <Route path="/shop/order-placed" element={<OrderPlaced title="Successfully Your Order has been placed" paragraph="see orders" />} />

              <Route path=":productId">
                <Route index element={<Shop />} />
                <Route path="product" index element={<Singleproduct />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Route>
            <Route path="/profile"  >
              <Route index element={<CusProfile />} />
              <Route path="/profile/orders" element={< CusOrders />} />
              <Route path="/profile/:uid" element={<GetUid />} />
              <Route path="/profile/updated" element={<OrderPlaced title="Successfully Updated" paragraph="see now " />} />

            </Route>

            <Route path="contact" element={<Contact />} />
            <Route path="news" element={<News />} />
            <Route path="*" element={<Nopage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

