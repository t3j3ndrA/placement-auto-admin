import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import axios from "axios";
const Companies = () => {
  const [filter, setFilter] = useState({});

  const fetchCompanies = async () => {
    let filterURL = "";
    // for (const query in filter) {
    //   filterURL += `${query}=${filter[query]}&`;
    // }

    // console.log(filterURL);
    return axios
      .get(`http://localhost:5000/api/company?${filterURL}`, {
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
    ["companies", filter],
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

        <h1 className="text-2xl">Companies</h1>

        {/*  Filters*/}
        <form className="flex flex-row gap-2 flex-wrap justify-center">
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
          <input className="outline-none px-4 py-1 rounded-md bg-subSection" />
        </form>
        {isLoading ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          // {/* All comapanies */}
          data?.data?.map((item) => {
            return (
              <div className="bg-section rounded-md px-2 py-2">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex flex-row justify-between">
                  <a href={item.website}>{item.website}</a>
                  <p>{item.email}</p>
                </div>
                {/* Roles */}
                <table className=" leading-normal w-full mt-2">
                  <thead>
                    <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                      <th className="">Role</th>
                      <th>Avg. Package</th>
                      <th>Type</th>
                      <th className="hidden md:table-cell">Deadline</th>
                      <th className=" hidden lg:table-cell">Interview Date</th>
                      <th className="hidden lg:table-cell">Mode</th>
                    </tr>
                  </thead>
                  {item?.roles.map((role) => {
                    let deadline = new Date(role.deadline);
                    let interviewDate = new Date(role.interviewDate);
                    return (
                      <tr className="border-b-[1px] border-b-white">
                        <td>{role.name}</td>
                        <td>{role.avgPackage} LPA</td>
                        <td className="capitalize">{role.type}</td>
                        <td className="hidden md:inline">
                          {deadline.getDate() +
                            "-" +
                            deadline.getMonth() +
                            "-" +
                            deadline.getFullYear()}
                        </td>
                        <td className=" hidden lg:table-cell">
                          {interviewDate.getDate() +
                            "-" +
                            interviewDate.getMonth() +
                            "-" +
                            interviewDate.getFullYear()}
                        </td>
                        <td className=" hidden lg:table-cell capitalize">
                          {role.mode}
                        </td>
                      </tr>
                    );
                  })}
                </table>
                <Link
                  to={`/companies/company-view/${item._id}`}
                  state={{ comany: item }}
                >
                  <button className="text-section bg-white rounded-sm  px-4 my-3">
                    View More
                  </button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Companies;
