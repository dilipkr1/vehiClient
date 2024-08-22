import React from "react";
import "./workingdetails.css";
import useoftag1 from "../../images/5.png";
import useoftag2 from "../../images/6.png";
import useoftag3 from "../../images/7.png";
import useoftag4 from "../../images/8.png";

// import { workingDetails } from "./workingdetails";

export default function Workdetails() {
  return (
    <div className="lg:gap-11 mt-20  flex flex-wrap  justify-center items-center lg:mx-20">
      <div
        style={{ width: "300px", height: "300px" }}
        className="shadow  lg:flex-wrap py-10  flex flex-col justify-center items-center text-center mt-7 p-5 lg:p-10 lg:mt-7 max-w-sm bg-white rounded-lg h-45  dark:bg-gray-800"
      >
        <div>
          <div className="flex justify-center items-center">
            <img
              style={{ maxWidth: "65px" }}
              className="useofTagImg"
              src={useoftag1}
              alt="useoftag1"
            />
          </div>
          <h5 className="my-3 text-2xl font-bold tracking-tight uppercase">
            Wrong <br /> Parked
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Experience the ultimate peace of mind knowing that your vehicle is
            securely connected to you, even when parked in unfamiliar
            surroundings.
          </p>
        </div>
      </div>
      <div
        style={{ width: "300px", height: "300px" }}
        className="shadow  py-10  flex flex-col justify-center items-center text-center mt-7 p-5 lg:p-10 lg:mt-7 max-w-sm bg-white rounded-lg h-45  dark:bg-gray-800"
      >
        <div>
          <div className="flex justify-center items-center">
            <img
              style={{ maxWidth: "65px" }}
              className="useofTagImg"
              src={useoftag2}
              alt="useoftag2"
            />
          </div>
          <h5 className="my-3 text-2xl font-bold tracking-tight uppercase">
            Baby Or pet in the car
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            VehiConnect offers invaluable support in safeguarding the well-being
            of your loved ones, even in unforeseen emergencies.
          </p>
        </div>
      </div>

      <div
        style={{ width: "300px", height: "300px" }}
        className="shadow  py-10  flex flex-col justify-center items-center text-center mt-7 p-5  max-w-sm bg-white rounded-lg   dark:bg-gray-800"
      >
        <div className="">
          <div className="flex justify-center items-center">
            <img
              style={{ maxWidth: "65px" }}
              className="useofTagImg"
              src={useoftag3}
              alt="useoftag3"
            />
          </div>
          <h5 className="my-3 text-2xl font-bold tracking-tight uppercase">
            In case of <br /> accident
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            In essence, the “Scan and Connect” feature of Vehiconnect acts as a
            guardian angel during moments of crisis.
            <br />
          </p>
        </div>
      </div>
      <div
        style={{ width: "300px", height: "300px" }}
        className="shadow  py-10 flex flex-col justify-center items-center text-center mt-7 p-5 max-w-sm bg-white rounded-lg   dark:bg-gray-800"
      >
        <div className="">
          <div className="flex justify-center items-center">
            <img
              style={{ maxWidth: "65px" }}
              className="useofTagImg"
              src={useoftag4}
              alt="useoftag4"
            />
          </div>{" "}
          <h5 className="my-3 text-2xl font-bold tracking-tight uppercase ">
            Something Wrong with this Car
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            “Scan and Connect” feature of Vehiconnect acts as a proactive
            companion, keeping you informed about your vehicle’s health,
            offering assistance when problems arise.
          </p>
        </div>
      </div>
      {/* <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/MQvwi2gUsuc?si=u9R-CL_2439_s3Qp"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div> */}
    </div>
  );
}
