import React from "react";
import "./parking.css";
import fetureImg from "../../images/SMS NOTIFICATION-1.png";

function vehFeatures() {
  return (
    <div class="container mt-10  px-4 overflow-x-hidden">
      <div class="grid grid-cols-2 flexColMob ">
        <div class="flex justify-center items-center">
          <img className="fetureImg" src={fetureImg} alt="fetureImg" />
        </div>
        <div class="flex justify-start items-center">
          <div className="heading gap-3 mt-4">
            <h3 className="text-pgcolor textwidthVf lg:text-3xl text-2xl">
              VEHICLE PARKING TAG
            </h3>
            <div className="title my-2">
              <h1 className="text-pgcolor textwidthVf textwidthLeft lg:text-4xl text-3xl font-bold tracking-wide ">
                Privacy and Security at its Best VehiConnect&nbsp;Parking Tag.
                {/* <br /> */}
              </h1>

              <div className="points flex flex-col mt-8 flexColMob">
                <div className="flex flexColMob gap-4">
                  <div className="descriptioin">
                    <ol>
                      <span
                        style={{ color: "#222222" }}
                        className="font-bold text-xl"
                      >
                        {" "}
                        1.Private Contacts
                      </span>
                      <p className="w-15">
                        Your contact details are not shared
                        <br /> when someone contacts <br /> you.
                      </p>
                    </ol>
                  </div>
                  <div className="descriptioin">
                    <ol>
                      <span
                        style={{ color: "#222222" }}
                        className="font-bold text-xl"
                      >
                        2. Call Masking
                      </span>
                      <p className="w-15">
                        Shield your identity while making calls. <br />
                        your number remains hidden.
                      </p>
                    </ol>
                  </div>
                </div>
                <div className="flex flexColMob  gap-4">
                  <div className="descriptioin">
                    <ol>
                      <span
                        style={{ color: "#222222" }}
                        className="font-bold text-xl"
                      >
                        {" "}
                        3.Validity
                      </span>

                      <p className="w-15">
                        Purchase one-year one-time validity
                        <br /> with upgrade flexibility.
                      </p>
                    </ol>
                  </div>

                  <div className="descriptioin">
                    <ol>
                      <span
                        style={{ color: "#222222" }}
                        className="font-bold text-xl"
                      >
                        {" "}
                        4.Emergency Calls
                      </span>

                      <p className="">
                        Add your emergency contacts to <br />
                        contact.
                      </p>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default vehFeatures;
