import React from "react";
import axios from "axios";
import loadImg from "./1.jpeg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [Email, setEmail] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [Password, setPassword] = useState("");
  const [AllEntry, setAllEntry] = useState({});

  const navigate = useNavigate();

  let url = "http://127.0.0.1:5000/api";
  const addEntry = () => {
    const newEntry = {
      email: Email,
      password: Password,
      firstName: Firstname,
      lastName: Lastname,
    };
    setAllEntry({ ...AllEntry, newEntry });
  };

  const postEntry = async (e) => {
    e.preventDefault();
    try {
      const post = {
        firstname: Firstname,
        lastname: Lastname,
        email: Email,
        password: Password,
        confirmpassword: Confirmpassword,
      };

      const res = await axios.post(`/api/Register`, post, {
        withCredentials: true,
      });

      console.log(res.status);
      if (res.status === 201) {
        navigate("/Login");
      } else if (res.status === 500) {
      }
    } catch (e) {
      window.alert("registration unsuccessful");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loadImg} alt=""></img>
      </div>

      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
          action={addEntry}
          method="post"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Register
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="text">First Name</label>
            <input
              type="text"
              className="rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              value={Firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              autoComplete="false"
              name="firstname"
            ></input>
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="text">Last Name</label>
            <input
              type="text"
              className="rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              value={Lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              autoComplete="false"
              name="lastname"
            ></input>
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="false"
              name="email"
            ></input>
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="false"
              name="password"
            ></input>
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              value={Confirmpassword}
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
              autoComplete="false"
              name="confirmpassword"
            ></input>
          </div>

          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox"></input>Remember me
            </p>
            <p>Forget password?</p>
          </div>

          <button
            className="rounded-lg w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-300/30 hover: shadow-teal-500/40 text-white font-semibold"
            id="sign_up"
            onClick={postEntry}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
