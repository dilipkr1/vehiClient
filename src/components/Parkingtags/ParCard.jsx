

import React from 'react'

export default function ParkingCard(props) {
  return (
    <div>
        <div className="displayImageOnClick gap-6 lg:flex flex customMobflexCol justify-center text-main font-roboto lg:flex-1">
            <div className="">
              <img
                className="w-90"
                src={props.image}
                alt="parking1_image"
              />
            </div>
            <div className="gap-6">
              <span className="text-pgcolor tracking-wide font-thin">
                {props.tagName}
              </span>
              <h3 className="giveSpace my-5 sm:text-base text-4xl tracking-wider   text-left font-700 font-bold">
               {props.tagTitle}
              </h3>
              <p className="text-pgcolor tracking-wide leading-6">
                {props.tagParagraph}
              </p>
              <button
                type="button"
                className="my-4 w-40 text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <a className="no-underline " href="#">
                  Shop Now
                </a>
              </button>
            </div>
          </div>
    </div>
  )
}
