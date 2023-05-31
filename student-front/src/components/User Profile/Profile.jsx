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
import { ToastContainer, toast } from "react-toastify";
import getStuId from "../../utils/getStuId";
import Info from "../Info";

const Profile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingProfilePic, setIsUploadingProfilePic] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,

    setValue,
    watch,
  } = useForm({});

  const updateStudent = async (student) => {
    setIsUpdating(true);

    try {
      const { data } = await axios.put(`/api/student/update`, student, {
        withCredentials: true,
      });
      setRefetchFlag(!refetchFlag);
      if (data?.success === true) {
        toast.success("Updated successfully");
      } else if (data?.success === false) {
        toast.error("Student does not exist");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfilePicUpload = async (profilePic) => {
    let formData = new FormData();
    formData.append("id", JSON.stringify(getStuId()));
    formData.append("profilePic", profilePic);
    setIsUploadingProfilePic(true);

    try {
      const { data } = await axios.post(`/api/student/profile-pic`, formData, {
        withCredentials: true,
      });
      console.log("resp >> ", data);

      if (data?.success === true) {
        toast.success("Updated successfully");
        setValue("profilePic", data.url);
      } else if (data?.success === false) {
        toast.error("Could not upload picture");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsUploadingProfilePic(false);
    }
  };
  const handleResumeUpload = async (resume) => {
    let formData = new FormData();
    formData.append("id", JSON.stringify(getStuId()));
    formData.append("resume", resume);
    setIsUploadingResume(true);

    try {
      const { data } = await axios.post(`/api/student/resume`, formData, {
        withCredentials: true,
      });
      console.log("resp >> ", data);

      if (data?.success === true) {
        toast.success("Uploaded Resume");
        setValue("resume", data.url);
      } else if (data?.success === false) {
        toast.error("Could not upload resume");
      }
    } catch (err) {
      console.log("err >> ", err);
      toast.error("📶 Low internet connection ");
    } finally {
      setIsUploadingResume(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/student/?id=${getStuId()}`, { withCredentials: true })
      .then(({ data }) => {
        for (const [key, value] of Object.entries(data.data)) {
          setValue(key, value);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [refetchFlag]);

  const nameWatch = watch("firstName");
  const profilePic = watch("profilePic");
  const rolesWatch = watch("roles");
  const isActiveWatch = watch("isActive");
  const cpWatch = watch("competitiveCoding");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const resume = watch("resume");

  return (
    <div className="bg-white min-h-screen text-black ">
      {/* Navbar */}
      <Navbar focusOn="companies" />
      {/* Wrapper div */}
      <div className=" px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {isLoading ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <div className="bg-[#d8ecff] rounded-md mx-auto px-4 py-4 lg:w-2/3">
            <div className="flex flex-row flex-wrap gap-4 items-center">
              <img
                src={profilePic}
                className="w-36 h-36  object-cover rounded-full"
              />

              <div className="flex flex-col gap-2">
                <h1
                  className={`text-3xl font-bold ${
                    isActiveWatch ? "text-success" : "text-red"
                  }`}
                >
                  {nameWatch}
                </h1>
                <div className="bg-blue-500 text-white w-32 h-8 rounded-xl">
                  <p className="text-center">
                    {isUploadingProfilePic ? (
                      <ClipLoader size={20} />
                    ) : (
                      "Change avatar"
                    )}
                  </p>
                  <input
                    type="file"
                    disabled={isUploadingProfilePic}
                    className="z-10 opacity-0 relative -top-4 left-0  w-full h-full"
                    onChange={(e) => {
                      console.log(e.target.files);
                      if (e.target.files) {
                        handleProfilePicUpload(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* update buttons */}
            <div className="flex flx-row justify-end mt-2 gap-2 ">
              <button
                className="text-section mt-5 text-white bg-blue-500 rounded-md px-4 py-2 disabled:bg-section"
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
              <Link to="/changepassword">
                <button className="text-section mt-5 text-white bg-blue-500 rounded-md px-4 py-2 disabled:bg-section">
                  Change Password
                </button>
              </Link>
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
                <span className="">Gender *</span>
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
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-[1px] border-gray-600"
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

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                College Details
              </h2>
              <FormInputField
                name="collegeID"
                title={"College ID"}
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

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500 ">
                Result
              </h2>
              <div className="w-full">
                <Info msg={"Put 0 if  not applicable."} />
              </div>
              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                College
              </h2>

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

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                Academic Gap
              </h2>

              <FormInputField
                name="result.academicGap"
                title={"Academic Gap"}
                type="number"
                errors={errors}
                register={register}
                isRequired={true}
              />

              <FormInputField
                name="result.academicGapReason"
                title={"Reason for academic gap"}
                errors={errors}
                register={register}
                isRequired={true}
              />

              <h2 className="mt-3 w-full font-semibold  text-3xl text-blue-500">
                Backlogs
              </h2>

              <FormInputField
                name="result.activeBacklogs"
                title={"Active Backlogs"}
                type="number"
                errors={errors}
                register={register}
                isRequired={true}
              />

              <FormInputField
                name="result.totalBacklogs"
                title={"Total backlogs"}
                errors={errors}
                register={register}
                isRequired={true}
                type="number"
              />

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                HSC
              </h2>

              <FormInputField
                name="result.twelfthPerc"
                isRequired={true}
                title={"12th %"}
                type="number"
                errors={errors}
                register={register}
              />

              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="">12th Board Type</span>
                <ErrorMessage
                  errors={errors}
                  name={`result.twelfthBoardType`}
                  render={({ message }) => (
                    <span className="text-red-700">{message}</span>
                  )}
                />
                <select
                  {...register(`result.twelfthBoardType`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                >
                  <option value="gseb"> GSEB</option>
                  <option value="cbse"> CBSE</option>
                  <option value="other"> Other</option>
                </select>
              </div>

              <FormInputField
                name="result.twelfthBoardPassingYear"
                isRequired={true}
                title={"12th Passing year"}
                errors={errors}
                register={register}
                type="number"
              />

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                SSC
              </h2>
              <FormInputField
                name="result.tenthPerc"
                title={"10th %"}
                isRequired={true}
                type="number"
                errors={errors}
                register={register}
              />

              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="">10th Board Type</span>
                <ErrorMessage
                  errors={errors}
                  name={`result.tenthBoardType`}
                  render={({ message }) => (
                    <span className="text-red-700">{message}</span>
                  )}
                />
                <select
                  {...register(`result.tenthBoardType`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-[1px] border-gray-600"
                >
                  <option value="gseb"> GSEB</option>
                  <option value="cbse"> CBSE</option>
                  <option value="other"> Other</option>
                </select>
              </div>
              <FormInputField
                name="result.tenthBoardPassingYear"
                title={"10th Passing Year"}
                isRequired={true}
                type="number"
                errors={errors}
                register={register}
              />
              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                Diploma
              </h2>

              <FormInputField
                name="result.diplomaPerc"
                title={"Diploma %"}
                isRequired={true}
                type="number"
                errors={errors}
                register={register}
              />

              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="">Diploma Board Type</span>
                <ErrorMessage
                  errors={errors}
                  name={`result.diplomaBoardType`}
                  render={({ message }) => (
                    <span className="text-red-700">{message}</span>
                  )}
                />
                <select
                  {...register(`result.diplomaBoardType`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                >
                  <option value="gseb"> GSEB</option>
                  <option value="cbse"> CBSE</option>
                  <option value="other"> Other</option>
                </select>
              </div>
              <FormInputField
                name="result.diplomaBoardPassingYear"
                title={"Diploma Passing Year"}
                isRequired={true}
                errors={errors}
                register={register}
                type="number"
              />

              {/* Technical Skills */}
              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                Technical Skills
              </h2>
              <div className="w-full">
                <Info msg={"AWS cloud, AI, etc. ( Comma seperated )"} />
              </div>
              <div className="flex  flex-col gap-1 w-full">
                <ErrorMessage
                  errors={errors}
                  name={`technicalSkills`}
                  render={({ message }) => (
                    <span className="text-red-700">{message}</span>
                  )}
                />
                <textarea
                  {...register(`technicalSkills`)}
                  className=" outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                />
              </div>

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                Hobbies
              </h2>
              <div className="w-full">
                <Info
                  msg={"Dancing, Cinemetography, etc. ( Comma seperated )"}
                />
              </div>
              <div className="flex  flex-col gap-1 w-full">
                <ErrorMessage
                  errors={errors}
                  name={`hobbies`}
                  render={({ message }) => (
                    <span className="text-red-700">{message}</span>
                  )}
                />
                <textarea
                  {...register(`hobbies`)}
                  className=" outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                />
              </div>

              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
                Resume
              </h2>
              <div className="flex flex-row gap-2 mt-3 flex-wrap items-center">
                <div className="border-blue-500 border-[1px] text-blue-500 w-44 h-10 px-4 py-2 rounded-md">
                  <p className="text-center">
                    {isUploadingResume ? (
                      <ClipLoader size={20} />
                    ) : (
                      "Upload Resume"
                    )}
                  </p>
                  <input
                    type="file"
                    disabled={isUploadingProfilePic}
                    className="z-10 opacity-0 relative -top-4 left-0  w-full h-full"
                    onChange={(e) => {
                      console.log(e.target.files);
                      if (e.target.files) {
                        handleResumeUpload(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                {resume ? (
                  <div>
                    <Link to={resume}>
                      <button
                        type="button"
                        className="text-section border-blue-500 border-[1px] text-blue-500 rounded-md px-4 py-2 disabled:bg-section"
                      >
                        Download Resume
                      </button>
                    </Link>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>

              {/* Competitive programming */}
              <h2 className="mt-3 w-full font-semibold text-3xl text-blue-500">
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
                          className="flex flex-row  gap-2 justify-center text-red-700 border-[1px] border-red-500 px-2 py-1 rounded-md"
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
                  className="flex mt-3 flex-row gap-2 justify-center bg-[#3040D6] text-white px-2 py-1 rounded-md"
                  onClick={(e) => handleAddCP(e, cpWatch, setValue)}
                >
                  <span className=""> Add Platform</span>
                  <AiOutlineUsergroupAdd size={24} />
                </button>
                {/* divider */}
                <div className="h-[1px] w-full border-dashed border-b-[2px] border-placeholder opacity-60  my-2"></div>
              </div>

              <h2 className="w-full font-semibold text-3xl text-blue-500 mt-3">
                Placement Status
              </h2>

              {/* Placement Status */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="">Selected ?</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`placementStatus.selected`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
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
              {/* Role in which placed */}
              <FormInputField
                name="placementStatus.role"
                title={"Role"}
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
                <span className="">Mode</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`placementStatus.mode`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                >
                  <option value="remote"> Remote</option>
                  <option value="on-site"> On Site</option>
                  <option value="hybrid"> Hybrid</option>
                </select>
              </div>
              {/* Internship Status*/}
              <h2 className="w-full font-semibold text-2xl mt-3 text-3xl text-blue-500">
                Internship Status
              </h2>
              {/* Placement Status */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="">Selected ?</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`internshipStatus.selected`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
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
              {/* role name in which interned*/}
              <FormInputField
                name="internshipStatus.role"
                title={"Role"}
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
                <span className="">Mode</span>
                {/* <ErrorMessage
                  errors={errors}
                  name={`roles.${roleIndex}.type`}
                  render={({ message }) => (
                    <span className="text-danger">{message}</span>
                  )}
                /> */}
                <select
                  {...register(`internshipStatus.mode`)}
                  className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600"
                >
                  <option value="remote"> Remote</option>
                  <option value="on-site"> On Site</option>
                  <option value="hybrid"> Hybrid</option>
                </select>
              </div>
              {/* ADDRESS */}
              <h2 className="mt-2 w-full font-semibold text-3xl text-blue-500">
                Address
              </h2>
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
