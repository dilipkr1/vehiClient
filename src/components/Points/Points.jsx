import React from "react";
import fetureImg from "../../images/carScanner.png";
import "./points.css";
function Points() {
  return (
    <div class="container mt-10  px-4 overflow-x-hidden">
      <div class="grid grid-cols-2 flexColMob">
        <div class="flex justify-center items-center">
          <img className="fetureImg" src={fetureImg} alt="fetureImg" />
        </div>
        <div class="flex justify-start items-center">
          <div className="heading gap-3 mt-3">
            <h3 className="text-pgcolor textWidthPoints text-2xl font-bold">
              WHAT MAKES US DIFFERENT?
            </h3>
            <div className="title my-2">
              <h1 className="text-main textWidthPoints lg:text-4xl text-3xl font-bold tracking-wide">
                We love to innovate, We are improving &nbsp;&nbsp;&nbsp; and
                expanding fast.
              </h1>
              <div className="points flex flex-col mt-8 flexColMob">
                <div className="flex flexColMob lg:gap-4">
                  <div className="descriptioin">
                    {/* <ol> */}
                    <span
                      style={{ color: "#222222" }}
                      className="font-bold text-xl"
                    >
                      {" "}
                      <i class="fa-solid fa-lightbulb"></i>&nbsp; Creativity
                    </span>
                    <p className="w-15">
                      Great Quality Tag, Waterproof and durable
                      <br /> Tags.
                    </p>
                    {/* </ol> */}
                  </div>
                  <div className="descriptioin">
                    {/* <ol> */}
                    <span
                      style={{ color: "#222222" }}
                      className="font-bold text-xl"
                    >
                      <i class="fa-solid fa-users"> </i>
                      &nbsp; Privacy Thinking
                    </span>
                    <p className="w-15">
                      All of our products are focused towards &nbsp;
                      &nbsp;&nbsp;&nbsp;
                      <br />
                      privacy.
                    </p>
                    {/* </ol> */}
                  </div>
                </div>
                <div className="flex flexColMob  gap-4">
                  <div className="descriptioin">
                    <span
                      style={{ color: "#222222" }}
                      className="font-bold text-xl"
                    >
                      <i class="fa-solid fa-comment"></i>
                      &nbsp;Feedback
                    </span>

                    <p className="w-15">
                      We will take your feedback and will &nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;
                      <br /> implement Do try us.
                    </p>
                  </div>

                  <div className="descriptioin">
                    {/* <ol> */}
                    <span
                      style={{ color: "#222222" }}
                      className="font-bold text-xl"
                    >
                      <i class="fa-solid fa-headset"></i>
                      &nbsp;Top-Notch Support
                    </span>

                    <p className="">
                      We have support, who loves to do their &nbsp;&nbsp;
                      &nbsp;&nbsp;
                      <br /> Job.
                    </p>
                    {/* </ol> */}
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

export default Points;
