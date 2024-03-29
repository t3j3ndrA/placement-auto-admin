import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import FilterInputWithValue from "../FilterInputWithValue";

const YearlyNotPlaced = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear() + 1,
    limit: 10,
  });

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    if (e.target.value) {
      e.target.style.border = "2px dotted green";
    } else {
      e.target.style.border = "";
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
    if (e.target.name === "year") {
      localStorage.setItem("year", e.target.value);
    }
  };

  const fetchStudents = async () => {
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    return axios
      .get(`/api/reports/yearly-not-placed?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data)
      .catch((err) => {});
  };

  const { data, isLoading, isError } = useQuery(
    ["not-placed", filter],
    fetchStudents,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="bg-section mx-auto px-4 py-4 w-full">
      {/* Title */}
      <div className="flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-3xl">Not Placed Students</h1>
      </div>
      {/* Filter */}

      <div className="flex flex-row justify-start gap-4 mb-4">
        {/* First Name */}
        <FilterInputWithValue
          name="year"
          value={filter.year}
          title="Year"
          type="number"
          onChangeFun={handleFilterChange}
        />
        <FilterInputWithValue
          name="limit"
          value={filter.limit}
          title="Display Limit"
          type="number"
          onChangeFun={handleFilterChange}
        />
      </div>

      <table className=" leading-normal w-full mt-2">
        <thead>
          <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
            <th className="">Roll no.</th>
            <th className="">Name</th>
            <th>College ID</th>
            <th>Email</th>
            <th className="hidden md:table-cell">Package (in LPA)</th>
            <th className="hidden lg:table-cell">Gender</th>
            <th className=" hidden lg:table-cell">Passing Year</th>
            {/* <th className="hidden lg:table-cell">Mode</th> */}
          </tr>
        </thead>
        <tbody>
          {/* All comapanies */}
          {data?.data?.map((item) => {
            return (
              <tr
                className="border-b-[1px] border-b-white bg-subSection hover:bg-lightHover hover:cursor-pointer even:bg-alternate"
                onClick={() => {
                  navigate(`/admin/students/student-view/${item._id}`, {
                    state: item,
                  });
                }}
              >
                <td className="uppercase">{item.rollNumber}</td>
                <td>{item.firstName + " " + item.lastName}</td>
                <td className="uppercase">{item.collegeID} </td>
                <td className="">{item.collegeEmail}</td>
                <td className="capitalize hidden md:inline">
                  {item.placementStatus.package}
                </td>
                <td className="hidden lg:table-cell capitalize">
                  {item.gender}
                </td>
                <td className=" hidden lg:table-cell">{item?.passingYear}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YearlyNotPlaced;
