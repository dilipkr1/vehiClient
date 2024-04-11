import React from "react";

const About = () => {
  return (
    <div className="mt-20">
      <div className="">
        <div className="topSec bg-logoClr">
          <div className="py-20  lg:px-20 headingShop text-white text-4xl font-roboto">
            <h3 className="mb-2 headMob text-5xl  lg:text-5xl tracking-widest font-sans font-black   text-white ">
              About Us
            </h3>

            {/* <div className="flex justify-center items-center"> */}
            <h2
              className="pl-6 text-white text-3xl tracking-wider 
            "
            >
              VehiSmart Clean Private Limited
            </h2>
            {/* </div> */}
          </div>
        </div>

        <div className="container mx-auto py-8 px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Who We Are</h2>
              <p className="text-pgcolor">
                At VehiSmart Private Limited, we are dedicated to providing
                top-notch doorstep car cleaning services in Jaipur. Our team is
                committed to ensuring your vehicle receives the care and
                attention it deserves, leaving it spotless and shining bright.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
              <p className=" text-pgcolor">
                Our mission is to redefine the car cleaning experience by
                offering convenient and high-quality services right at your
                doorstep. We aim to exceed our customers' expectations by
                delivering exceptional results every time.
              </p>
              <p className=" text-pgcolor">
                With a focus on professionalism and customer satisfaction, we
                strive to build long-lasting relationships with our clients and
                become the go-to choice for doorstep car cleaning services in
                Jaipur.
              </p>
            </div>
          </div>
        </div>

        <footer className="bg-gray-800 text-logoClr py-4">
          <div className="container mx-auto text-center">
            {/* <p>
              &copy; {new Date().getFullYear()} VehiConnect Private Limited. All
              rights reserved.
            </p> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
