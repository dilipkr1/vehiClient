import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { PackageContext } from "../../context/packageContext";
import { CartContext } from "../../context/cartContext";
import ShoppingCart from "../Cart/ShoppingCart";
import "./singleproduct.css";
export default function Singleproduct() {
  const { productId } = useParams();
  const { dispatch } = useContext(CartContext);
  const { packageData } = useContext(PackageContext);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  if (!packageData || packageData.length === 0) {
    return <p>Loading...</p>;
  }

  const product = packageData.find((item) => item._id === productId);
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ml-20 pl-20 lg:w-50 px-4 py-8 mt-20 pt-15">
      <div className="flex  rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto flex justify-center items-center">
            <img
              className="productSize object-cover p-4 "
              src={product.packageImg}
              alt={product.packageName}
            />
          </div>
          <div className="flex gap-2 my-3 p-4">
            <Button
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: "#ff5722",
                width: "150px",
                padding: "10px 0",
              }}
              variant="contained"
            >
              Add to cart
            </Button>
            <Button
              //   onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: "#ff9f00",
                width: "150px",
                padding: "10px 0",
              }}
              variant="contained"
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {product.packageTitle}
          </h2>
          <h4>{product.packageName}</h4>
          <p className="text-sm text-gray-600">{product.packageDescription}</p>
          <div className="flex  items-start justify-start mt-4">
            <p className="text-lg font-bold text-gray-900 p-0">
              ₹{product.packagePrice}
            </p>

            <span className="px-2 text-center text-sm font-medium p-0 text-black">
              up to {product.packageDiscount}% off
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "80px" }} className="absolute  top-10 right-20">
        <ShoppingCart />
      </div>
    </div>
  );
}
