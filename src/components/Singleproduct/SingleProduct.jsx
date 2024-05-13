import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { PackageContext } from "../../context/packageContext";
import { CartContext } from "../../context/cartContext";
import ShoppingCart from "../Cart/ShoppingCart";
import "./singleproduct.css";
import { AuthContext } from "../../context/AuthContext";
import pckg1Img from "../../images/pckg1.jpg";
import loadingGif from "../../images/loading.gif";

export default function Singleproduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { dispatch } = useContext(CartContext);
  const { packageData } = useContext(PackageContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState(false);

  const handleCartMob = () => {
    setCart(!cart);
  };
  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      setCart(!cart);
    }
  };

  if (!packageData || packageData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  const product = packageData.find((item) => item._id === productId);
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="lg:ml-20 lg:pl-20  lg:w-96 lg:px-4 lg:py-8 mt-20 pt-15">
      <div className="flex lg:flex-row lg:justify-start lg:items-start   flex-col  rounded-lg overflow-hidden">
        <div className="mobTopMargin flex  lg:pt-0 pt-10 justify-center items-center  flex-col">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto flex justify-center items-center">
            <img
              className="productSize object-cover rounded-2xl lg:p-4 "
              // src={product.packageImg}
              src={pckg1Img}
              alt={product.packageName}
            />
          </div>
          <div className="flex gap-2 my-3 p-4">
            {/* <Button
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: "#ff5722",
                width: "150px",
                padding: "10px 0",
              }}
              variant="contained"
            >
              Add to cart
            </Button> */}
            {/* <Button
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: "#ff9f00",
                width: "150px",
                padding: "10px 0",
              }}
              variant="contained" */}
            {/* > */}
            {/* Buy Now */}
            {/* {isAuthenticated && (
                <a href="">Add to cart </a>
              )} */}
            {/* </Button> */}
          </div>
        </div>
        <div className="p-6 flex flexColMob flex-col items-center justify-center">
          <p className="text-lg font-bold text-gray-900 p-0">
            ₹ {product.packagePrice}
          </p>
          <h4 className="text-xl text-main font-sans">{product.packageName}</h4>
          <p className="text-xl font-sans text-main">
            {product.packageDescription}
          </p>
          <div className="flex  mt-4">
            {/* <p className="text-lg font-bold text-gray-900 p-0">
              ₹{product.packagePrice}
            </p> */}
            <span className="px-2 text-center text-sm font-medium p-0 text-black">
              {/* up to {product.packageDiscount} */}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute cartMob  top-10 p-5 bg-logoClr w-full">
        <h1
          onClick={handleCartMob}
          className=" mt-12 text-4xl text-right pr-3 mr-2"
        >
          {/* <i class="fa-solid fa-cart-shopping"></i> */}
        </h1>

        {cart && (
          <div className="relative ">
            <ShoppingCart />
          </div>
        )}
      </div>

      <div
        style={{ marginTop: "80px" }}
        className="absolute mtforMob  top-5 right-20 deskSingle"
      >
        <ShoppingCart />
      </div>
    </div>
  );
}
