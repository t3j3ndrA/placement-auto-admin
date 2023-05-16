import React, { useState } from "react";
import { AiFillInfoCircle, AiOutlineInfo } from "react-icons/ai";
import Info from "../components/Info";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

const RegisterStudent = () => {
  const [students, setStudents] = useState("");
  const [studentsArr, setStudentsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/student/new", {
        collegeEmails: studentsArr,
      });
      if (data?.success === true) {
        toast.success("Students Registered ✅");
      } else if (data?.success === false) {
        toast.error("Invalid data");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="students" />
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        <div className="bg-section mx-auto px-4 py-4 lg:w-2/3">
          <h1 className="text-2xl">Register Students</h1>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <BeatLoader className="text-backg text-sm" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
