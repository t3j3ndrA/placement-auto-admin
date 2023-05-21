import { Navbar } from "../Navbar/Navbar";
// import data from'./Input.json'
import { React, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import getStuId from "../../utils/getStuId";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

export const Company_page = ({ fetched_url }) => {
  var student_id = getStuId();

  const handleApply = async (e, index, companyId, roleId, stuId) => {
    try {
      const data = await axios.put(
        `/api/company/apply-to/${companyId}/for/${roleId}/${student_id}`
      );
      if (data.data.success === true) {
        toast.success("Applied ✅");
      } else if (data.data.success === false) {
        toast.error("You are not elligible ❌");
      }
    } catch (err) {
      toast.error("📶 Low internet connection ");
    }
  };

  const id = fetched_url.id1;
  const getValues = async () => {
    return axios
      .get(`/api/company/?id=${id}&stuId=${getStuId()}`)
      .then(({ data }) => {
        return data.data;
      });
  };

  const {
    data: _data,
    isLoading,
    isError,
    error,
  } = useQuery(["company", id], getValues, {
    keepPreviousData: true,
  });

  if (isError) {
    console.log("Err >> ", error);
    toast.error("📶 Low internet connection ");
  }
  return (
    <>
      <div>
        <div className="min-h-screen">
          <Navbar />
          {isLoading || isError ? (
            <div className="mt-5 text-center">
              <ClipLoader color="blue" size={45} />
            </div>
          ) : (
            <div className=" text-b;acl  pt-28 ">
              <div className="mx-72 grid bg-[#d8ecff] rounded-e-md">
                <br />
                <div className="flex flex-row align-middle justify-center">
                  <div className="basis-1/3 mx-2">
                    <label htmlFor="">Name</label>
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      type="text"
                      className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                      value={_data.name}
                      autoComplete="false"
                      readOnly={true}
                    ></input>
                  </div>
                </div>
                <br />
                {/* ********************************* */}

                <div className="flex flex-row align-middle justify-center">
                  <div className="basis-1/3 mx-2">
                    <label htmlFor="">Website</label>
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      type="text"
                      className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                      value={_data.website}
                      autoComplete="false"
                      readOnly={true}
                    ></input>
                  </div>
                </div>
                <br />
                {/* ********************************* */}

                <div className="flex flex-row align-middle justify-center">
                  <div className="basis-1/3 mx-2">
                    <label htmlFor="">Mail id</label>
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      type="text"
                      className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                      value={_data.email}
                      autoComplete="false"
                      readOnly={true}
                    ></input>
                  </div>
                </div>
                <br />
                {/* ********************************* */}

                <div className="flex flex-row align-middle justify-center">
                  <div className="basis-1/3 mx-2">
                    <label htmlFor="">For Batch</label>
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      type="text"
                      className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                      value={_data && _data.forBatch}
                      autoComplete="false"
                      readOnly={true}
                    ></input>
                  </div>
                </div>
                <br />
                {/* ********************************* */}

                <div className="flex flex-row align-middle justify-center">
                  <div className="basis-1/3 mx-2">
                    <label htmlFor="">Description</label>
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      type="text"
                      className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                      value={_data && _data.description}
                      autoComplete="false"
                      readOnly={true}
                    ></input>
                  </div>
                </div>
                <br />
                {/* ********************************* */}

                <br />
                <div className="mx-2">
                  <h2>Roles</h2>
                </div>
                <br />
                {_data.roles.map((item, index) => {
                  return (
                    <div>
                      {item.name ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Name</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.name}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.avgPackage ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Average Package</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.avgPackage}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.type ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Type</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.type}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.mode ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Mode</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.mode}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.bonds ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Bond (in Months)</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.bonds}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.deadline ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Deadline to apply</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.deadline}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                          {/* ********************************* */}
                        </div>
                      ) : null}

                      {item.interviewMode ? (
                        <div>
                          <div className="flex flex-row align-middle justify-center">
                            <div className="basis-1/3 mx-2">
                              <label htmlFor="">Interview Mode</label>
                            </div>

                            <div className="mx-2 w-full">
                              <input
                                type="text"
                                className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                value={item.interviewMode}
                                autoComplete="false"
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                          <br />
                        </div>
                      ) : null}

                      {item.requirements ? (
                        <div>
                          <div className="mx-2">
                            <h2>Requirements for this role</h2>
                          </div>
                          <br />
                          {item.requirements.cpi ? (
                            <div>
                              <div className="flex flex-row align-middle justify-center">
                                <div className="basis-1/3 mx-2">
                                  <label htmlFor="">CPI</label>
                                </div>

                                <div className="mx-2 w-full">
                                  <input
                                    type="text"
                                    className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                    value={item.requirements.cpi}
                                    autoComplete="false"
                                    readOnly={true}
                                  ></input>
                                </div>
                              </div>
                              <br />
                            </div>
                          ) : null}

                          {item.requirements.twelfthPerc ? (
                            <div>
                              <div className="flex flex-row align-middle justify-center">
                                <div className="basis-1/3 mx-2">
                                  <label htmlFor="">Twelth Percentage</label>
                                </div>

                                <div className="mx-2 w-full">
                                  <input
                                    type="text"
                                    className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                    value={item.requirements.twelfthPerc}
                                    autoComplete="false"
                                    readOnly={true}
                                  ></input>
                                </div>
                              </div>
                              <br />
                            </div>
                          ) : null}

                          {item.requirements.competitiveCoding ? (
                            <div>
                              {item.requirements.competitiveCoding.map(
                                (item1) => {
                                  return (
                                    <div className="mx-30">
                                      <div className="flex flex-row align-middle justify-center">
                                        <div className="basis-1/3 mx-2">
                                          <label htmlFor="">Platform</label>
                                        </div>

                                        <div className="mx-2 w-full">
                                          <input
                                            type="text"
                                            className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                            value={item1.platform}
                                            autoComplete="false"
                                            readOnly={true}
                                          ></input>
                                        </div>
                                      </div>
                                      <br />

                                      <div className="flex flex-row align-middle justify-center">
                                        <div className="basis-1/3 mx-2">
                                          <label htmlFor="">Starts</label>
                                        </div>

                                        <div className="mx-2 w-full">
                                          <input
                                            type="text"
                                            className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                            value={item1.stars}
                                            autoComplete="false"
                                            readOnly={true}
                                          ></input>
                                        </div>
                                      </div>
                                      <br />

                                      <div className="flex flex-row align-middle justify-center">
                                        <div className="basis-1/3 mx-2">
                                          <label htmlFor="">Rating</label>
                                        </div>

                                        <div className="mx-2 w-full">
                                          <input
                                            type="text"
                                            className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                                            value={item1.ratings}
                                            autoComplete="false"
                                            readOnly={true}
                                          ></input>
                                        </div>
                                      </div>
                                      <br />
                                      {/* <hr /> */}
                                      <br />
                                      {/* ********************************* */}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : null}
                          {/* ********************************* */}

                          {item.requirements.expectedSkills ? (
                            <div></div>
                          ) : null}
                        </div>
                      ) : null}

                      <br />

                      <div className="flex justify-center">
                        {item.isElligible === true ? (
                          <div className="w-2/12 grid justify-items-center m-2 p-2 bg-blue-500">
                            <button
                              className="text-white "
                              key={index}
                              onClick={(e) =>
                                handleApply(
                                  e,
                                  index,
                                  _data._id,
                                  item._id,
                                  student_id
                                )
                              }
                              disabled={item.hasApplied}
                            >
                              {item.hasApplied ? "Applied ✅" : "Apply"}
                            </button>
                          </div>
                        ) : (
                          <div className="w-2/12 grid justify-items-center m-2 p-2 bg-blue-500">
                            <button
                              className="text-white "
                              key={index}
                              disabled={true}
                            >
                              Not Elligible ❌
                            </button>
                          </div>
                        )}
                      </div>
                      <br />
                      <hr />
                      <br />
                    </div>
                  );
                })}
                {_data.address ? (
                  <div>
                    <br />
                    <div className="mx-2">
                      <h2>Address</h2>
                    </div>
                    <br />

                    {_data.address.city ? (
                      <div>
                        <div className="flex flex-row align-middle justify-center">
                          <div className="basis-1/3 mx-2">
                            <label htmlFor="">City</label>
                          </div>

                          <div className="mx-2 w-full">
                            <input
                              type="text"
                              className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                              value={_data.address.city}
                              autoComplete="false"
                              readOnly={true}
                            ></input>
                          </div>
                        </div>
                        <br />
                        {/* ********************************* */}
                      </div>
                    ) : null}

                    {_data.address.district ? (
                      <div>
                        <div className="flex flex-row align-middle justify-center">
                          <div className="basis-1/3 mx-2">
                            <label htmlFor="">District</label>
                          </div>

                          <div className="mx-2 w-full">
                            <input
                              type="text"
                              className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                              value={_data.address.district}
                              autoComplete="false"
                              readOnly={true}
                            ></input>
                          </div>
                        </div>
                        <br />
                        {/* ********************************* */}
                      </div>
                    ) : null}

                    {_data.address.state ? (
                      <div>
                        <div className="flex flex-row align-middle justify-center">
                          <div className="basis-1/3 mx-2">
                            <label htmlFor="">State</label>
                          </div>

                          <div className="mx-2 w-full">
                            <input
                              type="text"
                              className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                              value={_data.address.state}
                              autoComplete="false"
                              readOnly={true}
                            ></input>
                          </div>
                        </div>
                        <br />
                        {/* ********************************* */}
                      </div>
                    ) : null}

                    {_data.address.postalCode ? (
                      <div>
                        <div className="flex flex-row align-middle justify-center">
                          <div className="basis-1/3 mx-2">
                            <label htmlFor="">Postal Code</label>
                          </div>

                          <div className="mx-2 w-full">
                            <input
                              type="text"
                              className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                              value={_data.address.postalCode}
                              autoComplete="false"
                              readOnly={true}
                            ></input>
                          </div>
                        </div>
                        <br />
                        {/* ********************************* */}
                      </div>
                    ) : null}

                    {_data.address.completeAddress ? (
                      <div>
                        <div className="flex flex-row align-middle justify-center">
                          <div className="basis-1/3 mx-2">
                            <label htmlFor="">Complete Address</label>
                          </div>

                          <div className="mx-2 w-full">
                            <input
                              type="text"
                              className="outline-none px-3 py-2 flex rounded-lg pt-2 border-[1px] border-gray-700  w-full"
                              value={_data.address.completeAddress}
                              autoComplete="false"
                              readOnly={true}
                            ></input>
                          </div>
                        </div>
                        <br />
                        {/* ********************************* */}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <br />
                <br />
                {/* <div className="flex justify-around mx-8">
                  <div>
                    <button
                      style={{ backgroundColor: "#3040D6" }}
                      className="p-3 rounded-full w-40"
                    >
                      Save Changes
                    </button>
                  </div>

                  <div>
                    <button
                      style={{ backgroundColor: "#3040D6" }}
                      className="p-3 rounded-full w-40"
                    >
                      Cancel
                    </button>
                  </div>
                </div> */}

                <br />
                <br />
              </div>

              <br />
              <br />
              <br />
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClic={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
    </>
  );
};
