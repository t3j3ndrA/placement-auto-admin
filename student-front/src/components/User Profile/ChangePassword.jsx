import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

import getStuId from "../../utils/getStuId";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await axios.put(
        `/api/student/updatePassword`,
        { password: password.password, stuId: getStuId() },
        {
          withCredentials: true,
        }
      );

      if (data?.success === true) {
        toast.success("Password updated succesfully");
      } else if (data?.success === false) {
        toast.error("Invalid data");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsUpdating(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    setValue,

    watch,
  } = useForm({});
  console.log(errors);
  return (
    <div className="min-h-screen text-black">
      {/* Navbar */}
      <Navbar focusOn="companies" />
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        <div className="bg-[#d8ecff] mx-auto px-4 py-4 lg:w-2/3">
          <h1 className={`text-3xl font-bold `}>{"Change Passwrod"}</h1>

          <div className="flex flx-row justify-end mt-2 ">
            <div className="flex flex-row gap-4"></div>
          </div>

          {/* Student details */}
          <form className="flex flex-row justify-between gap-2 flex-wrap mt-5">
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="">
                {password.password.length < 8
                  ? "Password should be 8 character long"
                  : "Valid Password"}
              </span>

              <input
                type={"password"}
                className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600  "
                value={password.password}
                name="password"
                onChange={(e) => {
                  setPassword({ ...password, password: e.target.value });
                }}
              />
            </div>
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="">
                {"Confirm Password "}{" "}
                <span
                  className={`${
                    password.password !== password.confirmPassword
                      ? "text-red-700"
                      : "text-green-500"
                  }`}
                >
                  {password.password !== password.confirmPassword
                    ? " Does not match"
                    : " Matched ✅"}
                </span>
              </span>
              <input
                type={"password"}
                className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600  "
                value={password.confirmPassword}
                name="confirmPassword"
                onChange={(e) => {
                  setPassword({ ...password, confirmPassword: e.target.value });
                }}
              />
            </div>
            <div className="w-full flex flex-row gap-4 mt-5 text-white">
              <button
                className="text-section mt-5 bg-blue-500 rounded-md px-4 py-2 disabled:bg-section"
                onClick={updatePassword}
                disabled={
                  isUpdating ||
                  password.confirmPassword != password.password ||
                  password.password.length < 8
                }
              >
                {/* <ClipLoader color="white" size={22} /> */}

                {!isUpdating ? (
                  "Update Password"
                ) : (
                  <ClipLoader color="blue" size={22} />
                )}
              </button>
              <Link to="/profile">
                <button className="text-section mt-5 bg-blue-500 rounded-md px-4 py-2 disabled:bg-section">
                  Go to profile
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
