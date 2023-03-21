import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";
import FilterInput from "../components/FilterInput";

const Companies = () => {
  const [filter, setFilter] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const fetchCompanies = async () => {
    let filterURL = "";

    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    return axios
      .get(`/api/company?${filterURL}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (e) => {
    if (e.target.value) {
      e.target.style.border = "2px dotted green";
    } else {
      e.target.style.border = "";
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFilterReset = () => {
    setFilter("");
    const allInputs = document.body.getElementsByTagName("input");
    const allSelects = document.body.getElementsByTagName("select");
    console.log(allSelects);
    for (let i = 0; i < allInputs.length; ++i) {
      allInputs.item(i).style.border = "";
    }

    for (let i = 0; i < allSelects.length; ++i) {
      allSelects.item(i).style.border = "";
    }

    document.getElementById("filter-form").reset();
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
        <div className="flex justify-between  items-center bg-tableHead p-3 rounded-md">
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
        <div className="bg-subSection px-2 py-3 rounded-lg">
          <div className="flex flex-row justify-between items-center  ">
            <h2 className="text-xl">Filters</h2>
            <div className="flex flex-row gap-4 items-center">
              <input
                type="reset"
                className={`bg-hover py-2 px-3 rounded-xl hover:cursor-pointer `}
                value={"Clear"}
                onClick={handleFilterReset}
              />
              <span
                className="bg-hover rounded-full p-2 hover:cursor-pointer"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              >
                <AiOutlineFilter size={24} />
              </span>
            </div>
          </div>
          <form
            id="filter-form"
            className={`mt-0 flex flex-row justify-around gap-1 flex-wrap bg-subSection  ${
              showFilter ? "" : "hidden"
            }`}
          >
            {/* Company Name */}
            <FilterInput
              name="name"
              title="Name"
              onChangeFun={handleFilterChange}
            />

            {/* Website */}
            <FilterInput
              name="website"
              title="Website"
              onChangeFun={handleFilterChange}
            />

            {/* Email */}
            <FilterInput
              name="email"
              title="Email"
              onChangeFun={handleFilterChange}
            />

            {/* Role Name */}
            <FilterInput
              name="roleName"
              title="Role Name"
              onChangeFun={handleFilterChange}
            />

            {/* Average Package */}
            <FilterInput
              name="avgPackage"
              title="Avg. Package"
              onChangeFun={handleFilterChange}
            />

            {/* Types */}

            <div className="flex  flex-col gap-1 w-full md:w-1/6">
              <span className="text-placeholder">Type</span>
              <select
                name="type"
                className="outline-none px-4 py-1 rounded-md bg-alternate"
                onChange={(e) => {
                  handleFilterChange(e);
                }}
              >
                <option value=""> </option>
                <option value="full-time"> Full Time</option>
                <option value="internship"> Internship</option>
              </select>
            </div>
            {/* Mode */}
            <div className="flex  flex-col gap-1 w-full md:w-1/6">
              <span className="text-placeholder">Mode</span>
              <select
                name="mode"
                className="outline-none px-4 py-1 rounded-md bg-alternate"
                onChange={(e) => {
                  handleFilterChange(e);
                }}
              >
                <option value=""> </option>
                <option value="remote"> Remote</option>
                <option value="on-site"> On Site</option>
                <option value="hybrid"> Hybrid </option>
              </select>
            </div>

            {/* Bonds */}
            <FilterInput
              name="bonds"
              title="Bonds (in months)"
              onChangeFun={handleFilterChange}
            />

            {/* Interview Mode */}
            <div className="flex  flex-col gap-1 w-full md:w-1/6">
              <span className="text-placeholder">Mode</span>
              <select
                name="interviewMode"
                className="outline-none px-4 py-1 rounded-md bg-alternate"
                onChange={(e) => {
                  handleFilterChange(e);
                }}
              >
                <option value=""> </option>
                <option value="online"> Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            {/* Min CPI */}
            <FilterInput
              name="cpi"
              title="Min. CPI"
              onChangeFun={handleFilterChange}
            />

            {/* Min 12th Perc */}
            <FilterInput
              name="twelfthPerc"
              title="Min. 12th %"
              onChangeFun={handleFilterChange}
            />

            {/* Min 10th Perc */}
            <FilterInput
              name="tenthPerc"
              title="Min. 10th %"
              onChangeFun={handleFilterChange}
            />

            {/* Min Diploma % */}
            <FilterInput
              name="diplomaPerc"
              title="Min. Diploma %"
              onChangeFun={handleFilterChange}
            />

            {/* City % */}
            <FilterInput
              name="city"
              title="City"
              onChangeFun={handleFilterChange}
            />

            {/* State % */}
            <FilterInput
              name="state"
              title="State"
              onChangeFun={handleFilterChange}
            />
          </form>
        </div>

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
