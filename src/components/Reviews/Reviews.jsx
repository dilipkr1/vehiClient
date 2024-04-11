import React from "react";
import r1 from "../../images/r1.jpeg";
import r2 from "../../images/r2.jpg";
import r3 from "../../images/r3.jpg";

const Reviews = () => {
  return (
    <>
      <section
        style={{ margin: "100px 90px" }}
        className=" text-neutral-700 dark:text-neutral-300 mx-20 gap-14"
      >
        <div class="grid gap-6 text-center md:grid-cols-3 ">
          <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
            <div class="h-28 overflow-hidden rounded-t-lg bg-logoClr"></div>
            <div class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
              <img style={{ height: "100px", width: "100px" }} src={r1} />
            </div>
            <div class="p-6">
              <h4 class="mb-4 text-2xl font-semibold">Aanya</h4>
              <hr />
              <p class="mt-4">
                <span class="inline-block pe-2 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                  </svg>
                </span>
                Scan QR, report accidents fast. <br /> Essential for parking
                emergencies
              </p>
            </div>
          </div>
          <div>
            <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
              <div class="h-28 overflow-hidden rounded-t-lg bg-logoClr"></div>
              <div class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img style={{ height: "100px", width: "100px" }} src={r2} />
              </div>
              <div class="p-6">
                <h4 class="mb-4 text-2xl font-semibold">Rajesh Meena</h4>
                <hr />
                <p class="mt-4">
                  <span class="inline-block pe-2 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                    </svg>
                  </span>
                  Quickly connect to parking management. <br /> Easy solution
                  for accidents
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
              <div class="h-28 overflow-hidden rounded-t-lg bg-logoClr"></div>
              <div class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img style={{ height: "100px", width: "100px" }} src={r3} />
              </div>
              <div class="p-6">
                <h4 class="mb-4 text-2xl font-semibold">GANESH KUMAR SAINI</h4>
                <hr />
                <p class="mt-4">
                  <span class="inline-block pe-2 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                    </svg>
                  </span>
                  Efficient QR system for parking accidents.
                  <br /> Lifesaver in emergencies!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
