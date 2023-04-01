import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { HashLoader, ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  AiOutlineClear,
  AiOutlineDelete,
  AiOutlineFilter,
} from "react-icons/ai";
import FilterInput from "../components/FilterInput";
import { toast, ToastContainer } from "react-toastify";

const NotifyStudents = () => {
  const { cid, rid } = useParams();

  const [filter, setFilter] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const [isNotifying, setIsNotifying] = useState(false);

  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [checkKey, setCheckKey] = useState(Math.random());

  const fetchBasicCRInfo = async () => {
    return axios
      .get(`/api/company/${cid}/role/${rid}/basic`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data.data)
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStudents = async () => {
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    return axios
      .get(`/api/student?${filterURL}`, {
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
    for (let i = 0; i < allInputs.length; ++i) {
      allInputs.item(i).style.border = "";
    }

    for (let i = 0; i < allSelects.length; ++i) {
      allSelects.item(i).style.border = "";
    }

    document.getElementById("filter-form").reset();
  };

  const handleNotify = async (e) => {
    e.preventDefault();

    try {
      const body = {
        companyId: cid,
        roleId: rid,
        selectedStudents: Array.from(selectedStudents),
      };
      const { data } = await axios.put("/api/company/notify", body);
      if (data?.success === true) {
        toast.success("Notified ✅");
      } else if (data?.success === false) {
        toast.error("Invalid data");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsNotifying(false);
    }
  };

  const { data, isLoading, isError } = useQuery(
    ["students", filter],
    fetchStudents,
    {
      keepPreviousData: true,
    }
  );

  const {
    data: cData,
    isLoading: cIsLoading,
    isError: cIsError,
  } = useQuery(["comapany", cid], fetchBasicCRInfo, {
    keepPreviousData: true,
  });

  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="comapnies" />
      {/* Wrapper */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {/* Companies */}
        <h1 className="text-3xl "> Notify for {cData?.name}</h1>
        <h1 className="text-2xl -mt-7 capitalize">
          {cData?.role.mode + " " + cData?.role.name}
        </h1>
        {/* role.interviewMode */}
        <div className="w-full flex flex-row flex-wrap justify-between gap-2">
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Interview Mode</span>
            <input
              name="mode"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={cData?.role.interviewMode}
              disabled={true}
            />
          </div>
          {/* role.bonds */}
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Bonds (in months )</span>
            <input
              name="bonds"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={cData?.role.bonds}
              type="number"
              disabled={true}
            />
          </div>
          {/* role.deadling */}
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Deadline to apply</span>
            <input
              name="deadline"
              type="date"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={cData?.role.deadline?.substring(0, 10)}
              disabled={true}
            />
          </div>
          {/* role.interviewDate */}
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Interview Date</span>
            <input
              name="interviewDate"
              type="date"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={cData?.role.interviewDate?.substring(0, 10)}
              disabled={true}
            />
          </div>
        </div>
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
            {/* First Name */}
            <FilterInput
              name="firstName"
              title="First Name"
              onChangeFun={handleFilterChange}
            />

            {/* Middle Name */}
            <FilterInput
              name="middleName"
              title="Middle Name"
              onChangeFun={handleFilterChange}
            />

            {/* Last Name */}
            <FilterInput
              name="lastName"
              title="Last Name"
              onChangeFun={handleFilterChange}
            />
            {/* Gender */}
            <div className="flex  flex-col gap-1 w-full md:w-1/6">
              <span className="text-placeholder">Gender</span>
              <select
                name="gender"
                className="outline-none px-4 py-1 rounded-md bg-alternate"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* College Email */}
            <FilterInput
              name="collegeEmail"
              title="College Email"
              onChangeFun={handleFilterChange}
            />

            {/* College ID */}
            <FilterInput
              name="collegeID"
              title="College ID"
              onChangeFun={handleFilterChange}
            />

            {/* Roll No. */}
            <FilterInput
              name="rollNumber"
              title="Roll No."
              onChangeFun={handleFilterChange}
            />

            {/* Personal Email */}
            <FilterInput
              name="personalEmail"
              title="Personal Email"
              onChangeFun={handleFilterChange}
            />

            {/* Phone Number */}
            <FilterInput
              name="personalPhoneNumber"
              title="Personal Phone"
              onChangeFun={handleFilterChange}
            />

            {/* Min CPI */}
            <FilterInput
              name="minCPI"
              title="Min. CPI"
              onChangeFun={handleFilterChange}
            />

            {/* Max CPI */}

            <FilterInput
              name="maxCPI"
              title="Max. CPI"
              onChangeFun={handleFilterChange}
            />
            {/* Min 12th Perc */}

            <FilterInput
              name="minTwelfthPerc"
              title="Min. 12th %"
              onChangeFun={handleFilterChange}
            />

            {/* Max 12th Perc */}
            <FilterInput
              name="maxTwelfthPerc"
              title="Max. 12th %"
              onChangeFun={handleFilterChange}
            />

            {/* Min 10th Perc */}
            <FilterInput
              name="minTenthPerc"
              title="Min. 10th %"
              onChangeFun={handleFilterChange}
            />

            {/* Max 10th % */}
            <FilterInput
              name="maxTenthPerc"
              title="Min. 10th %"
              onChangeFun={handleFilterChange}
            />

            {/* Min Diploma % */}
            <FilterInput
              name="minDiplomaPerc"
              title="Min. Diploma %"
              onChangeFun={handleFilterChange}
            />

            {/* Max Diploma % */}
            <FilterInput
              name="maxDiplomaPerc"
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
        {/* View elli, Notify others BUTTON BOX */}
        <div className="flex flx-row justify-end mt-2 ">
          <div className="flex flex-row gap-4">
            <button
              className="text-section  bg-white rounded-md px-4 py-2"
              onClick={handleNotify}
            >
              {isNotifying ? <ClipLoader size={20} /> : "Notify Selected"}
            </button>
            <button className="text-section  bg-white rounded-md px-4 py-2">
              <Link to={`/admin/company/${cid}/role/${rid}/applications`}>
                View Applications
              </Link>
            </button>
            <button className="text-section  bg-white rounded-md px-4 py-2">
              <Link to={`/admin/company/${cid}/role/${rid}/elligibles`}>
                View Elligibles
              </Link>
            </button>
          </div>
        </div>
        {isLoading || isError ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <>
            <table className=" leading-normal w-full mt-2">
              <thead>
                <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                  <th className="">
                    <input
                      type={"checkbox"}
                      key={checkKey + 1}
                      checked={data?.data.length === selectedStudents.size}
                      className="ml-2 w-5 h-5"
                      onClick={(e) => {
                        // to prevent from calling parent's onClick functin on table row
                        // Otherwise it will open user's page instead of opening it
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();

                        let s = new Set();
                        if (selectedStudents.size == data.data.length) {
                          setSelectedStudents(s);
                        } else {
                          data?.data?.forEach((item) => {
                            s.add(item._id);
                          });
                          setSelectedStudents(s);
                        }
                        setCheckKey(Math.random());
                      }}
                    />
                  </th>
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
                      key={item._id}
                      className="border-b-[1px] border-b-white bg-subSection hover:bg-lightHover hover:cursor-pointer even:bg-alternate "
                      onClick={() => {
                        navigate(`/admin/students/student-view/${item._id}`, {
                          state: item,
                        });
                      }}
                    >
                      <td className="ml-1">
                        <input
                          type={"checkbox"}
                          key={checkKey}
                          checked={selectedStudents.has(item._id)}
                          className="ml-2 w-5 h-5"
                          onClick={(e) => {
                            // to prevent from calling parent's onClick functin on table row
                            // Otherwise it will open user's page instead of opening it
                            if (!e) var e = window.event;
                            e.cancelBubble = true;
                            if (e.stopPropagation) e.stopPropagation();
                            let s = selectedStudents;
                            if (s.has(item._id)) {
                              s.delete(item._id);
                            } else {
                              s.add(item._id);
                            }
                            setCheckKey(Math.random());
                            setSelectedStudents(s);
                          }}
                        />
                      </td>
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

export default NotifyStudents;

//   {/* View elli, Notify others BUTTON BOX */}
//   <div className="flex flx-row justify-end mt-2 ">
//   <div className="flex flex-row gap-4">
//     <button className="text-section  bg-white rounded-md px-4 py-2">
//       <Link to={`/company/${cid}/role/${rid}/applications`}>
//         View Applications
//       </Link>
//     </button>
//     <button className="text-section  bg-white rounded-md px-4 py-2">
//       <Link to={`/company/${cid}/role/${rid}/eliigibles`}>
//         View Elligibles
//       </Link>
//     </button>
//   </div>
// </div>
