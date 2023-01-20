import React from "react";
import { useCookies } from "react-cookie";
import {
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineTrophy,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const Navbar = () => {
  // w-2/12 is equivalent to col-start-1, col-end-3
  // h-screen is equivalent to row-start-1 row-end-3 with fixed position
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(cookies);
  return (
    <div className=" bg-section h-screen fixed w-2/12 text-white px-3 py-8 rounded-xl">
      {/* Top section */}
      <div className="flex gap-8 items-center">
        <img
          src="https://wilcity.com/wp-content/uploads/2018/12/sample-logo-design-png-3-2.png"
          className="rounded-full w-10 h-10 bg-cover"
        />

        <span className="font-semibold text-2xl">DDU</span>
      </div>

      {/* Nav items */}

      <div className="flex flex-col gap-5 justify-center mt-12">
        {/* icon box - students */}
        <div className="flex gap-8 items-center bg-hover rounded-md px-2 py-1 ">
          <AiOutlineUser className="text-2xl" />
          <span className="font-light text-xl">Students</span>
        </div>
        <div className="flex gap-8 items-center  rounded-md px-2 py-1 hover:bg-hover">
          <AiOutlineShop className="text-2xl" />
          <span className="font-light text-xl">Companies</span>
        </div>
        <div className="flex gap-8 items-center  rounded-md px-2 py-1 hover:bg-hover">
          <AiOutlineTrophy className="text-2xl" />
          <span className="font-light text-xl">Highlights</span>
        </div>
        <div className="flex gap-8 items-center  rounded-md px-2 py-1 hover:bg-hover">
          <AiOutlineUserSwitch className="text-2xl" />
          <span className="font-light text-xl">Admins</span>
        </div>
        {cookies.user ? <p>Welcome {cookies.user}</p> : <></>}
      </div>
    </div>
  );
};

export default Navbar;
