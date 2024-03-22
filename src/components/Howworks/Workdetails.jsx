import React from "react";
import "./workingdetails.css";

// import { workingDetails } from "./workingdetails";

export default function Workdetails() {
  return (
    <div className="lg:gap-16  flex flex-wrap justify-center items-center lg:mx-20 mt-4">
      <div className="shadow-boxShadow1 py-10  flex flex-col justify-center items-center text-center mt-7 p-5 lg:p-10 lg:mt-7 max-w-sm bg-white rounded-lg h-45  dark:bg-gray-800">
        <div>
          <div className="custombgColor">
            <i className=" iconSize fa-solid fa-white fa-shield px-3 py-3 rounded-full bg-color1"></i>
          </div>
          <h5 className="my-3 text-2xl font-bold tracking-tight ">
            Private Contact Shield
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Your contact details are not shared when someone contacts you.
          </p>
        </div>
      </div>

      <div class="shadow-boxShadow1 py-10  flex flex-col justify-center items-center text-center mt-7 p-5  max-w-sm bg-white rounded-lg   dark:bg-gray-800">
        <div className="">
          {/* <i class="fa-solid fa-phone"></i> */}
          <i className="iconSize  fa-solid fa-phone px-3 py-3 rounded-full bg-color5"></i>
          <h5 className="my-3 text-2xl font-bold tracking-tight ">
            Emergency Call
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Add your emergency contact details in the tag.
            It'll help you to connects..
            <br />
          </p>
        </div>
      </div>
      <div class="shadow-boxShadow1 py-10 flex flex-col justify-center items-center text-center mt-7 p-5 max-w-sm bg-white rounded-lg   dark:bg-gray-800">
        <div className="">
          <i className=" iconSize fa-solid fa-square-parking px-3 py-3 rounded-full bg-color6"></i>
          <h5 className="my-3 text-2xl font-bold tracking-tight ">
            Vehicle Entry Logs
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Effortlessly manage vehicle entry and exit records. 
          </p>
        </div>
      </div>
    </div>
  );
}
