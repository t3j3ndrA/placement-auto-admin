import React from "react";
import pageNotFoundImg from "../../assets/404error.png";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const PageNotFound = () => {
  return (
    <div
      className=" h-screen overflow-hidden text-white"
      style={{ backgroundColor: "#0B0E2A" }}
    >
      <Navbar />
      {/* Wrapper */}
      <div className="flex flex-col items-center md:px-8 lg:px-12 object-contain">
        <h1 className="text-center text-3xl mt-3">
          Page you are requesting does not exist 😿
        </h1>
        <Link to="/">
          <h1 className=" text-center text-3xl mt-5 mb-5 bg-blue-500 px-4 py-2 rounded-xl">
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
