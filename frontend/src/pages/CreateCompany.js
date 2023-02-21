import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import companyViewValidator from "../form-validators/companyView.validator";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

const CreateCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    website: "",
    email: "",
    forBatch: new Date().getFullYear(),
    description: "",
    address: {
      city: "",
      district: "",
      state: "",
      postalCode: 0,
      completeAddress: "",
    },
    roles: [
      {
        name: "",
        avgPackage: 0,
        type: "full-time",
        mode: "on-site",
        bonds: 0,
        deadline: "",
        interviewDate: "",
        interviewMode: "",
        requirements: {
          cpi: 0,
          twelfthPerc: 0,
          competitiveCoding: [],
          expectedSkills: "",
        },
      },
    ],
  });
  const [isCreating, setIsCreating] = useState(false);

  const createCompany = async () => {
    setIsCreating(true);
    const response = await axios.post(`/api/company/new`, company, {
      withCredentials: true,
    });
    setCompany(response.data.data);
    setIsCreating(false);
  };

  const handleBasicChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e, index) => {
    let newRoles = company.roles;
    newRoles[index] = { ...newRoles[index], [e.target.name]: e.target.value };
    setCompany({ ...company });
  };

  const handleReqChange = (e, roleIndex) => {
    let newRoles = company.roles;
    newRoles[roleIndex] = {
      ...newRoles[roleIndex],
      requirements: {
        ...company.roles[roleIndex].requirements,
        [e.target.name]: e.target.value,
      },
    };
    setCompany({ ...company, roles: newRoles });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    let role = {
      name: "",
      avgPackage: 0,
      type: "",
      mode: "",
      bonds: 0,
      deadline: "",
      interviewDate: "",
      interviewMode: "",
      requirements: {
        cpi: 0,
        twelfthPerc: 0,
        competitiveCoding: [],
        expectedSkills: "",
      },
    };
    let roles = company.roles;
    roles.push(role);
    setCompany({ ...company, roles: roles });
  };

  const handleRemoveRole = (e, roleIndex) => {
    e.preventDefault();

    let roles = company.roles;
    roles = roles.filter((role, index) => index !== roleIndex);
    setCompany({ ...company, roles });
  };

  const handleAddCP = (e, roleIndex) => {
    e.preventDefault();

    let newCP = {
      platform: "",
      stars: 0,
      ratings: 0,
    };

    let roles = company.roles;
    roles[roleIndex]?.requirements.competitiveCoding.push(newCP);
    console.log("added cp ", roles[roleIndex]);
    setCompany({ ...company, roles });
  };

  const handleAddChange = (e) => {
    e.preventDefault();
    setCompany({
      ...company,
      address: { ...company.address, [e.target.name]: e.target.value },
    });
  };

  const handleRemoveCP = (e, roleIndex, cpIndex) => {
    e.preventDefault();

    let competitiveCoding = company.roles[
      roleIndex
    ].requirements.competitiveCoding.filter(
      (cpItem, index) => index !== cpIndex
    );

    let roles = company.roles;
    roles[roleIndex].requirements.competitiveCoding = competitiveCoding;
    setCompany({ ...company, roles });
  };

  const handleCPChange = (e, roleIndex, cpIndex) => {
    let roles = company.roles;
    roles[roleIndex].requirements.competitiveCoding[cpIndex] = {
      ...roles[roleIndex].requirements.competitiveCoding[cpIndex],
      [e.target.name]: e.target.value,
    };
    setCompany({ ...company, roles });
  };

  useEffect(() => {
    // setIsLoading(true);
    // axios
    //   .get(`/api/company?id=${id}`, { withCredentials: true })
    //   .then((result) => setCompany(result.data?.data))
    //   .catch((err) => console.log(err));
    // setIsLoading(false);
  }, []);

  console.log("company", company);
  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="companies" />
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        <div className="bg-section mx-auto px-4 py-4 lg:w-2/3">
          <h1 className="text-3xl font-bold">{company.name}</h1>

          {/* company details */}
          <form className="flex flex-row justify-between gap-2 flex-wrap mt-5">
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">Name</span>
              <input
                name="name"
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                value={company.name}
                onChange={handleBasicChange}
              />
            </div>
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">Website</span>
              <input
                name="website"
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                value={company.website}
                onChange={handleBasicChange}
              />
            </div>
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">Email</span>
              <input
                name="email"
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                value={company.email}
                onChange={handleBasicChange}
              />
            </div>

            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">For Batch ( year )</span>
              <input
                type="number"
                name="forBatch"
                value={company.forBatch}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleBasicChange}
              />
            </div>
            <div className="flex  flex-col gap-1 w-full">
              <span className="text-placeholder">Description</span>
              <textarea
                name="description"
                className="outline-none px-4 py-1 rounded-md bg-subSection h-20"
                value={company.description}
                onChange={handleBasicChange}
              />
            </div>

            <h2 className="w-full font-semibold text-2xl">Roles</h2>
            {company?.roles?.map((role, roleIndex) => {
              return (
                <>
                  {/* Remove this role */}
                  <div className="flex flex-row w-full justify-end">
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
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Role Name</span>
                      <input
                        name="name"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.name}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* role.avgPackage */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Average Package</span>
                      <input
                        name="avgPackage"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.avgPackage}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* role.type */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Type</span>
                      <select
                        name="type"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.type}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      >
                        <option value="full-time"> Full Time</option>
                        <option value="internship"> Internship</option>
                      </select>
                    </div>
                    {/* role.mode */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Mode</span>
                      <select
                        name="mode"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.mode}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      >
                        <option value="remote"> Remote</option>
                        <option value="on-site"> On Site</option>
                        <option value="hybrid"> hybrid </option>
                      </select>
                    </div>
                    {/* role.bonds */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">
                        Bonds (in months )
                      </span>
                      <input
                        name="bonds"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.bonds}
                        type="number"
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* role.deadling */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">
                        Deadline to apply
                      </span>
                      <input
                        name="deadline"
                        type="date"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.deadline.substring(0, 10)}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* role.interviewDate */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Interview Date</span>
                      <input
                        name="interviewDate"
                        type="date"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.interviewDate.substring(0, 10)}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* role.interviewMode */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Interview Mode</span>
                      <select
                        name="interviewMode"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.interviewMode}
                        onChange={(e) => {
                          handleRoleChange(e, roleIndex);
                        }}
                      >
                        <option value="online"> Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <h3 className="w-full mt-5 font-semibold text-lg">
                      Requirements
                    </h3>
                    {/* cpi */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">CPI</span>
                      <input
                        name="cpi"
                        type="number"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.requirements.cpi}
                        onChange={(e) => {
                          handleReqChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* 12 Th Perc */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">12th Percentage </span>
                      <input
                        name="twelfthPerc"
                        type="number"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.requirements.twelfthPerc}
                        onChange={(e) => {
                          handleReqChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* 10 Th Perc */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">10th Percentage </span>
                      <input
                        name="tenthPerc"
                        type="number"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.requirements.tenthPerc}
                        onChange={(e) => {
                          handleReqChange(e, roleIndex);
                        }}
                      />
                    </div>
                    {/* dimploma Perc */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">
                        Diploma Percentage
                      </span>
                      <input
                        name="diplomaPerc"
                        type="number"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={role.requirements.diplomaPerc}
                        onChange={(e) => {
                          handleReqChange(e, roleIndex);
                        }}
                      />
                    </div>
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

                            <div className="flex  flex-col gap-1 w-full md:w-2/5">
                              <span className="text-placeholder">Platform</span>
                              <input
                                name="platform"
                                className="outline-none px-4 py-1 rounded-md bg-subSection"
                                value={cpItem.platform}
                                onChange={(e) => {
                                  handleCPChange(e, roleIndex, cpIndex);
                                }}
                              />
                            </div>
                            {/* Stars */}
                            <div className="flex  flex-col gap-1 w-full md:w-2/5">
                              <span className="text-placeholder">Stars</span>
                              <input
                                name="stars"
                                type="number"
                                className="outline-none px-4 py-1 rounded-md bg-subSection"
                                value={cpItem.stars}
                                onChange={(e) => {
                                  handleCPChange(e, roleIndex, cpIndex);
                                }}
                              />
                            </div>
                            {/* Ratings */}
                            <div className="flex  flex-col gap-1 w-full md:w-2/5">
                              <span className="text-placeholder">Ratings</span>
                              <input
                                name="ratings"
                                type="number"
                                className="outline-none px-4 py-1 rounded-md bg-subSection"
                                value={cpItem.ratings}
                                onChange={(e) => {
                                  handleCPChange(e, roleIndex, cpIndex);
                                }}
                              />
                            </div>
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
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">City</span>
              <input
                name="city"
                value={company?.address?.city}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleAddChange}
              />
            </div>
            {/* address.districts */}
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">District</span>
              <input
                name="district"
                value={company?.address?.district}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleAddChange}
              />
            </div>
            {/* address.state */}
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">State</span>
              <input
                name="state"
                value={company?.address?.state}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleAddChange}
              />
            </div>
            {/* address.postalcode */}
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">Postal Code</span>
              <input
                name="postalCode"
                type={"number"}
                value={company?.address?.postalCode}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleAddChange}
              />
            </div>
            {/* address.completeAddress */}
            <div className="flex  flex-col gap-1 w-full md:w-2/5">
              <span className="text-placeholder">Address</span>
              <input
                name="completeAddress"
                value={company?.address?.completeAddress}
                className="outline-none px-4 py-1 rounded-md bg-subSection"
                onChange={handleAddChange}
              />
            </div>
            <div className="flex w-full flx-row justify-between mt-2 ">
              {/* <div className="flex flex-row gap-4"> */}
              <button
                className="text-section  bg-white rounded-md px-4 py-2 disabled:bg-section"
                onClick={() => createCompany()}
                disabled={isCreating}
              >
                {!isCreating ? (
                  "Post Company"
                ) : (
                  <ClipLoader color="white" size={22} />
                )}
              </button>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
