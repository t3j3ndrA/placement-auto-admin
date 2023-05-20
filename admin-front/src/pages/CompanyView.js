import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
  AiOutlineDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import FormInputField from "../components/form/FormInputField";
import { handleAddCP, handleRemoveCP } from "../components/form/handleCP";
import { handleAddRole, handleRemoveRole } from "../components/form/handleRole";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import download from "downloadjs";

const CompanyView = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({});

  const updateCompany = async (company) => {
    setIsUpdating(true);
    try {
      const { data } = await axios.put(
        `/api/company/update?id=${id}`,
        { id, ...company },
        {
          withCredentials: true,
        }
      );
      setIsUpdating(false);
      setRefetchFlag(!refetchFlag);
      toast.success("Updated");
    } catch (err) {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/company?id=${id}`, { withCredentials: true })
      .then(({ data }) => {
        for (const [key, value] of Object.entries(data.data)) {
          setValue(key, value);
        }
      })
      .catch((err) => navigate("/admin/invalid-company"));
    setIsLoading(false);
  }, [refetchFlag]);

  const nameWatch = watch("name");
  const rolesWatch = watch("roles");
  const isActiveWatch = watch("isActive");
  const handleDuplicate = () => {};

  const handleCompanyDelete = async () => {
    axios.delete(`/api/company/${id}`, { withCredentials: true });
    navigate("/admin/companies");
  };

  const handleApplicationsDownload = async () => {
    toast.success("Download will begin shortly...");
    const { data, status } = await axios.get(
      `/api/company/${id}/applications`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );
    download(data, `${nameWatch}-Applications.xls`);
  };

  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="companies" />

      {/* Wrapper div */}

      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {isLoading ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <div className="bg-section mx-auto px-4 py-4 lg:w-2/3">
            <h1
              className={`text-3xl font-bold ${
                isActiveWatch ? "text-success" : "text-red"
              }`}
            >
              {nameWatch}
            </h1>
            <div className="mt-2">
              <input
                class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-hover after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-hover"
                type="checkbox"
                {...register("isActive")}
                role="switch"
                id="flexSwitchChecked"
                // checked={getValue("isActive")}
              />
              <label
                class={`inline-block pl-[0.15rem] hover:cursor-pointer ${
                  isActiveWatch ? "text-success" : "text-danger"
                }`}
                for="flexSwitchChecked"
              >
                {isActiveWatch ? "Activated" : "Inactive"}
              </label>
            </div>

            <div className="flex flx-row justify-end my-2 ">
              <div className="flex flex-row gap-4 ">
                <button
                  className="text-section flex flex-row flex-wrap gap-3  bg-white rounded-md px-4 py-2"
                  onClick={handleApplicationsDownload}
                >
                  <AiOutlineDownload size={20} />
                  <span>Applications</span>
                </button>
                <button
                  className="text-section self-start bg-white rounded-md px-4 py-2"
                  // className="text-section  bg-white rounded-md px-4 py-2 disabled:bg-section"
                  onClick={handleSubmit(updateCompany)}
                  disabled={isUpdating}
                >
                  {!isUpdating ? (
                    "Update"
                  ) : (
                    <ClipLoader color="blue" size={22} />
                  )}
                </button>
                <Link to={"/admin/companies/create-post"} state={getValues()}>
                  <button
                    disabled={isLoading || isUpdating}
                    className="text-section  bg-white rounded-md px-4 py-2"
                  >
                    Clone
                  </button>
                </Link>
                <div className="flex flex-col">
                  <button
                    disabled={isLoading || isUpdating}
                    className="text-section  bg-placeholder rounded-full px-2 py-2 self-end"
                    onClick={() => {
                      setShowDeleteModel(true);
                    }}
                  >
                    <AiOutlineDelete color="red" size={24} />
                  </button>
                  <div
                    className={`bg-white text-subSection px-4 py-2 rounded-lg ${
                      showDeleteModel ? "" : "hidden"
                    }`}
                  >
                    <p>Are You sure you want to delete ?</p>
                    <div className="flex flex-row gap-8 my-2">
                      <button
                        className="px-2 py-1 bg-danger text-white rounded-md"
                        onClick={handleCompanyDelete}
                      >
                        Yes
                      </button>
                      <button
                        className="px-2 py-1 bg-success text-white rounded-md"
                        onClick={() => {
                          setShowDeleteModel(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* company details */}
            <form className="flex flex-row justify-between gap-2 flex-wrap mt-5">
              <FormInputField
                name="name"
                title={"Name X"}
                errors={errors}
                register={register}
              />
              <FormInputField
                name="website"
                title={"Website"}
                errors={errors}
                register={register}
              />

              <FormInputField
                name="email"
                title={"Email"}
                errors={errors}
                register={register}
              />

              <FormInputField
                name="forBatch"
                title={"For Batch"}
                errors={errors}
                register={register}
              />

              {/* Description */}
              <div className="flex  flex-col gap-1 w-full">
                <span className="text-placeholder">Description</span>
                <span className="text-danger">{`${
                  errors["description"]?.message || ""
                }`}</span>

                <textarea
                  {...register("description", {
                    minLength: 1,
                    required: "Descriptioin is required",
                  })}
                  name="description"
                  className="outline-none px-4 py-1 rounded-md bg-subSection h-20"
                />
              </div>

              <h2 className="w-full font-semibold text-2xl">Roles</h2>

              {rolesWatch?.map((role, roleIndex) => {
                return (
                  <>
                    {/* Remove this role */}
                    <div className="flex flex-row w-full justify-between">
                      <button className="text-section  bg-white rounded-md px-4 py-2">
                        <Link
                          to={`/admin/company/${id}/role/${role._id}/applications`}
                        >
                          View Applications
                        </Link>
                      </button>
                      <button
                        className="flex flex-row  gap-2 justify-center bg-lightHover px-2 py-1 rounded-md"
                        onClick={(e) => handleRemoveRole(e, roleIndex)}
                      >
                        <span className=""> Delete Role</span>
                        <AiOutlineUsergroupDelete size={24} />
                      </button>
                    </div>
                    <div className="w-full flex flex-row flex-wrap justify-between gap-2">
                      {/* role.name */}
                      <FormInputField
                        name={`roles.${roleIndex}.name`}
                        title={"Role Name"}
                        errors={errors}
                        // errors={errors?.roles[roleIndex]?.name.message}
                        register={register}
                      />

                      <FormInputField
                        name={`roles.${roleIndex}.avgPackage`}
                        title={"Avg. Package (in LPA)"}
                        errors={errors}
                        register={register}
                        type={"number"}
                      />

                      {/* role.type */}

                      <div className="flex  flex-col gap-1 w-full md:w-2/5">
                        <span className="text-placeholder">Type</span>
                        <ErrorMessage
                          errors={errors}
                          name={`roles.${roleIndex}.type`}
                          render={({ message }) => (
                            <span className="text-danger">{message}</span>
                          )}
                        />
                        <select
                          {...register(`roles.${roleIndex}.type`, {
                            required: "Type is required",
                            minLength: 1,
                          })}
                          className="outline-none px-4 py-1 rounded-md bg-subSection"
                        >
                          <option value="full-time"> Full Time</option>
                          <option value="internship"> Internship</option>
                        </select>
                      </div>

                      {/* role.mode */}
                      <div className="flex  flex-col gap-1 w-full md:w-2/5">
                        <span className="text-placeholder">Mode</span>
                        <ErrorMessage
                          errors={errors}
                          name={`roles.${roleIndex}.mode`}
                          render={({ message }) => (
                            <span className="text-danger">{message}</span>
                          )}
                        />
                        <select
                          {...register(`roles.${roleIndex}.mode`, {
                            required: "Mode is required",
                            minLength: 1,
                          })}
                          className="outline-none px-4 py-1 rounded-md bg-subSection"
                        >
                          <option value="remote"> Remote</option>
                          <option value="on-site"> On Site</option>
                          <option value="hybrid"> Hybrid </option>
                        </select>
                      </div>
                      {/* role.bonds */}
                      <FormInputField
                        name={`roles.${roleIndex}.bonds`}
                        title={"Bonds (in months)"}
                        errors={errors}
                        register={register}
                        type={"number"}
                      />

                      {/* role.deadling */}
                      <FormInputField
                        name={`roles.${roleIndex}.deadline`}
                        title={" Deadline to apply"}
                        errors={errors}
                        register={register}
                        type="date"
                      />

                      {/* role.interviewDate */}
                      <FormInputField
                        name={`roles.${roleIndex}.interviewDate`}
                        title={"Interview Date"}
                        errors={errors}
                        register={register}
                        type="date"
                      />

                      {/* role.interviewMode */}
                      <div className="flex  flex-col gap-1 w-full md:w-2/5">
                        <span className="text-placeholder">Interview Mode</span>
                        <ErrorMessage
                          errors={errors}
                          name={`roles.${roleIndex}.interviewMode`}
                          render={({ message }) => (
                            <span className="text-danger">{message}</span>
                          )}
                        />
                        <select
                          name="interviewMode"
                          className="outline-none px-4 py-1 rounded-md bg-subSection"
                          {...register(`roles.${roleIndex}.interviewMode`, {
                            required: "Mode is required",
                            minLength: 1,
                          })}
                        >
                          <option value="online"> Online</option>
                          <option value="offline">Offline</option>
                        </select>
                      </div>
                      <h3 className="w-full mt-5 font-semibold text-lg">
                        Requirements
                      </h3>
                      {/* cpi */}
                      <FormInputField
                        name={`roles.${roleIndex}.requirements.cpi`}
                        title={"CPI"}
                        errors={errors}
                        register={register}
                        type="number"
                      />

                      {/* 12 Th Perc */}
                      <FormInputField
                        name={`roles.${roleIndex}.requirements.twelfthPerc`}
                        title={"12th Percentage"}
                        errors={errors}
                        register={register}
                        type="number"
                      />

                      {/* 10 Th Perc */}
                      <FormInputField
                        name={`roles.${roleIndex}.requirements.tenthPerc`}
                        title={"10th Percentage"}
                        errors={errors}
                        register={register}
                        type="number"
                      />
                      {/* dimploma Perc */}
                      <FormInputField
                        name={`roles.${roleIndex}.requirements.diplomaPerc`}
                        title={"Diploma Percentage"}
                        errors={errors}
                        register={register}
                        type="number"
                      />
                      {/* Competitive programming */}
                      <div className="flex flex-row w-full mt-5 justify-between">
                        <h3 className=" font-semibold text-lg ">
                          Competitive Coding
                        </h3>
                      </div>
                      {role?.requirements?.competitiveCoding?.map(
                        (cpItem, cpIndex) => {
                          return (
                            <>
                              {/* Platform */}

                              <FormInputField
                                name={`roles.${roleIndex}.requirements.competitiveCoding.${cpIndex}.platform`}
                                title={"Platform"}
                                errors={errors}
                                register={register}
                              />
                              {/* Stars */}
                              <FormInputField
                                name={`roles.${roleIndex}.requirements.competitiveCoding.${cpIndex}.stars`}
                                title={"Stars"}
                                errors={errors}
                                register={register}
                              />
                              {/* Ratings */}
                              <FormInputField
                                name={`roles.${roleIndex}.requirements.competitiveCoding.${cpIndex}.ratings`}
                                title={"Ratings"}
                                errors={errors}
                                register={register}
                              />
                              <div className="flex flex-col justify-end gap-1 w-full md:w-2/5">
                                <button
                                  className="flex flex-row  gap-2 justify-center bg-lightHover px-2 py-1 rounded-md"
                                  onClick={(e) =>
                                    handleRemoveCP(e, roleIndex, cpIndex)
                                  }
                                >
                                  <span className=""> Delete Platform</span>
                                  <AiOutlineUsergroupDelete size={24} />
                                </button>{" "}
                              </div>
                              <div className="w-full bg-lightHover h-[1px]"></div>
                            </>
                          );
                        }
                      )}
                      {/* Add new role */}
                      <button
                        className="flex flex-row gap-2 justify-center bg-lightHover px-2 py-1 rounded-md"
                        onClick={(e) => handleAddCP(e, roleIndex)}
                      >
                        <span className=""> Add Platform</span>
                        <AiOutlineUsergroupAdd size={24} />
                      </button>
                      {/* divider */}
                      <div className="h-[1px] w-full border-dashed border-b-[2px] border-placeholder opacity-60  my-2"></div>
                    </div>
                  </>
                );
              })}
              {/* Add new role */}
              <button
                className="flex flex-row gap-2 justify-center bg-lightHover px-2 py-1 rounded-md"
                onClick={(e) => handleAddRole(e)}
              >
                <span className="text-xl"> Add Role</span>
                <AiOutlineUsergroupAdd size={32} />
              </button>
              <h2 className="w-full font-semibold text-2xl">Address</h2>
              {/* address.city */}
              <FormInputField
                name={`address.city`}
                title={"City"}
                errors={errors}
                register={register}
              />
              {/* address.districts */}
              <FormInputField
                name={`address.district`}
                title={"District"}
                errors={errors}
                register={register}
              />

              {/* address.state */}
              <FormInputField
                name={`address.state`}
                title={"State"}
                errors={errors}
                register={register}
              />
              {/* address.postalcode */}
              <FormInputField
                name={`address.postalCode`}
                title={"Postalcode"}
                errors={errors}
                register={register}
                type="number"
              />
              {/* address.completeAddress */}
              <FormInputField
                name={`address.completeAddress`}
                title={"Complete Address"}
                errors={errors}
                register={register}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyView;
