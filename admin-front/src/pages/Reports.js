import React, { PureComponent, useState } from "react";
import Navbar from "../components/Navbar";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import PlacementRatio from "../components/reports/PlacementRatio";
import Top10Placements from "../components/reports/Top10Placements";
import YearlyPlaced from "../components/reports/YearlyPlaced";
import YearlyNotPlaced from "../components/reports/YearlyNotPlaced";
import DownloadReport from "../components/reports/DownloadReport";
import PlacementComparision from "../components/reports/PlacementComparision";

const Reports = () => {
  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="reports" />
      {/* Wrapper */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {/* Title */}
        <div className=" bg-section p-3 rounded-md">
          <h1 className="text-3xl">Placement Reports</h1>
          <DownloadReport />
        </div>
        <PlacementComparision />
        <PlacementRatio />
        <Top10Placements />
        <YearlyPlaced />
        <YearlyNotPlaced />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClic={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="dark"
      />
    </div>
  );
};

export default Reports;
