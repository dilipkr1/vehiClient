import React from "react";
import "./contactus.css";
function Contactus() {
  return (
    <div className="mt-20 mb-20 bg-pricingcard w-full  tracking-wide overflow-hidden">
      <div className="topSec bg-shopbgcolor px-4">
        <div className="py-20 lg:mx-10 lg:px-20 headingShop text-white text-4xl font-roboto">
          <h3 className=" text-3xl font-black   text-white tracking-wider">
            Contact
          </h3>
        </div>
      </div>
      {/* this will be at left sidebar */}
      <div className="px-4 lg:flex lg:ml-20  lg:p-20">
        <div className="flex  flex-col">
          <div className="lg:mt-4 px-4 lg:px-0">
            <h3 className="marginOnMob text-4xl font-black   text-main">
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
              <i className="pr-2 fa-solid fa-house"></i>Address : C-2 Sagar
              Enclave, Near Vande Matram Circle, Mansarovar, Jaipur, Rajasthan,
              302020
            </span>
          </div>
          <div className="singleInfor pt-4">
            <h5 className="font-medium text-main ">Phone (10 AM - 6 PM) </h5>

            <p className="text-pgcolor text-xl font-roboto leading-10">
              <i class="fa-solid fa-phone pr-2"></i>WhatsApp Only{" "}
              <a className="text-shopbgcolor" href="/">
                1234567890
              </a>
              <br /> Call :{" "}
              <a className="text-shopbgcolor" href="/">
                0120 360 2633
              </a>
              <br />
              For Business Only :{" "}
              <a className="text-shopbgcolor" href="/">
                1234567890
              </a>
            </p>
          </div>
          <div className="support">
            <h5 className="font-normal text-xl tracking-wider">Support</h5>
            <p>
              <i></i>hello@ngf132.com
            </p>
          </div>
          <div className="">
            <h5 className="font-medium py-3 text-xl tracking-wider">
              follow Us
            </h5>
            <ul className="flex gap-8">
              <li>
                <a href="/">
                  <i className="fa-brands fa-facebook bg-bgnavclr rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-instagram bg-bgnavclr rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-twitter bg-bgnavclr rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-youtube bg-bgnavclr rounded-full px-2 py-2"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-linkedin bg-bgnavclr rounded-full px-2 py-2"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* below will be at ritht */}

        <div className="flex flex-col letsConnect bg-white mt-5 lg:p-5 p-2 lg:ml-20 rounded lg:w-100">
          <h5 className="text-4xl font-black   text-main">Lets Connect</h5>
          <p className="text-pgcolor tracking-wide">
            We respond to all quires, please be specific about your question.
          </p>
          <form action="">
            <div className="lg:flex lg:gap-6 lg:justify-start  lg:items-center">
              <div className="my-3">
                <input
                  className="py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                  typecli="text"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <input
                  className="py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="my-3">
              <div className="flex ">
                <div className="code lg:w-20">india +91</div>
                <input
                  className="py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                  type="number"
                  placeholder="Phone"
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
                id="countries"
                className="text-pgcolor py-3 bg-inputbgclr w-full outline-none outline-white pl-4 text-xl"
                placeholder="General Question"
              >
                <option selected>General Question</option>
                <option value="US">Complain</option>
                <option value="CA">Feedback</option>
                <option value="FR">Job/Career</option>
                <option value="DE">Legal</option>
                <option value="DE">Investment</option>
              </select>
            </div>
            <div className="my-2">
              <input
                className="py-3 mb-4 bg-inputbgclr  outline-none outline-white pl-4 text-xl  w-full h-20 "
                type="message"
                placeholder="Your Message"
              />
            </div>
            <div className="gap-4">
              <label
                className="text-pgcolor font-medium 
            "
                htmlFor="Term and Condition"
              >
                <input className="font-medium py-3 text-xl" type="checkbox" />
                <span className="">
                  {" "}
                  I agree to the
                  <a
                    className=" text-color1 tracking-wider font-semibold"
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
                We will not spam or bother you, we may contact you for any
                further questions.
              </small>
            </div>
            <div className="my-4">
              <input
                className="bg-black text-white w-full py-2 font-roboto tracking-wide"
                value={"send message"}
                type="submit"
              />
            </div>
            <div className="text-pgcolor  font-roboto ">
              <span>Get instant response on WhatsApp, Write us here.</span>
              <a href="#">
                <button>
                  <i></i> WhatsApp us.
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="map lg:ml-20 bg-pricingcard">
        <iframe
          title="rendering map "
          className="hover: scale-150 duration-150 "
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5162.713463886026!2d75.73438600415845!3d26.854709420798688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db56937ee5f93%3A0xd828666dcdcb6069!2sVehiclean%20smart%20solutions%20pvt!5e0!3m2!1sen!2sin!4v1706969780286!5m2!1sen!2sin"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contactus;
