import React, { useContext, useEffect, useState } from "react";
import "./footer.css";
import { SocialMediaContext } from "../../context/settingSociaContext";
import { SettingDataContext } from "../../context/settingDetContext";
import hzLogo from "../../images/hz_vehiclean.png";
import { Link } from "react-router-dom";
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
    <div className="dontDisplayOnmob pt-4 lg:pb-2 px-2 flexMobCol bg-pricingcard font-normal text-pgcolor tracking-wide  ">
      <div className="MobView leftFooter mt-4 flex   justify-evenly text-pgcolor leading-4 mobPadd">
        <div className="flex justify-start flex-col items-start  gap-2">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={hzLogo} alt="" />
          </Link>

          <p className="">
            Contact vehicle owner when in <br /> VehiConnect Call vehicle owner
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
        <div className="navItem flex flex-col ">
          <ul className="flex MobViewRow flex-col gap-4 mobp">
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>{" "}
            <li>
              <a href="/refund">Refund-Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & condtions</a>
            </li>
            <li>
              <a href="/privacy">Privcy & Policy</a>
            </li>
          </ul>
        </div>

        <div className="navItem flex flex-col gap-4 mobPadd">
          <a href={`mailto:${getSettingData?.email}`}>
            {getSettingData?.email}
          </a>
          <a href="tel:+91{getSettingData?.phone}">
            +91{getSettingData?.phone}
          </a>
          <span
            className="tracking-wider"
            href="https://maps.app.goo.gl/qDJCPWuXXKk7mZ647"
          >
            {getSettingData?.address}
          </span>
        </div>
      </div>
      {/* </div> */}
      <hr className="mt-4" />
      <div className="flex justify-between lg:px-20 MobView mobPadd">
        <div className="copyRight flex gap-4 mt-2 pl-32">
          <button className="flex bg-white hover:bg-pricingcard text-main-700 font-semibold   py-2 lg:px-4 px-3 border border-blue-50 hover:border-transparent rounded">
            <a href={socialMedia?.android}>
              <svg
                className="mr-3 w-7 h-7 "
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
            </a>
            Download
          </button>
          <button className="flex bg-transparent hover:bg-white text-main-700 font-semibold py-2 lg:px-4 px-3 border border-blue-50 hover:border-transparent rounded">
            <a href={socialMedia?.ios}>
              <svg
                className="mr-3 w-7 h-7 "
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google-play"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                ></path>
              </svg>
            </a>{" "}
            Download
          </button>
        </div>
        <div className="mt-2 p-0 text-xs text-pgcolor">
          <p className="text-center mx-auto">
            Copyright © 2024 {getSettingData?.businessName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
