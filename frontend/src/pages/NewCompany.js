import React from "react";
import Navbar from "../components/Navbar";
import loginValidator from "../form-validators/login.validator";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newcompanyValidator from "../form-validators/newcompany.validator";

const NewCompany = () => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newcompanyValidator),
  });
  return (
    <div className="bg-backg grid grid-cols-12 min-h-screen">
      <Navbar />
      {/* Company Filter section */}
      <div className="col-start-3 col-end-13 px-10 py-10  text-white ">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
};

export default NewCompany;
