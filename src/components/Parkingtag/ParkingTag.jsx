import React from "react";
import fetureImg from "../../images/services3.png";

function ParkingTag() {
  return (
    <div
      style={{ marginTop: "50px" }}
      class="container  px-10 overflow-x-hidden"
    >
      <div class="grid grid-cols-2 flexColMob">
        <div class="flex justify-start items-center order-2">
          <img className="fetureImg" src={fetureImg} alt="my_img" />
        </div>
        <div class="flex justify-start items-start order-1 lg:ml-10 lg:pl-5">
          <div className="heading  lg:gap-3">
            <h3 className="text-pgcolor text-2xl">THE CAR PARKING TAG.</h3>
            <div className="title my-2">
              <h1 className="text-main text-4xl font-bold tracking-wide">
                Durable and One time purchase <br />
                Parking Tag.
              </h1>
              <div className="points mt-5">
                <li>One Time Purchase</li>
                <li>Recharge / Validity </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingTag;
