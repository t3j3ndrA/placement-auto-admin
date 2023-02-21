import React from "react";
import Navbar from "../components/Navbar";

const Reports = () => {
  return (
    <div className="bg-backg min-h-screen">
      <Navbar focusOn="reports" />
      <div className="col-start-3 col-end-13 px-10 py-10 text-white">
        <h1 className="text-4xl font-bold">Reports Page</h1>
      </div>
    </div>
  );
};

export default Reports;
