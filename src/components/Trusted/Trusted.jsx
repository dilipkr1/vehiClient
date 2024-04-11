import React from "react";
import mobImgg from "../../images/mobNumsec.png";
import "./trust.css";
const Trusted = () => {
  return (
    <div className="mt-20 ">
      <div className="header text-pgcolor tracking-wider  text-center lg:text-4xl text-3xl my-5 font-bold font-roboto">
        <h2 className="w-full textwidthOnMob textwidthcxyServices ">
          Trusted by 150,000 users, Buy the tag today to join the world of
          privacy.
        </h2>
      </div>

      <div className="flex  justify-center items-center my-4 lg:gap-16 gap-6 flexColMob">
        {/* <div className="flexColMob"> */}
        <div className="flex flex-col gap-3">
          <span className="text-4xl font-bold text-logoClr">150,000+</span>
          <span className="text-pgcolor">Active users</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <span className="text-4xl font-bold text-logoClr">50K++</span>
          <span className="text-pgcolor">APP Download</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-logoClr gap-3"> 4X </span>
          <span className="text-pgcolor">Revenue Growth</span>
        </div>
        {/* </div> */}
      </div>
      <div className=" flex justify-center items-center">
        <img className="imgTrusted" src={mobImgg} alt="mob_congImg" />
      </div>
    </div>
  );
};

export default Trusted;
