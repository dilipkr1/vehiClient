import React, { useContext, useEffect, useState } from "react";
import "./footer.css";
import { SocialMediaContext } from "../../context/settingSociaContext";
import { SettingDataContext } from "../../context/settingDetContext";
export default function () {
  const [isLoading, setIsLoading] = useState(true);
  const { socialMediaData } = useContext(SocialMediaContext);
  const [data, setData] = useState({ settingData: {}, socialMediaData: {} });
  const { settingData } = useContext(SettingDataContext);

  useEffect(() => {
    if (socialMediaData && settingData) {
      setData({ socialMediaData, settingData });
    }
    setIsLoading(false);
  }, [socialMediaData, settingData]);

  const getSettingData = data.settingData[0];
  const socialMedia = data.socialMediaData;
  return (
    <div className="dontDisplayOnmob py-10 bg-pricingcard text-pgcolor tracking-wide	font-roboto font-thin ">
        <div className="leftFooter mt-20 flex justify-evenly text-pgcolor leading-4">
        <div className="flex flex-col  gap-5">
          <p className="">
            Contact vehicle owner when in <br /> VehiClean Call vehicle owner
            with Privacy
          </p>
           <i></i>
          <ul className="flex gap-8">
            <li>
              <a href={socialMedia?.facebook}>
                <i className="fa-brands fa-facebook bg-white rounded px-2 py-2"></i>
              </a>
            </li>
            <li>
              <a href={socialMedia?.facebook}>
                <i className="fa-brands fa-instagram bg-white rounded px-2 py-2"></i>
              </a>
            </li>
            <li>
              <a href={socialMedia?.facebook}>
                <i className="fa-brands fa-twitter bg-white rounded px-2 py-2"></i>
              </a>
            </li>
            <li>
              <a href={socialMedia?.facebook}>
                <i className="fa-brands fa-youtube bg-white rounded px-2 py-2"></i>
              </a>
            </li>
            <li>
              <a href={socialMedia?.facebook}>
                <i className="fa-brands fa-linkedin bg-white rounded px-2 py-2"></i>
              </a>
            </li>
          </ul>
          {/* </div> */}
        </div>
        {/* <div className="lowerMiddle"> */}
        <div className="navItem flex flex-col">
          <ul className="flex flex-col gap-4">
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/news">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/">Business</a>
            </li>
          </ul>
        </div>
        <div className="navItem flex flex-col gap-8">{/* </div> */}</div>
        <div className="navItem flex flex-col gap-4">
          <a href={`mailto:${getSettingData?.email}`}>
            {getSettingData?.email}
          </a>
          <p>+91{getSettingData?.phone}</p>
          <a
            className="tracking-wider"
            href="https://maps.app.goo.gl/qDJCPWuXXKk7mZ647"
          >
            {getSettingData?.address}
          </a>
        </div>
      </div>
      {/* </div> */}
      <hr className="my-10" />
      <div className="flex justify-between lg:px-20">
        <div className="copyRight flex gap-4">
          <button className="bg-white hover:bg-pricingcard text-main-700 font-semibold  py-2 px-4 border border-blue-50 hover:border-transparent rounded">
            <a href={socialMedia?.android}>Download for Apple</a>
          </button>
          <button className="bg-transparent hover:bg-white text-main-700 font-semibold  py-2 px-4 border border-blue-50 hover:border-transparent rounded">
            <a href={socialMedia?.ios}>Download for Android</a>
          </button>
        </div>
        <div className="text-pgcolor leading-4">
          <p>
            Copyright © 2024 {getSettingData?.businessName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
