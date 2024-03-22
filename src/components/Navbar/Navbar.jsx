import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { AuthContext } from "../../context/AuthContext";
import heroImg from "../../images/vehiclean.png";

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
    navigate("/");
  };

  return (
    <div className="fixed w-full z-10 top-0  bg-white z-1 flex  justify-between items-center h-25  py-3 px-3.5 lg:pt-7  border-gray border-b-0 ">
      <div className="p-2 flex justify-end w-1/3 ">
        <Link to="/">
          <img className="w-16 h-16" src={heroImg} alt="vehiclean_iamges" />
        </Link>
      </div>

      <ul className="customNavResponsive flex lg:w-2/3 lg:justify-center font-roboto text-main-500 leading-10 items-center gap-6 lg:gap-10 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="navRight flex lg:justify-center justify-end lg:mr-10  items-center w-full gap-3">
        <Link to="/profile">
          <i className="fa-solid fa-user text-2xl mr-1 px-1 faSize"></i>
        </Link>
        {!isAuthenticated ? (
          <span className="faSize font-roboto text-main-700">
            <Link to="/login">Login</Link>
          </span>
        ) : (
          <button
            className="faSize font-roboto text-main-700 tracking-wide"
            onClick={handleLogout}
          >
            LogOut
          </button>
        )}
        <div className=" ">
          <i
            onClick={handleNav}
            className="lg:hidden fa-solid fa-bars faSize"
          ></i>
          <div className="  ">
            {nav && (
              <ul className=" gap-3 text-xl customNavResponsive2 flex flex-col p-10 absolute top-0 right-0 rounded-l   bg-color4 text-white ">
                <span
                  className="p-3 absolute top-0 text-white font-bold text-2xl left-0"
                  onClick={() => setNav(null)}
                >
                  X
                </span>
                <li onClick={() => setNav(null)} className="   ">
                  <Link to="/">Home</Link>
                </li>
                <li onClick={() => setNav(null)}>
                  <Link to="/shop">Shop</Link>
                </li>
                <li onClick={() => setNav(null)}>
                  <Link to="/news">News</Link>
                </li>
                <li onClick={() => setNav(null)}>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
