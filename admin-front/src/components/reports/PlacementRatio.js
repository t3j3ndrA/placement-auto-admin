import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart } from "recharts";
import FilterInputWithValue from "../FilterInputWithValue";
import RatioPieChart from "./RatioPieChart";

const PlacementRatio = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear() + 1,
    limit: 10,
  });

  const handleFilterChange = (e) => {
    if (e.target.value) {
      e.target.style.border = "2px dotted green";
    } else {
      e.target.style.border = "";
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    console.log(filterURL);

    return axios
      .get(`api/reports/placed-ratio?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data.data)
      .catch((err) => {
        console.log(err);
      });
  };

  const { data, isLoading, isError } = useQuery(
    ["placed-ratio", filter],
    fetchStudents,
    {
      keepPreviousData: true,
    }
  );

  console.log("ratio", data);

  const pieData = [
    { name: "Placed", value: 100 },
    { name: "Not Placed", value: 20 },
  ];

  return (
    <div className="bg-section mx-auto px-4 py-4 w-full">
      <div className=" bg-section p-3 rounded-md min-w-full">
        {/* Title */}
        <div className="flex justify-between  items-center bg-section p-3 rounded-md">
          <h1 className="text-3xl">Placement Ratio</h1>
        </div>
        {/* Filter */}
        <div className="flex flex-row justify-start gap-4 mb-4">
          {/* First Name */}
          <FilterInputWithValue
            name="year"
            value={filter.year}
            title="Year"
            onChangeFun={handleFilterChange}
          />
        </div>
        {isLoading ? (
          <></>
        ) : (
          <div className="w-full flex flex-row flex-wrap justify-around items-center">
            <RatioPieChart
              title={"All"}
              data={[data.totalPlaced, data.totalNotPlaced]}
            />
            <RatioPieChart
              title={"Male"}
              data={[data.malePlaced, data.maleNotPlaced]}
            />
            <RatioPieChart
              title={"Female"}
              data={[data.femalePlaced, data.femaleNotPlaced]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementRatio;
