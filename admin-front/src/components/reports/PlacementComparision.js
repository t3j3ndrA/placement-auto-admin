import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import FilterInput from "../FilterInput";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import PackageLineChart from "./PackageLineChart";
import ComparisionBarChart from "./ComparisionBarChart";

const PlacementComparision = () => {
  const [filter, setFilter] = useState({
    minYear: new Date().getFullYear() + 1,
    maxYear: new Date().getFullYear() + 1,
  });

  const navigate = useNavigate();

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
      .get(`api/reports/placed?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  };

  // const { data, isLoading, isError } = useQuery(
  //   ["top-placed", filter],
  //   fetchStudents,
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  // console.log(data);
  return (
    <div className="bg-section mx-auto px-4 py-4 w-full">
      {/* Title */}
      <div className="flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-3xl">Year Wise Comparisions</h1>
      </div>
      {/* Filter */}

      <div className="flex flex-row justify-start gap-4 mb-4">
        {/* First Name */}
        <FilterInput
          name="year"
          value={filter.minYear}
          title="Min. Year"
          onChangeFun={handleFilterChange}
        />
        <FilterInput
          name="limit"
          value={filter.maxYear}
          title="Max. Year"
          onChangeFun={handleFilterChange}
        />
      </div>
      {/* {isLoading ? <></> : <ComparisionBarChart />} */}
      <ComparisionBarChart />
    </div>
  );
};

export default PlacementComparision;
