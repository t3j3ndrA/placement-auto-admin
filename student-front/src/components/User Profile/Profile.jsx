import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

import { useForm } from "react-hook-form";
import FormInputField from "./FormInputField";
import { handleAddCP, handleRemoveCP } from "./handleCP";
import { handleAddRole, handleRemoveRole } from "./handleRole";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import getStuId from "../../utils/getStuId";
import Info from "../Info";

const Profile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,

    watch,
  } = useForm({});

  const updateStudent = async (student) => {
    setIsUpdating(true);
    const { data } = await axios.put(`/api/student/update`, student, {
      withCredentials: true,
    });

    setRefetchFlag(!refetchFlag);
    if (data?.success === false) {
      toast.error("Student does not exist");
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/student/?id=${getStuId()}`, { withCredentials: true })
      .then(({ data }) => {
        for (const [key, value] of Object.entries(data.data)) {
          console.log(`${key}: ${value}`);
          setValue(key, value);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [refetchFlag]);

  const nameWatch = watch("firstName");
  const rolesWatch = watch("roles");
  const isActiveWatch = watch("isActive");
  const cpWatch = watch("competitiveCoding");

  const handleDuplicate = () => {};

  console.log(getValues("isActive"));
  console.log("company", company);

  return (
    <div className="bg-[#0B0E2A] min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="companies" />
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {isLoading ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <div className="bg-[#1c1434] mx-auto px-4 py-4 lg:w-2/3">
            <h1
              className={`text-3xl font-bold ${
                isActiveWatch ? "text-success" : "text-red"
              }`}
            >
              {nameWatch}
            </h1>

            <div className="flex flx-row justify-end mt-2 ">
              <div className="flex flex-row gap-4">
                <button
                  className="text-section  bg-blue-500 rounded-md px-4 py-2 disabled:bg-section"
                  onClick={handleSubmit(updateStudent)}
                  disabled={isUpdating}
                >
                  {/* <ClipLoader color="white" size={22} /> */}

                  {!isUpdating ? (
                    "Update"
                  ) : (
                    <ClipLoader color="white" size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Student details */}
            <form className="flex flex-row justify-between gap-2 flex-wrap mt-5">
              <FormInputField
                name="firstName"
                title={"First Name"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="middleName"
                title={"Middle Name"}
                errors={errors}
                register={register}
                isRequired={true}
              />

              <FormInputField
                name="lastName"
                title={"Last Name"}
                errors={errors}
                register={register}
                isRequired={true}
              />

              {/* Gender Remaining */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-white">Gender *</span>
                <ErrorMessage
                  errors={errors}
                  name={`gender`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                />
                <select
                  {...register(`gender`, {
                    required: "Gender is required",
                    minLength: 1,
                  })}
                  className="outline-none px-4 py-1 rounded-md bg-gray-700"
                >
                  <option value="male"> Male</option>
                  <option value="female"> Female</option>
                </select>
              </div>

              <FormInputField
                type="date"
                name="dateOfBirth"
                title={"DOB"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <h2 className="mt-3 w-full font-semibold text-2xl">
                College Details
              </h2>
              <FormInputField
                name="collegeID"
                title={"COllege ID"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="collegeEmail"
                title={"College Email"}
                isRequired={true}
                errors={errors}
                register={register}
              />
              <FormInputField
                name="rollNumber"
                isRequired={true}
                title={"Roll No."}
                errors={errors}
                register={register}
              />

              <FormInputField
                name="passingYear"
                title={"Passing Year"}
                errors={errors}
                type="number"
                isRequired={true}
                register={register}
              />
              {/* CONTACT DETAIL */}
              <FormInputField
                name="personalPhoneNumber"
                title={"Personal Phone"}
                errors={errors}
                register={register}
                isRequired={true}
              />

              <FormInputField
                name="parentsPhoneNumber"
                title={"Parent's Phone"}
                errors={errors}
                register={register}
              />

              <FormInputField
                name="personalEmail"
                title={"Personal Email"}
                errors={errors}
                isRequired={true}
                register={register}
              />

              <h2 className="mt-3 w-full font-semibold text-2xl">Result</h2>
              <div className="w-full">
                <Info msg={"Put 0 if  not applicable."} />
              </div>
              <FormInputField
                name="result.sem1"
                type="number"
                title={"Sem1"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                type="number"
                name="result.sem2"
                title={"Sem2"}
                errors={errors}
                register={register}
                isRequired={true}
              />

              <FormInputField
                name="result.sem3"
                type="number"
                title={"Sem3"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.sem4"
                type="number"
                title={"Sem4"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.sem5"
                type="number"
                title={"Sem5"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.sem6"
                type="number"
                title={"Sem6"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.sem7"
                type="number"
                title={"Sem7"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.sem8"
                title={"Sem8"}
                type="number"
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.cpi"
                title={"CPI"}
                type="number"
                errors={errors}
                register={register}
                isRequired={true}
              />
              <FormInputField
                name="result.twelfthPerc"
                isRequired={true}
                title={"12th %"}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="result.tenthPerc"
                title={"10th %"}
                isRequired={true}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="result.diplomaPerc"
                title={"Diploma %"}
                isRequired={true}
                type="number"
                errors={errors}
                register={register}
              />

              {/* Competitive programming */}
              <h2 className="mt-3 w-full font-semibold text-2xl">
                Competitive Coding
              </h2>

              <div className="flex flex-row flex-wrap w-full justify-between">
                {cpWatch?.map((cpItem, cpIndex) => {
                  return (
                    <>
                      {/* Platform */}

                      <FormInputField
                        name={`competitiveCoding.${cpIndex}.platform`}
                        title={"Platform"}
                        errors={errors}
                        register={register}
                        isRequired={true}
                      />
                      {/* Profile */}

                      <FormInputField
                        name={`competitiveCoding.${cpIndex}.profile`}
                        title={"Profile"}
                        profile
                        errors={errors}
                        register={register}
                        isRequired={true}
                      />
                      {/* Stars */}
                      <FormInputField
                        name={`competitiveCoding.${cpIndex}.stars`}
                        title={"Stars"}
                        errors={errors}
                        register={register}
                      />
                      {/* Ratings */}
                      <FormInputField
                        name={`competitiveCoding.${cpIndex}.ratings`}
                        title={"Ratings"}
                        errors={errors}
                        register={register}
                      />
                      <div className="flex flex-col mt-3 justify-end gap-1 w-full md:w-2/5">
                        <button
                          className="flex flex-row  gap-2 justify-center bg-[#a62f2f] px-2 py-1 rounded-md"
                          onClick={(e) =>
                            handleRemoveCP(e, cpIndex, cpWatch, setValue)
                          }
                        >
                          <span className=""> Delete Platform</span>
                          <AiOutlineUsergroupDelete size={24} />
                        </button>{" "}
                      </div>
                      <div className="w-full bg-lightHover h-[1px]"></div>
                    </>
                  );
                })}
                <button
                  className="flex mt-3 flex-row gap-2 justify-center bg-[#3040D6] px-2 py-1 rounded-md"
                  onClick={(e) => handleAddCP(e, cpWatch, setValue)}
                >
                  <span className=""> Add Platform</span>
                  <AiOutlineUsergroupAdd size={24} />
                </button>
                {/* divider */}
                <div className="h-[1px] w-full border-dashed border-b-[2px] border-placeholder opacity-60  my-2"></div>
              </div>

              <h2 className="w-full font-semibold text-2xl mt-3">
                Placement Status
              </h2>

              {/* Placement Status */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-white">Selected ?</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`placementStatus.selected`)}
                  className="outline-none px-4 py-1 rounded-md bg-gray-700"
                >
                  <option value="yes"> Yes</option>
                  <option value="no"> No</option>
                </select>
              </div>
              {/* Company Name */}
              <FormInputField
                name="placementStatus.companyName"
                title={"Company"}
                errors={errors}
                register={register}
              />
              <FormInputField
                name="placementStatus.package"
                title={"Package (in LPA)"}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="placementStatus.duration"
                title={"Bond (in months)"}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="placementStatus.joiningDate"
                title={"Joining Date"}
                type="date"
                errors={errors}
                register={register}
              />

              {/* Mode of job */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-white">Mode</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`placementStatus.mode`)}
                  className="outline-none px-4 py-1 rounded-md bg-gray-700"
                >
                  <option value="remote"> Remote</option>
                  <option value="on-site"> On Site</option>
                  <option value="hybrid"> Hybrid</option>
                </select>
              </div>
              {/* Internship Status*/}
              <h2 className="w-full font-semibold text-2xl mt-3">
                Internship Status
              </h2>
              {/* Placement Status */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-white">Selected ?</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`internshipStatus.selected`)}
                  className="outline-none px-4 py-1 rounded-md bg-gray-700"
                >
                  <option value="yes"> Yes</option>
                  <option value="no"> No</option>
                </select>
              </div>
              {/* Company Name */}
              <FormInputField
                name="internshipStatus.companyName"
                title={"Company"}
                errors={errors}
                register={register}
              />
              <FormInputField
                name="internshipStatus.stipend"
                title={"Package (in LPA)"}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="internshipStatus.duration"
                title={"Bond (in months)"}
                type="number"
                errors={errors}
                register={register}
              />
              <FormInputField
                name="internshipStatus.joiningDate"
                title={"Joining Date"}
                type="date"
                errors={errors}
                register={register}
              />

              {/* Mode of job */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-white">Mode</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`internshipStatus.mode`)}
                  className="outline-none px-4 py-1 rounded-md bg-gray-700"
                >
                  <option value="remote"> Remote</option>
                  <option value="on-site"> On Site</option>
                  <option value="hybrid"> Hybrid</option>
                </select>
              </div>
              {/* ADDRESS */}
              <h2 className="mt-2 w-full font-semibold text-2xl">Address</h2>
              {/* address.city */}
              <FormInputField
                name={`address.city`}
                title={"City"}
                isRequired={true}
                errors={errors}
                register={register}
              />
              {/* address.districts */}
              <FormInputField
                name={`address.district`}
                title={"District"}
                errors={errors}
                isRequired={true}
                register={register}
              />

              {/* address.state */}
              <FormInputField
                name={`address.state`}
                title={"State"}
                errors={errors}
                register={register}
                isRequired={true}
              />
              {/* address.postalcode */}
              <FormInputField
                name={`address.postalCode`}
                title={"Postalcode"}
                errors={errors}
                register={register}
                type="number"
                isRequired={true}
              />
              {/* address.completeAddress */}
              <FormInputField
                name={`address.completeAddress`}
                title={"Complete Address"}
                errors={errors}
                register={register}
                isRequired={true}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
