import React from "react";
import fetureImg from "../../images/services3.png";

function Ourservices() {
  return (
    <div className="mt-10 px-4">
      <div
        style={{ marginTop: "70px" }}
        className=" flex flex-col lg:justify-center items-center"
      >
        <span className="text-pgcolor textOnMob mt-5  text-2xl uppercase font-bold">
          What we do ?
        </span>
        <div>
          <h3 className="textwidthServices px-4 textwidthcxyServices mt-3  lg:text-3xl text-pgcolor  text-3xl tracking-wider   font-700 font-extrabold">
            The service we offer is specifically designed to meet your needs.
          </h3>
        </div>
      </div>
      <div class="container mt-10   overflow-x-hidden">
        <div class="grid grid-cols-2 flexColMob">
          <div class="flex justify-center items-center">
            <img className="fetureImg" src={fetureImg} alt="my_img" />
          </div>
          <div class="flex justify-start items-center textWithServ px-5">
            <div className="heading gap-3 pl-">
              <h3 className=" text-pgcolor textwidthOnMob text-2xl uppercase font-sans font-bold">
                Car / Bike Parking tag
              </h3>
              <span className="textwidthOnMob ">
                Your contact details will not be shared, but anyone who has any
                issue with your parked vehicle can contact you. We will send you
                SMS and Masked call..
              </span>
              <div className="title my-2 ">
                <div className="lists flex flex-col">
                  <span>
                    <i className="fa-solid bg-logoClr p-2 rounded-full m-1  fa-check"></i>
                    Masked Calls .
                  </span>
                  <span>
                    <i className="fa-solid bg-logoClr p-2 rounded-full m-1  fa-check"></i>
                    Emergency Call.
                  </span>
                  <span>
                    <i className="fa-solid bg-logoClr p-2 rounded-full m-1  fa-check"></i>
                    One-time Buy.
                  </span>

                  {/* <span>
                    <i className="fa-solid bg-logoClr p-2 rounded-full m-1  fa-check"></i>
                    Fast Tag Recharge.
                  </span>
                  <span>
                    <i className="fa-solid bg-logoClr p-2 rounded-full m-1  fa-check"></i>
                    Insurance and PUC reminders.
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ourservices;
