import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import heroImg from "../../images/hero.png";
import fallback from "../../images/hero.png";
import { SocialMediaContext } from "../../context/settingSociaContext";
import { SettingDataContext } from "../../context/settingDetContext";

export default function Home() {
  const { socialMediaData } = useContext(SocialMediaContext);
  const [data, setData] = useState({ settingData: {}, socialMediaData: {} });
  const { settingData } = useContext(SettingDataContext);

  useEffect(() => {
    if (socialMediaData && settingData) {
      setData({ socialMediaData, settingData });
    }
  });

  const getSettingData = data.settingData[0];
  const socialMedia = data.socialMediaData;

  return (
    <div className="lg:justify-start grid grid-cols-3 lg:px-20 lg:flex-row justify-center lg:text-left lg:items-center customMobflexCol lg:gap-8   font-roboto customTextalign">
      <div className="flex lg:justify-end mt-20  flex-col items-center   lg:col-span-2">
        <picture
          style={{
            marginTop: "20px",
          }}
          className="lg:w-70 lg:h-90 lg:pt-10 rounded-lg"
        >
          <source width="100%" media="(min-width: 200px)" srcset={heroImg} />
          <source media="(max-width: 1300px)" srcset={heroImg} />
          <img loading="lazy" src={fallback} alt="home1_images" />
        </picture>
      </div>

      <div
        id="customerItem"
        className="lg:text-left gap-2  lg:flex lg:flex-col lg:mt-20 lg:pt-10 lg:items-start  "
      >
        <span className="lg:text-left  align-baseline customTextalign font-bold tracking-wide text-logoClr">
          <span className="lg:text-xl  customTextalign">
            {getSettingData?.businessName &&
              getSettingData.businessName.slice(0, 11)}
          </span>{" "}
          - Now Connect with Vehicle Owner.
        </span>
        <h1 className="uppercase giveSpace customTextalign mt-2.5 mx-0 mb-3 lg:text-2xl  text3xl font-roboto tracking-wide font-bold text-main font-700  lg:text-left  leading-7.2 ">
          Let make you your Vehicle Safe when it parked
        </h1>
        <p className="giveSpace text-pgcolor customTextalign lg:text-left sm:text-base leading-30">
          Your Phone number is not shared, and anyone with a smartphone can
          contact you for any issues with your parked vehicle.
        </p>

        <ul className="mt-3  mb-4 flex customMobflexCol  lg:flex-row justify-center items-center text-left lg:gap-4">
          <li className="order-2 list-square rounded-md playStore flex justify-center items-center bg-black hover:bg-white hover:text-black text-white mb-4 text-sm">
            <a
              className="flex justify-center items-center py-2.5 px-5"
              href={socialMedia?.ios}
            >
              <i className="fa-brands fa-apple fa-3x"></i>
              <span className="flex flex-col px-2 text-lg">
                <span className="text-sm inline-flex leading-tight">
                  Available on the
                </span>
                Apple Store
              </span>
            </a>
          </li>
          <li className="order-1 list-square rounded-md playStore flex justify-center items-center bg-white hover:bg-black hover:text-white text-black mb-4 text-sm">
            <a
              className="flex justify-center items-center py-2.5 px-5"
              href={socialMedia?.android}
            >
              <i className="fa-solid fa-play fa-3x"></i>
              <span className="flex flex-col px-2 text-lg">
                <span className="text-sm inline-flex leading-tight">
                  Available on the
                </span>
                Google Play
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
