import React, { useEffect } from "react";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-20">
      <div className="">
        <div className="topSec bg-logoClr">
          <div className="py-20  lg:px-20 headingShop text-white text-4xl font-roboto">
            <h3 className="mb-2 headMob text-5xl  lg:text-5xl tracking-widest font-sans font-black   text-white ">
              About Us
            </h3>
             <h2
              className=" text-white headMob mx-auto lg:2xl text-xl tracking-wider 
            "
            >
              VehiConnect Private Limited
            </h2>
          </div>
        </div>

        <div className="container mx-auto py-8 px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to VehiConnect Private Limited!
            </h2>
            <div>
              <h2 className="text-xl font-semibold mb-4">Who We Are</h2>
              <p className="text-pgcolor">
                At VehiConnect, we're not just in the business of car cleaning;
                we're in the business of delighting our customers and making
                them proud owners of impeccably clean vehicles. Based in the
                vibrant city of Jaipur, we are passionate about providing
                top-notch doorstep car cleaning services that elevate your
                driving experience.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Our Commitment to Excellence
              </h2>
              <p className=" text-pgcolor">
                Every member of our dedicated team shares a common goal: to
                ensure that your vehicle receives the care and attention it
                deserves. We take pride in our meticulous approach, leaving no
                spot untouched and no detail overlooked. When you choose
                VehiConnect, you can rest assured that your car will sparkle
                inside and out, reflecting the pride you take in ownership.
              </p>
              <p className=" text-pgcolor">
                With a focus on professionalism and customer satisfaction, we
                strive to build long-lasting relationships with our clients and
                become the go-to choice for doorstep car cleaning services in
                Jaipur.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                A Revolution in Car Cleaning
              </h2>
              <p className=" text-pgcolor">
                VehiConnect is more than just a car cleaning service; we're on a
                mission to redefine the entire car cleaning experience. Say
                goodbye to the hassle of traditional car washes and hello to
                convenience, quality, and exceptional results delivered right to
                your doorstep. We believe that your time is precious, and we're
                here to make car cleaning as effortless and enjoyable as
                possible.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Promise to You</h2>
              <p className=" text-pgcolor">
                When you choose VehiConnect, you're not just choosing a service;
                you're choosing a partner in maintaining the beauty and value of
                your vehicle. Our commitment to professionalism, reliability,
                and customer satisfaction is unwavering. We're not satisfied
                until you're delighted, and we'll go above and beyond to ensure
                that every cleaning exceeds your expectations.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Why Choose Us</h2>
              <p className="text-pgcolor">
                We stand out from the rest with our unwavering focus on
                professionalism and customer satisfaction. Our aim is not just
                to clean cars but to build lasting relationships with our
                clients. We want to be your trusted go-to choice for doorstep
                car cleaning services in Jaipur.
              </p>

              <strong>
                Join us in experiencing the Connect difference – where your
                satisfaction is our priority!
              </strong>
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
