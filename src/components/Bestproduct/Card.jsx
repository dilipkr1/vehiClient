import React, { useContext } from "react";
import { PackageContext } from "../../context/packageContext";

export default function (props) {
  const { packageData } = useContext(PackageContext);

  if (!packageData || packageData.length === 0) {
    return <p>Loading...</p>;
  }
  const product1 = packageData[0];

  return (
    <div className=" lg:flex-row   p-10 rounded-l w-full grid  grid-cols-2 customMobflexCol    justify-center items-center lg:gap-0 gap-7 lg:gap-0">
      <div className=" p-5 pricingCard flex  flex-col justify-end item">
        <span className="text-2xl">{product1.packageName}</span>
        <span className="text-2xl">{product1.packageTitle}</span>
        <span className="text-xl">{product1.packageDescription}</span>
        {/* <span className="text-xl">{product1.packageDiscount}</span> */}
        <a href="/shop">
          <button className="bg-logoClr rounded-md px-5 py-3 text-white font-bold tracking-wide">
            Shop
          </button>
        </a>
      </div>
      <div className=" p-5 pricingBody flex flex-col justify-end  font-roboto font-thin   text-pgcolor tracking-wide leading-6">
        <picture
          style={{
            marginTop: "0px",
          }}
          className="lg:w-50 lg:h-90 lg:pt-10 rounded-lg"
        >
          <source
            width="90%"
            media="(min-width: 200px)"
            srcset={product1.packageImg}
          />
          <source media="(max-width: 1300px)" srcset={product1.packageImg} />
          <img loading="lazy" src={product1.packageImg} alt="packages_images" />
        </picture>
      </div>
    </div>
  );
}
