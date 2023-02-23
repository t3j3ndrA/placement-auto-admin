import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import axios from "axios";
const Students = () => {
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();
  const fetchCompanies = async () => {
    let filterURL = "";
    // for (const query in filter) {
    //   filterURL += `${query}=${filter[query]}&`;
    // }

    // console.log(filterURL);
    return axios
      .get(`http://localhost:5000/api/student?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const { data, isLoading, isError } = useQuery(
    ["students", filter],
    fetchCompanies,
    {
      keepPreviousData: true,
    }
  );

  console.log("data", data);
  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="companies" />
      {/* Wrapper */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {/* Create Post */}
        <div className="flex justify-between  items-center">
          <h1 className="text-2xl">New Company Announcement</h1>
          <Link to="/companies/create-post">
            <button className="text-section font-semibold bg-white rounded-md text-lg px-4 py-2">
              Create Post
            </button>
          </Link>
        </div>

        {/* Companies */}

        <h1 className="text-2xl">Students</h1>

        {/*  Filters*/}
        <form className="flex flex-row gap-2 flex-wrap justify-center">
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
        </form>
        {isLoading || isError ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <>
            <table className=" leading-normal w-full mt-2">
              <thead>
                <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                  <th className="">Name</th>
                  <th>College ID</th>
                  <th>Email</th>
                  <th className="hidden md:table-cell">Status</th>
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
                        navigate(`/students/student-view/${item._id}`, {
                          state: item,
                        });
                      }}
                    >
                      <td>{item.firstName + " " + item.lastName}</td>
                      <td>{item.collegeID} </td>
                      <td className="">{item.collegeEmail}</td>
                      <td className="capitalize hidden md:inline">
                        {item.placementStatus.selected}
                      </td>
                      <td className="hidden lg:table-cell capitalize">
                        {item.gender}
                      </td>
                      <td className=" hidden lg:table-cell">
                        {item?.passingYear}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Students;
