import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
// import YearPicker from "react-year-picker";

const Students = () => {
  const [filter, setFilter] = useState({
    passingYear: new Date().getFullYear().toString(),
  });

  const fetchStudents = async () => {
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    console.log(filterURL);
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

  const { data, status, error } = useQuery(
    ["students", filter],
    fetchStudents,
    { keepPreviousData: true }
  );
  console.log(status);
  if (status === "loading") {
    return <p>Loading ....</p>;
    console.log("data >> ", data);
  }
  if (status === "error") {
    console.log("error >> ", error);
    return <p>Error</p>;
  }

  if (status === "success") {
    console.log(data);
  }

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleApplyFilter = (e) => {
    fetchStudents();
    e.preventDefault();
    console.log("filter >> ", filter);
  };

  return (
    <div className="bg-backg grid grid-cols-12 min-h-screen">
      <Navbar />

      <div className="col-start-3 col-end-13 px-10 py-10 text-white">
        <h1 className="text-4xl font-bold">Student</h1>

        {/* Filter section */}
        <div className="bg-section mt-10 rounded-lg px-4 py-5">
          <form>
            {/* form header */}
            <div className="flex justify-between">
              <h1 className="text-2xl">Filters</h1>
              <button
                className="bg-subSection hover:bg-lightHover  py-2 px-4 rounded-md"
                onClick={handleApplyFilter}
              >
                Apply
              </button>
            </div>
            {/* form filtering fields */}
            <div className=" flex gap-10 justify-evenly mt-4">
              {/* General Fields */}
              <div className="flex flex-col">
                <p>Placement Status</p>
                <select
                  name="placementStatus"
                  onChange={handleFilterChange}
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection "
                >
                  <option value="">All</option>
                  <option value="done">Done</option>
                  <option value="pending">Pending</option>
                  <option value="not-done">Remaining</option>
                </select>

                <p>Branch</p>
                <select
                  name="branch"
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection "
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="it">IT</option>
                  <option value="ce">CE</option>
                  <option value="ec">EC</option>
                  <option value="ch">CH</option>
                  <option value="me">ME</option>
                </select>
                <p>Passing Year</p>
                <input
                  name="passingYear"
                  type="number"
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  defaultValue={new Date().getFullYear().toString()}
                  onChange={handleFilterChange}
                />
                <p>Gender</p>
                <select
                  name="gender"
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection "
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {/* Unique student sections */}
              <div className="flex flex-col">
                <p>Email</p>
                <input
                  name="email"
                  className="col-start-1 col-end-3 outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
                <p>College Id</p>
                <input
                  name="studentId"
                  className="col-start-1 col-end-3 outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
                <p>Roll Number</p>
                <input
                  name="rollNumber"
                  className="col-start-1 col-end-3 outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
              </div>
              {/* Name sections */}
              <div className="flex flex-col">
                <p>First Name</p>
                <input
                  name="firstName"
                  className="col-start-1 col-end-3 outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
                <p>Middle Name</p>
                <input
                  name="middleName"
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
                <p>Last Name</p>
                <input
                  name="lastName"
                  className="outline-none px-4 py-1 w-45 rounded-md bg-subSection"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Students table view based on fileter applied  */}
        <div className="bg-section mt-10">
          <table className=" leading-normal w-full mt-2">
            {/* table head */}
            <thead>
              <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                <th scope="col" class="px-5 py-3">
                  <input type="checkbox" name="" id="" />
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Sr No
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Name
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Id
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Email
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Branch
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Status
                </th>
                <th scope="col" class="px-5 py-3  ">
                  Gender
                </th>
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {data?.data.map((stu, index) => {
                return (
                  <tr className="border-b bg-subSection border-placeholder uppercase font-normal text-left  text-sm hover:bg-lightHover">
                    <th scope="col" class="px-5 py-3">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {index + 1}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.firstName +
                        " " +
                        stu.middleName +
                        " " +
                        stu.lastName}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.studentId}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.email}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.branch}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.status}
                    </th>
                    <th scope="col" class="px-5 py-3  ">
                      {stu.gender}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
