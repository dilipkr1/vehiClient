import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { AuthContext } from "../../context/AuthContext";
import heroImg from "../../images/vehiclean.png";
import BackgroundContainer from "../Homeshop/Homeshop";
import hzLogo from "../../images/hz_vehiclean.png";
export default function Navbar() {
  const [nav, setNav] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, dispatch } =
    useContext(AuthContext);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white  fixed w-full z-10 top-0  z-1 flex  justify-between items-center h-25  py-3 px-3.5 lg:pt-7  border-gray border-b-0 ">
      <div className="flex justify-end w-1/3 ">
        <Link to="/">
          <img
            style={{ width: "70px", height: "70px" }}
            className="w-16 h-16"
            src={heroImg}
            alt="vehiclean_iamges"
          />
        </Link>
      </div>

      <ul className="customNavResponsive   font-normal   tracking-wider flex lg:w-2/3 lg:justify-center font-roboto text-main-500 leading-10 items-center gap-6 lg:gap-10 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        {/* <li>
          <Link to="/news">News</Link>
        </li> */}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/About">About Us</Link>
        </li>
      </ul>

      <div className="navRight flex lg:justify-center justify-end lg:mr-10  items-center w-full gap-3">
        {!isAuthenticated ? (
          <div className="authDesk">
            <span className="mr-2   tracking-wide faSize font-roboto text-main-700">
              <Link to="/login">Login</Link>
            </span>
            <span className="mx-2">
              <Link to="/login">
                <button type="button" class="signup-Btn">
                  Sign Up
                </button>
              </Link>
            </span>
          </div>
        ) : (
          <>
            <Link to="/profile">
              <span className="text-xl sbn">
                <i className="fa-solid fa-user text-white text-2xl mr-1 px-1 faSize tracking-wider"></i>
                profile
              </span>
            </Link>
            <button
              className="text-sm hideonsmSize  font-roboto text-main-700 tracking-wide"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </>
        )}
        <div className=" ">
          <i
            onClick={handleNav}
            className="lg:hidden fa-solid fa-bars-staggered   faSize bg-white p-2  rounded-full"
          ></i>

          <div className="  ">
            {nav && (
              <div className="absolute top-0 right-0">
                <ul
                  style={{
                    paddingTop: "100px",
                    height: "100vh",
                    width: "60vw",
                  }}
                  className="gap-3  px-8 text-xl customNavResponsive2 flex flex-col   bg-black text-white "
                >
                  <span
                    className="mt-2 py-3 px-4 absolute top-0 text-white hover:bg-white hover:text-black font-bold text-4xl right-5"
                    onClick={() => setNav(null)}
                  >
                    X
                  </span>
                  {!isAuthenticated && (
                    <div className="flex gap-4 sign">
                      <li onClick={() => setNav(null)}>
                        <Link to="/login">
                          <button className="border p-1 pb-2 px-3 rounded">
                            Login
                          </button>
                        </Link>
                      </li>
                      <li onClick={() => setNav(null)}>
                        <Link to="/login">
                          <button className="signup-Btn ">SignUp</button>
                        </Link>
                      </li>
                    </div>
                  )}
                  <Link className="py-1" to="/">
                    <li onClick={() => setNav(null)}>
                      Home
                    </li>
                  </Link>
                  <Link className="py-1" to="/shop">
                    <li onClick={() => setNav(null)}>
                      Shop
                    </li>
                  </Link>
                  <Link className="py-1" to="/contact">
                    <li onClick={() => setNav(null)}>
                      Contact
                    </li></Link>
                  <Link className="py-1" to="/about">
                    <li onClick={() => setNav(null)}>
                      About Us
                    </li>
                  </Link>
                  {isAuthenticated && (
                    <button
                      className="relative tex-xl underline mt-3 font-roboto text-white tracking-widest"
                      onClick={handleLogout}
                    >
                      LogOut
                    </button>
                  )}
                  <div
                    style={{ margin: "100p auto", alignItems: "center" }}
                    className=""
                  >
                    <Link to="/">
                      <img src={hzLogo} alt="" />
                    </Link>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
