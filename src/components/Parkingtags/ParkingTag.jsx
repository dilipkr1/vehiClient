import React, { useState } from "react";
import "./parking.css";
import ParkingCard from "./ParCard";
import tagAllCards from "../ParkingData/ParkingFeatures";
export default function Parking() {
  const [parking, setParking] = useState(0);
  // const [businessCard, setBusinessCard] = useState(false);
  // const [doorTag, setDoortag] = useState(false);
  // const [menuTag, setMenutag] = useState(false);

  const handlButtonClick = (buttonId) => {
    setParking(buttonId);
  };

  const selectedTag = tagAllCards[parking];

  return (
    <div className="py-102 mt-20 lg:px-20 gap-12 ">
      <div className=" customMobflexCol lg:flex lg:justify-start justify-center items-center   gap-6 mb-10 mx-5 lg:gap-2  md:px-20 md:py-7">
        <div className=" lg:flex-col lg:justify-start lg:items-center lg:gap-0 gap-9">
          <div className="lg:my-2 custom-alignLeft parkingtags flex lg:justify-start justify-center lg:items-start items-center gap-3 ">
            <i className="fa-solid fa-qrcode mx-2 px-3 py-3 bg-color7 rounded-full"></i>
            <button id="1" onClick={() => handlButtonClick("0")}>
              Parking Tags
            </button>
          </div>
          <div className="lg:my-3 parkingMid flex  justify-between lg:gap-12">
            <div className=" lg:flex lg:justify-start lg:items-center flex ">
              <i className="lg:my-2 fa-solid fa-briefcase  mx-2 py-3 px-3 bg-color7 rounded-full"></i>
              <button id="2" onClick={() => handlButtonClick("1")}>
                Business Card
              </button>
            </div>
            <div className="lg:flex lg:justify-start lg:items-center flex">
              <i className="fa-solid fa-door-open mx-2 px-3 py-3 bg-color7 rounded-full"></i>
              <button id="3" onClick={() => handlButtonClick("2")}>
                Door Card
              </button>
            </div>
          </div>
          <div className="parkingTagBtm custom-alignLeft flex justify-center items-center  py-3">
            <i className="fa-solid fa-spoon  mx-2 px-3 py-3 bg-color7 rounded-full"></i>
            <button id="4" onClick={() => handlButtonClick("3")}>
              Menu Tags
            </button>
          </div>
        </div>
        <ParkingCard
          image={selectedTag.img}
          tagName={selectedTag.tagName}
          tagTitle={selectedTag.tagTitle}
          tagParagraph={selectedTag.tagParagraph}
        />
      </div>
    </div>
  );
}
