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
    <nav className="  shadow shadow-gray-300 w-100 px-8 md:px-auto dark:bg-gray-900">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* <!-- Logo --> */}
        <div className=" flex text-indigo-500">
          {/* <div>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
          </div> */}
          <div>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-indigo-500">
              Dharmsinh Desai University
            </span>
          </div>
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2 ">
          <ul className="flex font-semibold justify-between">
            {/* <!-- Active Link = text-indigo-500
                Inactive Link = hover:text-indigo-500 --> */}
            <Link to="/">
              <li className="md:px-4 md:py-2 text-indigo-500 hover:bg-blue-600 hover:text-white">
                <div className="flex">
                  {/* <div className='h-6 mr-3 sm:h-9'>{HomeIcon}</div> */}
                  <HomeIcon className="mx-1" />
                  <div className="mx-1">Home</div>
                </div>
              </li>
            </Link>
            <Link to="/AlreadyApplied">
              <li className="md:px-4 md:py-2 text-indigo-500 hover:bg-blue-600 hover:text-white">
                <div className="flex">
                  {/* <div className='h-6 mr-3 sm:h-9'>{HomeIcon}</div> */}
                  <DoneAllIcon className="mx-1" />
                  <div className="mx-1">Already Applied</div>
                </div>
              </li>
            </Link>
            <Link to="/Profile">
              <li className="md:px-4 md:py-2 text-indigo-500 hover:bg-blue-600 hover:text-white">
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

{
  /* <div classNameName='shadow-md w-full fixed top-0 left-0'>
          <div classNameName='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>vs
            <div classNameName='font-bold text-xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
              <img src=''></img>
            </div>
            {/* {/* <div classNameName='text-3xl absolute right-8 top-6 cursor-pointer '>
              <io-icon type="menu"></io-icon>
            </div>   ---->add ion icon<----- */
}
{
  /* //         <ul classNameName='md:flex md:items-center md: pb-0 pb-12 absolute md:static bg-white md: z-auto z -[-1] left-0 w-full md: w-auto md: pl-0 pl-9 transition-all duration-500 ease-in'>
    //           <li classNameName='md:ml-8 text-xl'><a href = "#">Home</a></li>
    //           <li classNameName='md:ml-8 text-xl'><a href = "#" classNameName='text-gray-800 hover: text-gray-400 duration-500'>Contact us</a></li>
    //           <li classNameName='md:ml-8 text-xl'><a href = "#" classNameName='text-gray-800 hover: text-gray-400 duration-500'>About</a></li>
    //           <li classNameName='md:ml-8 text-xl'><a href = "#" classNameName='text-gray-800 hover: text-gray-400 duration-500'>Profile</a></li>
    //         </ul>
    //       </div> */
}
{
  /* // </div> */
}
