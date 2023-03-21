import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import FormInputField from "../components/form/FormInputField";
import { handleAddCP, handleRemoveCP } from "../components/form/handleCP";
import { handleAddRole, handleRemoveRole } from "../components/form/handleRole";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

const CompanyView = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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
    const { data } = await axios.put(
      `/api/company/update?id=${id}`,
      { id, ...company },
      {
        withCredentials: true,
      }
    );
    if (data?.success === false) {
      toast.error("😿 Company does not exists");
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/company?id=${id}`, { withCredentials: true })
      .then(({ data }) => {
        for (const [key, value] of Object.entries(data.data)) {
          console.log(`${key}: ${value}`);
          setValue(key, value);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);
  const nameWatch = watch("name");
  const rolesWatch = watch("roles");
  const handleDuplicate = () => {};

  console.log("company", company);
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
            <h1 className="text-3xl font-bold">{nameWatch}</h1>

            <div className="flex flx-row justify-end mt-2 ">
              <div className="flex flex-row gap-4">
                <Link to={"/companies/create-post"} state={getValues()}>
                  <button
                    disabled={isLoading || isUpdating}
                    className="text-section  bg-white rounded-md px-4 py-2"
                  >
                    Duplicate
                  </button>
                </Link>
                <button
                  className="text-section  bg-white rounded-md px-4 py-2 disabled:bg-section"
                  onClick={handleSubmit(updateCompany)}
                  disabled={isUpdating}
                >
                  {!isUpdating ? (
                    "Update"
                  ) : (
                    <ClipLoader color="white" size={22} />
                  )}
                </button>
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
                          to={`/company/${id}/role/${role._id}/applications`}
                        >
                          Applications
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
                name={`address.postalcode`}
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
