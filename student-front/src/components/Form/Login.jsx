import React from "react";
import loadImg from "./register2.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [AllEntry, setAllEntry] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const addEntry = () => {
    const newEntry = { email: Email, password: Password };
    setAllEntry({ ...AllEntry, newEntry });
  };

  const postEntry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const post = {
        email: Email,
        password: Password,
      };

      const { data } = await axios.post(`/api/auth/student/login`, post, {
        withCredentials: true,
      });
      if (data.success === true) {
        localStorage.setItem("stuId", data.data.studentId);
        if (data.data.isVerified) {
          navigate("/");
        } else {
          navigate("/changepassword");
        }
      } else {
        toast.error("Invalid credentials");
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
            DDU Plaement Portal
          </h1>
          <form
            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
            action={addEntry}
            method="post"
          >
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Login
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="rounded-lg mt-2 py-2 px-4 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="false"
              ></input>
            </div>

            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="rounded-lg mt-2 py-2 px-4 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="false"
              ></input>
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              {/* <p className="flex items-center">
              <input className="mr-2" type="checkbox"></input>Remember me
            </p> */}
              <p className="underline">Forget password?</p>
            </div>
            {/* <Link to={"/Homepage"}> */}
            <button
              className="rounded-lg w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-300/30 hover: shadow-teal-500/40 text-white font-semibold"
              onClick={postEntry}
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color="white" /> : "Sign In"}
            </button>
            {/* </Link> */}
            {/* <Link to={"/Register"}>
            <button className="rounded-lg w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-300/30 hover: shadow-teal-500/40 text-white font-semibold">
              New User? Register here
            </button>
          </Link> */}
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
