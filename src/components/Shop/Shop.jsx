import React, { useContext, useEffect } from "react";
import "./shop.css";
import { PackageContext } from "../../context/packageContext";
import { CartContext } from "../../context/cartContext";
import Button from "@mui/material/Button";
import Shopcart from "../Cart/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import pckg1Img from "../../images/pck1.png";
import loadingGif from "../../images/loading.gif";

export default function Shop() {
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const { packageData } = useContext(PackageContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (!packageData || packageData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  return (
    <div
      id="shopsection"
      style={{ height: "180vh" }}
      className="container w-75"
    >
      <div className="mt-20">
        <div className="topSec bg-logoClr">
          <div className="py-20 lg:px-20 headingShop text-white text-4xl font-roboto">
            <h3 className="px-4 headMob text-5xl lg:text-5xl tracking-widest font-sans font-black text-white">
              Shop
            </h3>
          </div>
        </div>
        <div className="lg:px-15 lg:mx-10 lg:ml-20">
          <div className="pt-20 flex pb-3 text-3xl tracking-normal font-roboto text-main font-black description">
            <h3 className="lg:px-4 headMob tracking-wide leading-25 text-2xl font-bold text-black">
              Shop For Vehiconnect QR Code
            </h3>
          </div>
          <div className="flex lg:mx-5 lg:gap-6 flex-wrap mobFlexCol desktopwidth">
            {packageData.map((product, i) => (
              <div key={i} className="relative ml-0 mobCard flex w-90 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <div className="relative mx-3 mt-1 flex h-50 overflow-hidden my-3 rounded-2xl">
                  <img
                    className="productSizeOnShop rounded-2xl"
                    src={pckg1Img}
                    alt="shop_image"
                  />
                </div>
                <div className="mt-4 px-3 pb-3">
                  <div className="flex items-center">
                    <span className="mr-2 rounded bg-yellow-200 py-0.5 text-xs font-semibold">
                      {product.packageName}
                    </span>
                  </div>

                  <h5 className="text-main font-roboto tracking-tight font-thin">
                    {product.packageTitle}
                  </h5>
                  <h5 className="text-main font-roboto tracking-tight font-thin">
                    {product.packagkeDescription}
                  </h5>
                  <div className="mt-1 mb-2 flex items-center justify-between">
                    <p>
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{product.packagePrice}
                      </span>
                    </p>
                    <div className="buy">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        style={{ backgroundColor: "#ff5722" }}
                        variant="contained"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Shopcart automatically */}
      <div className="absolute cartMob top-10 p-5 bg-logoClr w-full">
        <Shopcart />
      </div>
      <div id="deskview" className="mtforMob absolute lg:top-5 right-10">
        <Shopcart />
      </div>
    </div>
  );
}
