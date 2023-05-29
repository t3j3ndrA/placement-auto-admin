import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { BeatLoader, HashLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import {
  AiOutlineClear,
  AiOutlineDelete,
  AiOutlineFilter,
} from "react-icons/ai";
import FilterInput from "../components/FilterInput";
import Info from "../components/Info";

const ManagePlaced = () => {
  // /company/:cid/role/:rid/applications
  const { cid, rid } = useParams();
  const navigate = useNavigate();
  
  const [students, setStudents] = useState("");
  const [studentsArr, setStudentsArr] = useState([]);
  const [invalidStudents, setInvalidStudents] = useState([]);
  const [isAddingLoading, setIsAddingLoading] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setStudents(val);
    setStudentsArr(
      val
        .replace(/\n/g, " ")
        .split(" ")
        .filter((item) => item.length > 0)
    );
  };

  const handleMarkPlaced = async()=> {
    setIsAddingLoading(true);
    try{

      const {data} = await axios
      .put(`/api/company/${cid}/role/${rid}/placed`,{emails : studentsArr},{
      withCredentials: true,
    });

    if(data.success){
      toast.success("Marked as placed");
      setInvalidStudents(data.invalidEmails);
    }
    else{
      toast.error("Could not mark as placed.");
    }
    

  }catch(err){
    console.log(err)
  }
  finally{
    setIsAddingLoading(false);
  }
  }

  const fetchPlaced = async () => {
    return axios
      .get(`/api/company/${cid}/role/${rid}/placed`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => data.data)
      .catch((err) => {
        console.log(err);
      });
  };


  const { data, isLoading, isError } = useQuery(
    ["placed", cid, rid],
    fetchPlaced,
    {
      keepPreviousData: true,
    }
  );

  if (isError) {
    toast.error("📶 Low internet connection ");
  }

  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="company" />
    
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {/* Companies */}
        <h1 className="text-3xl "> Placed for {data?.name}</h1>
        <h1 className="text-2xl -mt-7 capitalize">
          {data?.role.mode + " | " + data?.role.name}
        </h1>

        {/* Add placed */}
        <div>
        <h1 className="text-2xl">Mark Students Placed</h1>
          <Info
            msg={"Enter College email of students seperated by white space"}
          />
          <textarea
            className="mt-3 w-full outline-none px-4 py-1 rounded-md bg-subSection h-20"
            value={students}
            onChange={handleChange}
          />
          <table className=" leading-normal w-full mt-2">
            <thead>
              <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                <th className="">Email</th>
              </tr>
            </thead>
            {studentsArr.map((stuEmail) => {
              return (
                <tr className="w-full border-b-[1px] border-b-placeholder">
                  <td>{stuEmail}</td>
                </tr>
              );
            })}
          </table>
          <button
            className="mt-3 text-section  bg-white rounded-md px-4 py-2"
            type="button"
            onClick={handleMarkPlaced}
            disabled={isAddingLoading}
          >
            {isAddingLoading ? (
              <BeatLoader className="text-backg text-sm" />
            ) : (
              "Mark Placed"
            )}
          </button>
          {/* Invalid students */}
          {invalidStudents.length > 0 ? <div className="mt-4">
          <h1 className="text-red text-xl">Following emails are not associated with any students and could not marked as placed students</h1>
          <table className=" leading-normal w-full mt-2">
            <thead>
              <tr className="border-b bg-tableHead border-placeholder uppercase font-normal text-left  text-sm ">
                <th className="">Email</th>
              </tr>
            </thead>
            {invalidStudents.map((stuEmail) => {
              return (
                <tr className="w-full border-b-[1px] border-b-placeholder">
                  <td>{stuEmail}</td>
                </tr>
              );
            })}
          </table></div> : <></>
          }
          </div>

        <div className="w-full flex flex-row flex-wrap justify-between gap-2">
          {/* role.mode */}
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Interview Mode</span>
            <input
              name="mode"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={data?.role.interviewMode}
              disabled={true}
            />
          </div>
          {/* role.bonds */}
          <div className="flex  flex-col gap-1 w-full md:w-1/6">
            <span className="text-placeholder">Bonds (in months )</span>
            <input
              name="bonds"
              className="outline-none px-4 py-1 rounded-md bg-subSection"
              value={data?.role.bonds}
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
              value={data?.role.deadline?.substring(0, 10)}
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
              value={data?.role.interviewDate?.substring(0, 10)}
              disabled={true}
            />
          </div>
        </div>
        {/* View elli, Notify others BUTTON BOX */}
        <div className="flex flx-row justify-end mt-2 ">
          <div className="flex flex-row gap-4">
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
            <button className="text-section  bg-white rounded-md px-4 py-2 disabled:bg-section">
              <Link to={`/admin/company/${cid}/role/${rid}/notify`}>
                Notify Other
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
                  <th className="">Name</th>
                  <th>College ID</th>
                  <th>Email</th>
                  {/* <th className="hidden md:table-cell">Status</th> */}
                  <th className="hidden lg:table-cell">Gender</th>
                  {/* <th className=" hidden lg:table-cell">Passing Year</th> */}
                  {/* <th className="hidden lg:table-cell">Mode</th> */}
                </tr>
              </thead>
              <tbody>
                {/* All comapanies */}
                {data?.placed?.map((item) => {
                  return (
                    <tr
                      className="border-b-[1px] border-b-white bg-subSection hover:bg-lightHover hover:cursor-pointer even:bg-alternate"
                      onClick={() => {
                        navigate(`/admin/students/student-view/${item._id}`, {
                          state: item,
                        });
                      }}
                    >
                      <td>{item.firstName + " " + item.lastName}</td>
                      <td className="">{item.collegeID} </td>
                      <td className="">{item.collegeEmail}</td>
                      {/* <td className="capitalize hidden md:inline">
                        {item.placementStatus.selected}
                      </td> */}
                      <td className="hidden lg:table-cell capitalize">
                        {item.gender}
                      </td>
                      {/* <td className=" hidden lg:table-cell">
                        {item?.passingYear}
                      </td> */}
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

export default ManagePlaced;
