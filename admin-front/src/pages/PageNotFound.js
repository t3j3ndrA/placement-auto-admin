import React from "react";
import Navbar from "../components/Navbar";
import pageNotFoundImg from "../assets/404error.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-backg h-screen overflow-hidden text-white">
      {/* Navbar */}
      <Navbar focusOn="" />
      {/* Wrapper */}
      <div className="flex flex-col items-center md:px-8 lg:px-12 object-contain">
        <h1 className="text-center text-3xl mt-3">
          Page you are requesting does not exists 😿
        </h1>
        <Link to="/admin/">
          <h1 className=" text-center text-3xl mt-5 mb-5 bg-subSection px-4 py-2 rounded-xl">
            Go to Home Page
          </h1>
        </Link>
        <img
          src={pageNotFoundImg}
          style={{ objectFit: "cover" }}
          height="200"
          width="500"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
