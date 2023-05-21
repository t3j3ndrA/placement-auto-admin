import React from "react";
import { Link, Router, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import removeStuId from "../../utils/removeStuId";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    removeStuId();
    const { data } = await axios.post("/api/auth/logout");
    navigate("/Login");
  };

  return (
    <nav className="  shadow sticky w-100 px-8 md:px-auto  text-blue-600">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className=" flex ">
          <div>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
              Dharmsinh Desai University
            </span>
          </div>
        </div>
        <div className=" order-3 w-full md:w-auto md:order-2 ">
          <ul className="flex font-semibold justify-between">
            <Link to="/">
              <li className="md:px-4 md:py-2   hover:text-blue-600">
                <div className="flex">
                  {/* <div className='h-6 mr-3 sm:h-9'>{HomeIcon}</div> */}
                  <HomeIcon className="mx-1" />
                  <p className="mx-1">Home</p>
                </div>
              </li>
            </Link>
            <Link to="/AlreadyApplied">
              <li className="md:px-4 md:py-2   hover:text-blue-600">
                <div className="flex">
                  {/* <div className='h-6 mr-3 sm:h-9'>{HomeIcon}</div> */}
                  <DoneAllIcon className="mx-1" />
                  <div className="mx-1">Already Applied</div>
                </div>
              </li>
            </Link>
            <Link to="/Profile">
              <li className="md:px-4 md:py-2   hover:text-blue-600">
                <div className="flex">
                  {/* <div className='h-6 mr-3 sm:h-9'>{HomeIcon}</div> */}
                  <AccountCircleIcon className="mx-1" />
                  <div className="mx-1">Profile</div>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <button
            type="button"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
            onClick={handleLogOut}
          >
            {/* <!-- Heroicons - Login Solid --> */}
            <LogoutIcon className="mx-1" />
            <span className="mx-1">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
