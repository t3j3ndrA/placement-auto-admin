import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import companyViewValidator from "../form-validators/companyView.validator";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

const StudentView = () => {
  const { id } = useParams();
  const location = useLocation();

  const stu = location.state;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="students" />
      {/* Wrapper div */}
      <div className="px-2 py-5 flex flex-col gap-8 md:px-8 lg:px-12">
        {isLoading ? (
          <div className="flex flex-row justify-center mt-12">
            <HashLoader color="white" />
          </div>
        ) : (
          <div className="bg-section mx-auto px-4 py-4 lg:w-2/3">
            <div className="flex flx-row justify-between my-3 ">
              <h1 className="text-3xl font-bold">
                {stu.firstName + " " + stu.lastName}
              </h1>

              <button className="text-section  bg-white rounded-md px-4 ">
                Download Resume
              </button>
            </div>

            {/* COMPANY DETAILS */}
            <form className="flex flex-row justify-between gap-2 flex-wrap mt-5">
              {/* First Name */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">First Name</span>
                <input
                  name="firstName"
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                  value={stu.firstName}
                  disabled={true}
                />
              </div>
              {/* Middle Name */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Middle Name</span>
                <input
                  name="middleName"
                  disabled={true}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                  value={stu.middleName}
                />
              </div>
              {/* Last Name */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Last Name</span>
                <input
                  name="lastName"
                  disabled={true}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                  value={stu.lastName}
                />
              </div>
              {/* Gender */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Gender</span>
                <input
                  disabled={true}
                  name="gender"
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                  value={stu.gender}
                />
              </div>
              {/* Date Of Birth */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">DOB</span>
                <input
                  name="dateOfBirth"
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                  value={stu.dateOfBirth.substring(0, 10)}
                />
              </div>

              {/* College  Details */}
              <h2 className="mt-3 w-full font-semibold text-2xl">
                College Details
              </h2>

              {/* College ID */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">College ID</span>
                <input
                  disabled={true}
                  name="collegeID"
                  value={stu.collegeID}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>

              {/* College Email */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">College Email</span>
                <input
                  disabled={true}
                  name="collegeEmail"
                  value={stu.collegeEmail}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Roll Number */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Roll No.</span>
                <input
                  disabled={true}
                  name="rollNumber"
                  value={stu.rollNumber}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>

              {/*Passing Year */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Passing Year</span>
                <input
                  disabled={true}
                  type="number"
                  name="passingYear"
                  value={stu.passingYear}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* CONTACT DETAIL */}
              {/* Personal Phone */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Personal Phone</span>
                <input
                  disabled={true}
                  name="personalPhoneNumber"
                  value={stu.personalPhoneNumber}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Parent's phone */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Parent's Phone</span>
                <input
                  disabled={true}
                  name="parentsPhoneNumber"
                  value={stu.parentsPhoneNumber}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Personal Email */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Personal Email</span>
                <input
                  disabled={true}
                  name="personalEmail"
                  value={stu.personalEmail}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* College  Details */}
              <h2 className="mt-3 w-full font-semibold text-2xl">Result</h2>

              {/* Sem1 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 1</span>
                <input
                  disabled={true}
                  name="sem1"
                  value={stu.result.sem1}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>

              {/* Sem2 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 2</span>
                <input
                  disabled={true}
                  name="sem2"
                  value={stu.result.sem2}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>

              {/* Sem3 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 3</span>
                <input
                  disabled={true}
                  name="sem3"
                  value={stu.result.sem3}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Sem4 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 4</span>
                <input
                  disabled={true}
                  name="sem4"
                  value={stu.result.sem4}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Sem5 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 5</span>
                <input
                  disabled={true}
                  name="sem5"
                  value={stu.result.sem5}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Sem6 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 6</span>
                <input
                  disabled={true}
                  name="sem6"
                  value={stu.result.sem6}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Sem7 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 7</span>
                <input
                  disabled={true}
                  name="sem7"
                  value={stu.result.sem7}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Sem8 */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Sem 8</span>
                <input
                  disabled={true}
                  name="sem8"
                  value={stu.result.sem8}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* CPI */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">CPI</span>
                <input
                  disabled={true}
                  name="cpi"
                  value={stu.result.cpi}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Twelfth Perc */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">12th Percentage</span>
                <input
                  disabled={true}
                  name="twelfthPerc"
                  value={stu.result.twelfthPerc}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Tenth Perce */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Tenth Perc</span>
                <input
                  disabled={true}
                  name="tenthPerc"
                  value={stu.result.tenthPerc}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Diploma Perc */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Diploma Percentage</span>
                <input
                  disabled={true}
                  name="diplomaPerc"
                  value={stu.result.diplomaPerc}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* Competitive programming */}
              <h2 className="mt-3 w-full font-semibold text-2xl">
                Competitive Coding
              </h2>
              {stu?.competitiveCoding?.map((cpItem, cpIndex) => {
                return (
                  <>
                    {/* Platform */}
                    <div className="flex  flex-col gap-1 w-full md:w-2/5">
                      <span className="text-placeholder">Platform</span>
                      <input
                        name="platform"
                        className="outline-none px-4 py-1 rounded-md bg-subSection"
                        value={cpItem.platform}
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                      />
                    </div>

                    <div className="w-full bg-lightHover h-[1px]"></div>
                  </>
                );
              })}
              {/* Placement Status*/}
              <h2 className="w-full font-semibold text-2xl mt-3">
                Placement Status
              </h2>
              {stu.placementStatus.selected === "yes" ? (
                <>
                  {/* Comany Name  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Company</span>
                    <input
                      disabled={true}
                      name="companyName"
                      value={stu.placementStatus.companyName}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Package  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Package (in LPA)</span>
                    <input
                      disabled={true}
                      type="number"
                      name="companyName"
                      value={stu.placementStatus.package}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Bond (in months)  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Bond (in months)</span>
                    <input
                      disabled={true}
                      type="number"
                      name="duration"
                      value={stu.placementStatus.duration}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Joining Date  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Joining Date</span>
                    <input
                      disabled={true}
                      name="duration"
                      value={stu.placementStatus.joiningDate.substring(0, 10)}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Mode of job  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Mode </span>
                    <input
                      disabled={true}
                      name="mode"
                      value={stu.placementStatus.mode}
                      className="outline-none px-4 py-1 rounded-md bg-subSection capitalize"
                    />
                  </div>
                </>
              ) : (
                <h2 className=" my-3 text-lg text-placeholder">NIL</h2>
              )}

              {/* Internship Status*/}
              <h2 className="w-full font-semibold text-2xl mt-3">
                Internship Status
              </h2>
              {stu.placementStatus.selected === "yes" ? (
                <>
                  {/* Comany Name  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Company</span>
                    <input
                      disabled={true}
                      name="companyName"
                      value={stu.internshipStatus.companyName}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Package  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">
                      Stipend (in thousands/month)
                    </span>
                    <input
                      disabled={true}
                      type="number"
                      name="companyName"
                      value={stu.internshipStatus.stipend}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Bond (in months)  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Bonds (in months)</span>
                    <input
                      disabled={true}
                      type="number"
                      name="duration"
                      value={stu.internshipStatus.duration}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Joining Date  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Joining Date</span>
                    <input
                      disabled={true}
                      name="duration"
                      value={stu.internshipStatus.joiningDate.substring(0, 10)}
                      className="outline-none px-4 py-1 rounded-md bg-subSection"
                    />
                  </div>

                  {/* Mode of job  */}
                  <div className="flex  flex-col gap-1 w-full md:w-2/5">
                    <span className="text-placeholder">Mode </span>
                    <input
                      disabled={true}
                      name="mode"
                      value={stu.internshipStatus.mode}
                      className="outline-none px-4 py-1 rounded-md bg-subSection capitalize"
                    />
                  </div>
                </>
              ) : (
                <h2 className=" my-3 text-lg text-placeholder">NIL</h2>
              )}
              {/* ADDRESS */}
              <h2 className="mt-2 w-full font-semibold text-2xl">Address</h2>
              {/* address.city */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">City</span>
                <input
                  name="city"
                  value={stu?.address?.city}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* address.districts */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">District</span>
                <input
                  name="district"
                  value={stu?.address?.district}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* address.state */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">State</span>
                <input
                  name="state"
                  value={stu?.address?.state}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* address.postalcode */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Postal Code</span>
                <input
                  name="postalCode"
                  type={"number"}
                  value={stu?.address?.postalCode}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
              {/* address.completeAddress */}
              <div className="flex  flex-col gap-1 w-full md:w-2/5">
                <span className="text-placeholder">Address</span>
                <textarea
                  name="completeAddress"
                  value={stu?.address?.completeAddress}
                  className="outline-none px-4 py-1 rounded-md bg-subSection"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;
