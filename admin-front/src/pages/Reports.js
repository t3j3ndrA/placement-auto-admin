import React, { PureComponent, useState } from "react";
import Navbar from "../components/Navbar";
import { HashLoader } from "react-spinners";

import PlacementRatio from "../components/reports/PlacementRatio";
import Top10Placements from "../components/reports/Top10Placements";
import YearlyPlaced from "../components/reports/YearlyPlaced";
import YearlyNotPlaced from "../components/reports/YearlyNotPlaced";

// Year wise placement reposts
// company wise + year wise placement
// year wise registered and pending students
// top 10 placements this year
// download placement report of perticular year

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="reports" />
      {/* Wrapper */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {/* Title */}
        <div className="flex justify-between  items-center bg-section p-3 rounded-md">
          <h1 className="text-2xl">Placement Reports</h1>
        </div>

        <PlacementRatio />
        <Top10Placements />
        <YearlyPlaced />
        <YearlyNotPlaced />
      </div>
    </div>
  );
};

export default Reports;
