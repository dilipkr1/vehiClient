import React from "react";
import "./bestselling.css";
import Card from "./Card";

export default function Bestsellingpro() {
  return (
    <div className="mt-10">
      <div>
        <h3 className="docenter textwidthcxy lg:text-4xl mt-5  text-pgcolor text-3xl tracking-wider   font-700 font-extrabold">
          Checkout our products.
          <br />
          Visit shop to buy and enter the world of privacy !
        </h3>
      </div>
      {/* <div>
        <h3 className="lg:text-3xl textwidth text-pgcolor  text-3xl tracking-wider   font-700 font-extrabold">
          Visit shop to buy and enter the world of privacy !
        </h3>
      </div> */}
      <div className="w-full mr-5 mt-10 mb-6 items-center justify-center flex flex-row   lg:gap-0  overflow-hidden">
        <Card />
      </div>
    </div>
  );
}
