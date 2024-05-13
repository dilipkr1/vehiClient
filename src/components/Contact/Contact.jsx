import React, { useContext, useEffect, useState } from "react";
import "./contact.css";
import axios from "axios";
import { SettingDataContext } from "../../context/settingDetContext";
import { SocialMediaContext } from "../../context/settingSociaContext";
function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const { socialMediaData } = useContext(SocialMediaContext);
  const [data, setData] = useState({ settingData: {}, socialMediaData: {} });
  const { settingData } = useContext(SettingDataContext);
  const [sentMessage, setSentMessage] = useState(false);
  const [formData, setFormData] = useState({
    ctName: "YourName",
    ctEmail: "example@gmail.com",
    ctPhone: "Your Mobile Number",
    ctMessage: "Your Message",
  });

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }
  useEffect(() => {
    if (socialMediaData && settingData) {
      setData({ socialMediaData, settingData });
    }
    setIsLoading(false);
  }, [socialMediaData, settingData]);

  const getSettingData = data.settingData[0];
  const socialMedia = data.socialMediaData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const url = `${baseUrl}/create-user-query`; 
    try {
      const response = await axios.post(url, {
        ...formData,
      });
      if (response.status === 201) {
        setSentMessage(true);
        setTimeout(() => {
          setSentMessage(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-20 mb-20 bg-pricingcard w-full  tracking-wide overflow-hidden">
      <div className="topSec bg-logoClr px-4">
        <div className="py-20 lg:mx-10 lg:px-20 headingShop text-white text-4xl font-roboto">
          <h3 className=" text-5xl font-black   text-white tracking-wider">
            Contact
          </h3>
        </div>
      </div>
      {/* this will be at left sidebar */}
      <div className="px-4 lg:flex lg:ml-20  lg:p-20">
        <div className="flex  flex-col">
          <div className="lg:mt-4 px-4 lg:px-0">
            <h3 className="marginOnMob mt-3 text-4xl font-black   text-main">
              Get in touch
            </h3>
            <p>
              <p className="text-pgcolor text-xl">
                Get in touch, we will get back to you within 24 hrs.
              </p>
            </p>
          </div>
          <div>
            <hr className="font-5 mb-8 text-gray " />
            <h5 className="pb-3 text-xl font-medium tracking-wider">Office</h5>
            <span className="font-bold text-sm text-pretty text-black">
              <i className="pr-2 fa-solid fa-house"></i>
              {getSettingData?.address}
            </span>
          </div>
          <div className="singleInfor pt-4">
            <h5 className="font-medium text-main ">Phone (10 AM - 6 PM) </h5>

            <p className="text-pgcolor text-xl font-roboto leading-10">
              {/* <i class="fa-solid fa-phone pr-2"></i>WhatsApp Only{" "} */}
              {/* <br /> Call :{" "}
              <a className="text-shopbgcolor" href={`tel:${getSettingData?.phone}`}>
                +917300042153
              </a> */}
              <br />
              For Business Only :{" "}
              <a
                className="text-shopbgcolor"
                href={`tel:${getSettingData?.phone}`}
              >
                +91{getSettingData?.phone}
              </a>
            </p>
          </div>
          <div className="support">
            <h5 className="font-normal text-xl mb-4 tracking-wider">Support</h5>
            <span className="">
              <i class="fa-solid fa-envelope-circle-check"></i>{" "}
              {getSettingData?.email}
            </span>
          </div>
          <div className="">
            <h5 className="font-medium py-3 text-xl tracking-wider">
              follow Us
            </h5>
            <ul className="flex gap-8">
              <li>
                <a href={socialMedia?.facebook}>
                  <i className="fa-brands fa-facebook  rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href={socialMedia?.instagram}>
                  <i className="fa-brands fa-instagram rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href={socialMedia?.twitter}>
                  <i className="fa-brands fa-twitter  rounded-full px-2 py-2"></i>
                </a>
              </li>

              <li>
                <a href={socialMedia?.linkedin}>
                  <i className="fa-brands fa-linkedin  rounded-full px-2 py-2"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
 

        <div className="flex shadow-2xl shadow-logoClr flex-col letsConnect bg-white mt-5 lg:p-8 p-2 lg:ml-20 rounded-2xl lg:w-100">
          <h5 className="text-4xl font-black   text-main">Lets Connect</h5>
          <p className="text-pgcolor tracking-wide">
            We respond to all quires, please be specific about your question.
          </p>
          <form onSubmit={handleSubmit} className="p-2" action="">
            <div className="lg:flex lg:gap-6 lg:justify-start  lg:items-center  text-pgcolor">
              <div className="my-3">
                <input
                  name="ctName"
                  onChange={handleChange}
                  className="py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                  typecli="text"
                  defaultValue={formData.ctName}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  name="ctEmail"
                  className="py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                  type="email"
                  placeholder="Your Email"
                  defaultValue={formData.ctEmail}
                />
              </div>
            </div>
            <div className="my-3">
              <div className="flex ">
                {/* <div className="code flex justify-center items-center lg:w-20">
                  <span>+91</span>
                </div> */}
                <input
                  type="tel"
                  onChange={handleChange}
                  name="ctPhone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  oninput="this.value = this.value.slice(0, 10)"
                  className="py-3 pl-4  bg-inputbgclr w-full  outline-none outline-white  text-xl"
                  placeholder="Enter Your 10 digit Mobile Number"
                />
              </div>
            </div>
            <div className="selectOption">
              <label
                for="General Question"
                className="block text-sm font-medium  dark:text-white"
              >
                Select an option
              </label>
              <select
                onChange={handleChange}
                name="ctQuest"
                id="countries"
                className="text-pgcolor py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                defaultValue={formData.ctQuest}
              >
                <option value="General Question">General Question</option>
                <option value="Complain">Complain</option>
                <option value="Feedback">Feedback</option>
                <option value="Job/Career">Job/Career</option>
                <option value="Legal">Legal</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            <div className="my-2">
              <input
                name="ctMessage"
                className="py-3 mb-4 bg-inputbgclr  outline-none outline-white pl-4 text-xl  w-full h-20 "
                type="message"
                maxLength={100}
                placeholder="Your Message"
                defaultValue={formData.ctMessage}
              />
            </div>
            <div className="gap-4">
              <label
                className="text-pgcolor font-medium 
            "
                htmlFor="Term and Condition"
              >
                <input
                  required
                  className="font-medium py-3 text-xl"
                  type="checkbox"
                />
                <span className="pl-1">
                  I agree to the
                  <a
                    className="pl-1 text-color1 text-xs tracking-wider font-semibold"
                    href="https://vehiclean.in/index.php/terms-conditions/"
                  >
                    Terms & Conditioins
                  </a>
                </span>
              </label>
              <small
                className=" text-pretty text-pgcolor font-medium tracking-wide
            "
              >
                <br />
                {/* We will not spam or bother you, we may contact you for any
                further questions. */}
              </small>
            </div>
            <div className="my-4">
              {sentMessage && (
                <p style={{ color: "green" }} className="bg-white">
                  Successfully Sent,
                  <br /> Our team will connect with you
                </p>
              )}
              <input
                className="bg-black hover:bg-logoClr rounded-2xl cursor-pointer p-2 text-white w-full py-2 font-roboto tracking-wide"
                value={"send message"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
