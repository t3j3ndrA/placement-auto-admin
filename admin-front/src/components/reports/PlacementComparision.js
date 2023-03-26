import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import ComparisionBarChart from "./ComparisionBarChart";
import { ClipLoader } from "react-spinners";
import FilterInputWithValue from "../FilterInputWithValue";

const PlacementComparision = () => {
  const [filter, setFilter] = useState({
    minYear: localStorage.getItem("minYear"),
    maxYear: localStorage.getItem("maxYear"),
  });

  const handleFilterChange = (e) => {
    if (e.target.value) {
      e.target.style.border = "2px dotted green";
    } else {
      e.target.style.border = "";
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
    if (e.target.name === "minYear" || e.target.name === "maxYear") {
      localStorage.setItem(e.target.name, e.target.value);
    }
  };

  const fetchComparision = async () => {
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    console.log(filterURL);

    return axios
      .get(`/api/reports/comparision?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data, isLoading, isError } = useQuery(
    ["comp", filter],
    fetchComparision,
    {
      keepPreviousData: true,
      staleTime: 1 * 60 * 60 * 1000,
    }
  );

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
        <FilterInputWithValue
          name="minYear"
          type="number"
          value={filter.minYear}
          title="Min. Year"
          onChangeFun={handleFilterChange}
        />
        <FilterInputWithValue
          name="maxYear"
          type="number"
          value={filter.maxYear}
          title="Max. Year"
          onChangeFun={handleFilterChange}
        />
      </div>
      {isLoading ? (
        <ClipLoader color="white" size={40} />
      ) : (
        <ComparisionBarChart data={data?.data} />
      )}
    </div>
  );
};

export default PlacementComparision;
