import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import heroImg from "../../images/hero.png";
import fallback from "../../images/hero.png";
import { SocialMediaContext } from "../../context/settingSociaContext";
import { SettingDataContext } from "../../context/settingDetContext";
 
import { Link } from "react-router-dom";

export default function Home() {
  // const { socialMediaData } = useContext(SocialMediaContext);
  // const [data, setData] = useState({ settingData: {}, socialMediaData: {} });
  // const { settingData } = useContext(SettingDataContext);

  // useEffect(() => {
  //   if (socialMediaData && settingData) {
  //     setData({ socialMediaData, settingData });
  //   }
  // });

  // const getSettingData = data.settingData[0];
  // const socialMedia = data.socialMediaData;

  return (
    <div className="homeLinear font-roboto lg:justify-start grid grid-cols-3 lg:px-12 lg:flex-row justify-center lg:text-left lg:items-center customMobflexCol lg:gap-8    customTextalign">
      <div className="mx-10   mb-5 flex lg:justify-end mt-20  flex-col items-center   lg:col-span-2">
        <picture
          style={{
            marginTop: "20px",
          }}
          className="lg:w-70 lg:h-90 lg:pt-10 rounded-2xl"
        >
          <source width="100%" media="(min-width: 200px)" srcset={heroImg} />
          <source media="(max-width: 1300px)" srcset={heroImg} />
          <img
            className="rounded-lg"
            // loading="lazy"
            src={fallback}
            alt="home1_images"
          />
        </picture>
      </div>

      <div
        id="customerItem"
        className="px-6 lg:text-left gap-2  lg:flex lg:flex-col lg:mt-20 lg:pt-10 lg:items-start  pr-2 leading-25"
      >
        <div className="">
          <span className="lg:text-left   customTextalign font-bold tracking-wide text-main ">
            <span className="lg:text-xl mb-2 text-main font-bold font-sans  customTextalign uppercase tracking-wider">
              {/* {getSettingData?.businessName &&
              getSettingData.businessName.slice(0, 11)} */}
              Vehi
              <span className="text-logoClr">Connect</span>
            </span>
            <br />
            Now Connect with Vehicle Owner.
          </span>
          <h1
            style={{ fontWeight: "500" }}
            className="uppercase giveSpace  text-main customTextalign mt-2.5 mx-0 mb-3 lg:text-2xl  text-4xl font-roboto tracking-wider   lg:text-left  leading-10 "
          >
            Let's make you your Vehicle Safe when it parked
          </h1>
          <p className="giveSpace  text-pgcolor  customTextalign lg:text-left sm:text-base leading-30 tracking-wide">
            Your Phone number is not shared, and anyone with a smartphone can
            contact you for any issues with your parked vehicle.
          </p>
        </div>

        <ul className="mt-3  font-roboto mb-4 flex customMobflexCol  lg:flex-row justify-center items-center text-left lg:gap-4">
          {/*  */}
          <li className="font-roboto order-1 list-square rounded-md playStore flex justify-center items-center bg-logoClr  text-white mb-4 text-sm">
            <Link
              className="flex justify-center items-center py-2.5 px-5"
              to="/shop"
            >
              <i
                style={{ color: "#ffffff", padding: "0 5px" }}
                className="fa-brands fa-2x fa-shopify"
              ></i>
              <span className="font-roboto  flex flex-col px-2 text-lg">
                <span className="font-roboto text-sm inline-flex leading-tight "></span>
                Shop Now
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
