import React from "react";
import loadImg from "../../assets/register4.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const post = {
        email,
      };

      const { data } = await axios.post(`/api/student/forgot-password`, post, {
        withCredentials: true,
      });
      if (data.success === true) {
        toast.success("Password has been sent to your email.");
      } else {
        toast.error("No user found with this email!");
      }
    } catch (e) {
      console.log("error: ", e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="bg-gray-800 flex flex-col justify-center">
          <h1 className="text-white text-3xl text-center font-bold mb-10">
            DDU Plaement portal for students
          </h1>
          <form
            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
            method="post"
          >
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Forgot password
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="rounded-lg mt-2 py-2 px-4 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="false"
              ></input>
            </div>

            <Link to={"/login"}>
              <div className="flex justify-between text-gray-400 py-2">
                <p className="underline"> Login here</p>
              </div>
            </Link>
            {/* <Link to={"/Homepage"}> */}
            <button
              className="rounded-lg w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-300/30 hover: shadow-teal-500/40 text-white font-semibold"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color="white" /> : "Search account"}
            </button>
          </form>
        </div>

        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src={loadImg}
            alt=""
          ></img>
        </div>
      </div>
    </>
  );
};
