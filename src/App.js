import Bestsellingpro from "./components/Bestproduct/Bestsellingpro";
import Home from "./components/Home/Home";
import Workdetails from "./components/Howworks/Useoftag";
// import News from "./components/News/News";
import VehiFeatures from './components/Fetures/VehiFeatures'
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
// import ParkingTag from "./components/Parkingtag/ParkingTag";
import Ourservices from "./components/Services/Ourservices";
// import Homeshop from "./components/Homeshop/Homeshop";
import Reviews from "./components/Reviews/Reviews";
import About from "./components/About/About";
import Points from "./components/Points/Points";
import Trusted from "./components/Trusted/Trusted";
// import Razpay from './components/Razorpay/Razpay'
// import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import Activate from "./components/Activate/Activate";
import Terms from "./components/TermsAnd Privacty/Terms";
import Privacy from "./components/TermsAnd Privacty/Privacy";
import Refund from "./components/TermsAnd Privacty/Refund";
import Success from "./components/Response/Success";
import Failed from "./components/Response/Failed";
import FAQ from "./components/Faq/Faq";
import Rvw from "./components/Faq/Rvw";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                  <VehiFeatures />
                  {/* <ParkingTag /> */}
                  <Ourservices />
                  {/* <Homeshop /> */}
                  <Bestsellingpro />
                  <Rvw />
                  {/* <Reviews /> */}
                  <Points />
                  <FAQ />
                  {/* <Trusted /> */}
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
            <Route path="/profile"   >
              <Route index element={<CusProfile />} />
              <Route path="/profile/orders" element={< CusOrders />} />
              <Route path="/profile/:uid" element={<GetUid />} />
              <Route path="/profile/updated" element={<OrderPlaced title="Successfully Updated" paragraph="see now " />} />

            </Route>
            {/* <Route path="/activation">
              <Route path="/activation/:uid" element={<GetUid />} />

            </Route> */}
            {/* :
              <Route path="/login" element={<Login />} />
            } */}

            <Route path="contact" element={<Contact />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="refund" element={<Refund />} />


            {/* <Route path="pay" element={<InitiatePaymentForm />} /> */}
            {/* <Route path="su-response" element={<Success />} /> */}
            <Route path="response" element={<Failed />} />


            {/* <Route path="news" element={<News />} /> */}
            <Route path="about" element={<About />} />
            <Route path="activation" element={<Activate />} />
            {/* <Route path="pay" element={<Razpay />} /> */}
            <Route path="*" element={<Nopage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

