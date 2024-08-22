import React, { useContext } from "react";
import { PackageContext } from "../../context/packageContext";
import packageImg from "../../images/services3.png";
import "./bestselling.css";
import { Link } from "react-router-dom";

export default function () {
  const { packageData } = useContext(PackageContext);

  if (!packageData || packageData.length === 0) {
    return null;
  }

  const handleClick = () => {
    const shopElement = document.getElementById("shopsection");
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="">
      {packageData.map((mypckg, i) => (
        <div key={i} className="flex justify-center items-center">
          <Link
            className="lg:flex lg:justify-start justify-between items-center lg:items-start"
            to="/shop"
          >
            <div className="flex justify-center items-center">
              <img
                className="rounded-xl mb-5 productSizeHome"
                // style={{ height: "180px", width: "290px" }}
                component="img"
                src={mypckg.packageImg}
                alt="Package Image"
              />
            </div>

            <div>
              <div style={{ height: "20px" }} className="flex flex-col">
                <span className="text-2xl">{mypckg.packageTitle}</span>
                <span className="text-pgcolor text-xl tracking-wide">
                  {mypckg.packageDescription}
                </span>
              </div>
              <div className="lg:flex  justify-center items-center px-10">
                <span className="text-xl textwidthOnMob w-64">
                  {mypckg.packageName}
                </span>

                <Link
                  className="align-middle mt-2 flex justify-center items-center"
                  to="/shop"
                >
                  <span className="signup-Btn">Shop Now</span>
                </Link>
              </div>{" "}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
