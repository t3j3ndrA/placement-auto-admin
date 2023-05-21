import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import loginImage from "../assets/register4.jpg";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import loginValidator from "../form-validators/login.validator";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(loginValidator) });
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const email = getValues("email");
    const password = getValues("password");

    axios
      .post(
        "/api/auth/admin/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success === false) {
          toast.error(data.msg);
          return;
        }
        localStorage.setItem("year", new Date().getFullYear());
        localStorage.setItem("minYear", new Date().getFullYear() - 1);
        localStorage.setItem("maxYear", new Date().getFullYear() + 1);
        navigate("/admin/");
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-screen h-screen bg-backg text-white">
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-center mt-4">
              DDU PLACEMENT DASHBOARD
            </h1>
            <div className="flex  justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
              <a
                href=""
                className="p-4 text-xl font-bold text-white bg-section"
              >
                Admin Login
              </a>
            </div>
            <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
              <form
                className="flex flex-col pt-3 md:pt-8 text-black"
                onSubmit={handleSubmit(handleLogin)}
              >
                <div className="flex flex-col pt-4">
                  <div className="flex relative ">
                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <AiOutlineMail size={24} />
                    </span>
                    <input
                      {...register("email")}
                      name="email"
                      type="text"
                      id="design-login-email"
                      className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
                      placeholder="Email"
                    />
                  </div>
                </div>
                <Error msg={errors.email?.message || ""} />
                <div className="flex flex-col pt-4 ">
                  <div className="flex relative ">
                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <AiOutlineLock size={24} />
                    </span>
                    <input
                      {...register("password")}
                      name="password"
                      type="password"
                      id="design-login-password"
                      className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <Error msg={errors.password?.message || ""} />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 mt-10 text-base font-semibold text-center text-white transition duration-200 ease-in bg-section shadow-md hover:text-white hover:bg-hover focus:outline-none focus:ring-2"
                >
                  <span className="w-full ">
                    {isLoading ? <BeatLoader color="white" /> : "Submit"}
                  </span>
                </button>
              </form>
              <div className="pt-12 pb-12 text-center">
                <p>
                  Don&#x27;t have an account ?
                  <a href="#" className="font-semibold underline">
                    Register here.
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 shadow-2xl">
            <img
              className="hidden object-cover w-full h-screen md:block"
              src={loginImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
