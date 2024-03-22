import React, { useContext, useEffect, useState } from "react";
import "./shop.css";
import { PackageContext } from "../../context/packageContext";
import { CartContext } from "../../context/cartContext";
import Button from "@mui/material/Button";
import Shopcart from "../Cart/ShoppingCart";
import { Link, useParams } from "react-router-dom";

export default function Shop() {
  const { dispatch } = useContext(CartContext);
  const { packageData } = useContext(PackageContext);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (!packageData || packageData.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="container w-70">
      <div className="mt-20">
        <div className="topSec bg-logoClr">
          <div className="py-20  lg:px-20 headingShop text-white text-4xl font-roboto">
            <h3 className="px-4  text-3xl tracking-widest font-sans font-black   text-white ">
              Shop
            </h3>
          </div>
        </div>
        <div className=" lg:px-15 lg:mx-10 lg:ml-20">
          <div className="pt-20 flex justify-between   pb-3  text-3xl  tracking-normal font-roboto text-main font-black  description">
            <h3 className="px-4 tracking-wide leading-25 text-2xl font-bold  text-black">
              SHOP FOR VEHICLEAN PRODUCTS.
            </h3>
          </div>
          <div
            style={{ width: "70vw" }}
            className="flex  mx-5  flex-wrap mobFlexCol"
          >
            {packageData.map((product) => (
              <div className="relative ml-0 m-2 flex w-80 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <Link
                  className="relative mx-3 mt-1 flex h-60 overflow-hidden rounded-2xl"
                  to={`/shop/${product._id}/product`}
                >
                  <img
                    className="object-cover w-full  hover:scale-125 hover:delay-150 hover:duration-500"
                    src={product.packageImg}
                    alt="shop_image"
                  />
                  <span className="absolute top-0 left-0 m-1 tracking-wide rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    {product.packageDiscount}% off
                  </span>
                </Link>
                <div className="mt-4 px-3 pb-3 ">
                  <div className="flex items-center">
                    <span className="mr-2 rounded bg-yellow-200  py-0.5 text-xs font-semibold">
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
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
          id="deskview"
        className="mtforMob  absolute lg:w-50    lg:top-20  right-10"
      >
        <Shopcart />
      </div>
    </div>
  );
}
