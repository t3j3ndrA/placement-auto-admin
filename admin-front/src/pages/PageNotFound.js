import React from "react";
import Navbar from "../components/Navbar";

const PageNotFound = () => {
  return (
    <div className="bg-backg grid grid-cols-12 min-h-screen">
      <Navbar onFocus="companies" />
      <div className="col-start-3 col-end-13 px-10 py-10 text-white">
        <h1 className="text-4xl font-bold">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXISTS
        </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
