import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myImage from "./person.jpg";
import { Navbar } from "../Navbar/Navbar";
import getStuId from "../../utils/getStuId";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

export const Profile = () => {
  const [key, setKey] = useState(Math.random());
  const Gender = ["Male", "Female"];
  const InternshipMode = ["remote", "on-site"];

  const [student, setstudent] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    password: "",
    rollNumber: "",
    collegeId: "",
    gender: "",
    branch: "",
    passingYear: "",
    trainingCompanyStatus: "",
    salary: "",
    homeAddress: "",

    result: {
      sem1SPI: "",
      sem2SPI: "",
      sem3SPI: "",
      sem4SPI: "",
      sem5SPI: "",
      sem6SPI: "",
      sem7SPI: "",
      sem8SPI: "",
      cpi: "",
      twelfthPerc: "",
      tenthPerc: "",
      diplomaPerc: "",
    },

    dateOfBirth: "",
    personalPhoneNumber: "",
    parentsPhoneNumber: "",

    city: "",
    pincode: "",
    registrationStatus: "",
    collegEmail: "",
    personalEmail: "",

    competitiveCoding: [
      {
        platform: "",
        stars: "",
        ratings: "",
        profile: "",
      },
    ],

    address: {
      city: "",
      district: "",
      subDistrict: "",
      state: "",
      postalCode: "",
      completeAddress: "",
    },

    placementStatus: {
      selected: "",
      companyName: "",
      duration: "",
      package: "",
      joiningDate: "",
      mode: "",
    },

    internshipStatus: {
      selected: "",
      companyName: "",
      duration: "",
      stipend: "",
      joiningDate: "",
      mode: "",
    },

    result: {
      sem1: 0,
      sem2: 0,
      sem3: 0,
      sem4: 0,
      sem5: 0,
      sem6: 0,
      sem7: 0,
      sem8: 0,
      twelfthPerc: 0,
      tenthPerc: 0,
      diplomaPerc: 0,
      cpi: 0,
    },

    competitiveCoding: [],
  });

  // const [isLoading, setIsLoading] = useState(true);

  const handleAddProfile = (e) => {
    // Add new Coding profile
    e.preventDefault();
    const newObject = {
      platform: "",
      stars: "",
      ratings: "",
      profile: "",
    };

    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: [...prevState.competitiveCoding, newObject],
    }));
  };

  const handlePlatformChange = (e, index) => {
    const newCompititiveCoding = [...student.competitiveCoding];
    newCompititiveCoding[index].platform = e.target.value;

    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: newCompititiveCoding,
    }));
  };

  const handleProfileChange = (e, index) => {
    const newCompititiveCoding = [...student.competitiveCoding];
    newCompititiveCoding[index].profile = e.target.value;

    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: newCompititiveCoding,
    }));
  };

  const handleRatingChange = (e, index) => {
    const newCompititiveCoding = [...student.competitiveCoding];
    newCompititiveCoding[index].ratings = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: newCompititiveCoding,
    }));
  };

  const handleStarschange = (e, index) => {
    const newCompititiveCoding = [...student.competitiveCoding];
    newCompititiveCoding[index].stars = e.target.value;

    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: newCompititiveCoding,
    }));
  };

  const handleDeleteIndividualProfileChange = (index) => {
    const newCompititiveCoding = student.competitiveCoding;
    newCompititiveCoding.splice(index, 1);
    setstudent((prevState) => ({
      ...prevState,
      competitiveCoding: newCompititiveCoding,
    }));
  };

  const handleGenderChange = (e) => {
    var newGender = student.gender;
    newGender = e.target.value;
    setstudent((prevState) => ({ ...prevState, gender: newGender }));
  };

  const handleInternshipStatusChange = (e) => {
    var newInternshipStatus = student.internshipStatus;
    newInternshipStatus.selected = e.target.value;
    setstudent({ ...student, internshipStatus: newInternshipStatus });
    setKey(Math.random());
  };

  const handleInternShipModeChange = (e) => {
    var newInternshipStatus = student.internshipStatus;
    newInternshipStatus.mode = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      internshipStatus: newInternshipStatus,
    }));
  };

  const handleStipendChange = (e) => {
    const newInternship = student.internshipStatus;
    newInternship.stipend = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      internshipStatus: newInternship,
    }));
  };

  const handleInternShipDurationChange = (e) => {
    const newInternship = student.internshipStatus;
    newInternship.duration = e.target.value;

    setstudent((prevState) => ({
      ...prevState,
      internshipStatus: newInternship,
    }));
  };

  const handleInternShipCompanyNameChange = (e) => {
    const newInternship = student.internshipStatus;
    newInternship.companyName = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      internshipStatus: newInternship,
    }));
  };

  const handlePlacementCompanyNameChange = (e) => {
    const newPlacement = student.placementStatus;
    newPlacement.companyName = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      placementStatus: newPlacement,
    }));
  };

  const handleCompanyStatusChange = (e) => {
    var newplacementStatus = student.placementStatus;
    newplacementStatus.selected = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      placementStatus: newplacementStatus,
    }));
  };

  const handleCompanyModeChange = (e) => {
    var newplacementStatus = student.placementStatus;
    newplacementStatus.mode = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      placementStatus: newplacementStatus,
    }));
  };

  const handlePackageChange = (e) => {
    const newPlacement = student.placementStatus;
    newPlacement.package = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      placementStatus: newPlacement,
    }));
  };

  const handleCompanyBondChange = (e) => {
    const newPlacement = student.placementStatus;
    newPlacement.duration = e.target.value;
    setstudent((prevState) => ({
      ...prevState,
      placementStatus: newPlacement,
    }));
  };

  const handleCityChange = (e) => {
    var newAddress = student.address;
    newAddress.city = e.target.value;
    setstudent((prevState) => ({ ...prevState, address: newAddress }));
  };

  const handleStateChange = (e) => {
    var newAddress = student.address;
    newAddress.state = e.target.value;
    setstudent((prevState) => ({ ...prevState, address: newAddress }));
  };

  const handlePostalCodeChange = (e) => {
    var newAddress = student.address;
    newAddress.postalCode = e.target.value;
    setstudent((prevState) => ({ ...prevState, address: newAddress }));
  };

  const handlesubDistrictChange = (e) => {
    var newAddress = student.address;
    newAddress.subDistrict = e.target.value;
    setstudent((prevState) => ({ ...prevState, address: newAddress }));
  };

  const handlecompleteAddressChange = (e) => {
    var newAddress = student.address;
    newAddress.completeAddress = e.target.value;
    setstudent((prevState) => ({ ...prevState, address: newAddress }));
  };

  const getValues = async () => {
    return axios
      .get(`/api/student/?id=${getStuId()}`, { withCredentials: true })
      .then(({ data }) => {
        setstudent(data.data);
        return data.data;
      });
  };

  const { data, isLoading, isError } = useQuery(["profile"], getValues, {
    keepPreviousData: true,
  });

  const postEntry = async (e) => {
    try {
      const post = student;
      console.log("Post request from postEntry: ");
      console.log(post);
      axios.withCredentials = true;

      const res = await axios.put(`/api/student/update`, post, {
        withCredentials: true,
      });

      console.log("after making changes: ", res.data);
      location.reload();
    } catch (e) {
      console.log("error: ", e);
      alert("Incorrect email");
    }
  };
  return (
    <div>
      <div className="min-h-screen" style={{ backgroundColor: "#0B0E2A" }}>
        <Navbar />
        {isLoading ? (
          <div className="mt-5 text-center">
            <ClipLoader color="white" size={45} />
          </div>
        ) : (
          <div
            style={{ backgroundColor: "#0B0E2A" }}
            className="text-white pt-16"
          >
            <div
              style={{ backgroundColor: "#1A1C33" }}
              className="mx-1 lg:mx-32 xl:mx-52"
            >
              <div className="flex w-full justify-center items-center my-3">
                <img src={myImage} className="rounded-full w-[200px] h-auto" />
              </div>

              <form>
                {/* ************************* row 1 *********************** */}
                <div className="flex justify-between flex-wrap  mx-8">
                  <div className="w-full md:w-auto">
                    <label className="flex">Firstname</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.firstName}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          firstName: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">Middlename</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.middleName}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          middleName: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">Lastname</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.lastName}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          lastName: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                {/* ********************* row 2 ************************* */}
                <br />

                <div className="flex flex-wrap justify-between mx-8">
                  <div className="w-full md:w-auto">
                    <label className="flex">Personal Email</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.personalEmail}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          personalEmail: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>

                  <div>
                    <label className="flex">Date of Birth</label>
                    <div>
                      <input
                        type="date"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={new Date()}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            dateOfBirth: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ********************* row 2 ************************* */}
                <br />

                <div className="flex flex-wrap justify-between mx-8">
                  <div className="w-full md:w-auto">
                    <label className="flex">College Mail</label>

                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.collegeEmail}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          collegeEmail: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>
                </div>

                {/* ******************* row 3 ********************** */}

                <br />
                <div className="mx-8 flex-wrap">
                  <label className="flex">Address</label>
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.address.completeAddress}
                      onChange={(e) => handlecompleteAddressChange(e)}
                    ></input>
                  </div>
                </div>

                {/* *********************** row 4 ************************ */}
                <br />

                <div className="flex flex-wrap justify-between mx-8">
                  <div>
                    <label className="flex">Sub District</label>
                    <div>
                      <input
                        value={student?.address?.subDistrict}
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handlesubDistrictChange(e)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">City</label>
                    <div>
                      <input
                        type="text"
                        value={student?.address?.city}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handleCityChange(e)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ********************** row 5 ************************ */}
                <br />

                <div className="flex flex-wrap justify-between mx-8">
                  <div>
                    <label className="flex">Pincode</label>
                    <div>
                      <input
                        type="text"
                        value={student?.address?.postalCode}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handlePostalCodeChange(e)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">State</label>
                    <div>
                      <input
                        type="text"
                        value={student?.address?.state}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handleStateChange(e)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* *************************** row 6 ************************* */}

                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Gender</label>
                    <div className="text-black">
                      <select
                        name="internship_status"
                        id="internship_status"
                        className="text-white p-1"
                        style={{ backgroundColor: "#0B0E2A" }}
                        value={student.gender}
                        onChange={(e) => handleGenderChange(e)}
                      >
                        {Gender.map((item) => (
                          <option
                            value={item}
                            key={item}
                            className="text-white p-1"
                            style={{ backgroundColor: "#0B0E2A" }}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ******************************* row 7 ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Personal Contact Number</label>
                    <div>
                      <input
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.personalPhoneNumber}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            personalPhoneNumber: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className=" break-before-all">
                    <label className="flex">
                      Guardian/Parent Contact Number
                    </label>
                    <div>
                      <input
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.parentsPhoneNumber}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            parentsPhoneNumber: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ********************* row 8 ********************** */}

                <br />
                <div className="flex gap-6 mx-8">
                  <div>
                    <label className="flex font-bold">Student Resume</label>
                  </div>

                  <div>
                    <button
                      style={{ backgroundColor: "#3040D6" }}
                      className="px-3 rounded-full"
                    >
                      Upload Resume
                    </button>
                  </div>
                </div>

                {/* ********************* row 9 ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Branch</label>
                    <div>
                      <input
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.branch}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            branch: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">Passing Year</label>
                    <div>
                      <input
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.passingYear}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            passingYear: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ********************* row 10 ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Password</label>
                    <div>
                      <input
                        type="text"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.password}
                        onChange={(e) => {
                          setstudent((prevState) => ({
                            ...prevState,
                            password: e.target.value,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                <br />
                <div className="">
                  <h3 className="flex mx-8">SPI</h3>
                </div>
                <br />

                {/* ********************* row 11 ************************* */}

                <div className="flex flex-wrap justify-between mx-8">
                  <div className="w-full md:w-auto">
                    <label className="flex">1st Sem</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      name="sem1"
                      value={student.result.sem1}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem1: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">2nd Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem2}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem2: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">3rd Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem3}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem3: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">4th Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem4}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem4: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>
                  <div className="w-full md:w-auto">
                    <label className="flex">5th Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem5}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem5: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">6th Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem6}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem6: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">7th Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem7}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem7: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="flex">8th Sem</label>
                    <input
                      type="text"
                      className=" px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                      autoComplete="false"
                      value={student.result.sem8}
                      onChange={(e) => {
                        setstudent((prevState) => ({
                          ...prevState,
                          result: {
                            ...prevState.result,
                            sem8: e.target.value,
                          },
                        }));
                      }}
                    ></input>
                  </div>
                </div>

                <div className="flex justify-between mx-8"></div>

                {/* ********************* row 13 ********************** */}

                <br />
                <div className="w-full md:w-auto mx-8 ">
                  <label className="flex">CPI</label>
                  <input
                    type="text"
                    className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    autoComplete="false"
                    value={student.result.cpi}
                    onChange={(e) => {
                      setstudent((prevState) => ({
                        ...prevState,
                        cpi: e.target.value,
                      }));
                    }}
                  ></input>
                </div>

                {/* ********************* row 14 ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">SSC/Diploma Percentage</label>
                    <div>
                      <label className="flex">
                        <input
                          type="text"
                          className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                          autoComplete="false"
                          value={student.result.twelfthPerc}
                          onChange={(e) => {
                            setstudent((prevState) => ({
                              ...prevState,
                              result: {
                                ...prevState.result,
                                twelfthPerc: e.target.value,
                              },
                            }));
                          }}
                        ></input>
                        %
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ backgroundColor: "#3040D6" }}
                      className="p-3 rounded-full"
                    >
                      Upload Marksheet
                    </button>
                  </div>
                </div>

                {/* ********************* row 14 ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">HSC Percentage</label>
                    <div>
                      <label className="flex">
                        <input
                          type="text"
                          className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                          autoComplete="false"
                          value={student.result.tenthPerc}
                          onChange={(e) => {
                            setstudent((prevState) => ({
                              ...prevState,
                              result: {
                                ...prevState.result,
                                tenthPerc: e.target.value,
                              },
                            }));
                          }}
                        ></input>
                        %
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ backgroundColor: "#3040D6" }}
                      className="p-3 rounded-full"
                    >
                      Upload Marksheet
                    </button>
                  </div>
                </div>

                {/* ********************* row 15 ********************** */}

                <br />
                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Coding Profile</label>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div className="mx-8">
                      <button
                        style={{ backgroundColor: "#3040D6" }}
                        className="p-3 rounded-full"
                        onClick={handleAddProfile}
                      >
                        Add Profile
                      </button>
                    </div>
                  </div>
                </div>

                <br />
                {student.competitiveCoding ? (
                  <div>
                    {student.competitiveCoding.map((item, index) => {
                      return (
                        <div>
                          <div className="flex justify-between mx-8">
                            <div>
                              <label className="flex">Platform</label>
                              <div>
                                <input
                                  type="text"
                                  className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                  autoComplete="false"
                                  key={index}
                                  value={
                                    student.competitiveCoding[index].platform
                                  }
                                  onChange={(e) =>
                                    handlePlatformChange(e, index)
                                  }
                                ></input>
                              </div>
                            </div>

                            <div>
                              <label className="flex">Profile</label>
                              <div>
                                <input
                                  type="text"
                                  className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                  autoComplete="false"
                                  key={index}
                                  value={
                                    student.competitiveCoding[index].profile
                                  }
                                  onChange={(e) =>
                                    handleProfileChange(e, index)
                                  }
                                ></input>
                              </div>
                            </div>
                          </div>

                          <br />

                          <div className="flex justify-between mx-8">
                            <div>
                              <label className="flex">Stars</label>
                              <div>
                                <input
                                  type="text"
                                  className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                  autoComplete="false"
                                  key={index}
                                  value={student.competitiveCoding[index].stars}
                                  onChange={(e) => handleStarschange(e, index)}
                                ></input>
                              </div>
                            </div>

                            <div>
                              <label className="flex">Ratings</label>
                              <div>
                                <input
                                  type="text"
                                  className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                                  autoComplete="false"
                                  key={index}
                                  value={
                                    student.competitiveCoding[index].ratings
                                  }
                                  onChange={(e) => handleRatingChange(e, index)}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <br />

                          <div>
                            <button
                              type="button"
                              style={{ backgroundColor: "#3040D6" }}
                              className="p-3 rounded-full"
                              onClick={() =>
                                handleDeleteIndividualProfileChange(index)
                              }
                            >
                              Delete Profile
                            </button>
                          </div>
                          <br />
                          <hr />
                          <br />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <br />

                <br />
                <div className="">
                  <h3 className="flex mx-8">
                    <b>Placement/Internship status</b>
                  </h3>
                </div>
                <br />

                <br />
                <div className="">
                  <h3 className="flex mx-8">Internship</h3>
                </div>
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Selected for Internship</label>

                    {/* <div className="text-black" key={key}> */}
                    <select
                      value={student?.internshipStatus?.selected}
                      name="internship_status"
                      id="internship_status"
                      className="text-white mt-2 "
                      style={{ backgroundColor: "#0B0E2A" }}
                      onChange={(e) => handleInternshipStatusChange(e)}
                    >
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex">Company Name</label>
                    <input
                      type="text"
                      value={student?.internshipStatus?.companyName}
                      className="px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      onChange={(e) => handleInternShipCompanyNameChange(e)}
                    ></input>
                  </div>
                </div>

                {/* ********************* row - 16  ************************* */}

                <br />
                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Joining Date</label>
                    <div>
                      <input
                        type="date"
                        value={student?.internshipStatus?.joiningDate}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">
                      Internship Duration (in Months)
                    </label>
                    <div>
                      <input
                        type="text"
                        value={student?.internshipStatus?.duration}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handleInternShipDurationChange(e)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ************************ row - 17  ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Stipend (In thousand Rupees)</label>
                    <div>
                      <input
                        type="text"
                        value={student?.internshipStatus?.stipend}
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        onChange={(e) => handleStipendChange(e)}
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="">Mode</label>
                    <select
                      value={student?.internshipStatus?.mode}
                      name="internship_status"
                      id="internship_status"
                      className="text-white p-1"
                      style={{ backgroundColor: "#0B0E2A" }}
                      onChange={(e) => handleInternShipModeChange(e)}
                    >
                      {InternshipMode.map((item) => (
                        <option
                          value={item}
                          className="text-white p-1"
                          style={{ backgroundColor: "#0B0E2A" }}
                          key={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <br />

                <br />
                <div className="">
                  <h3 className="flex mx-8">Placement</h3>
                </div>
                <br />

                {/* ********************* row - 18  ************************* */}

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Selected for Placement</label>
                    <select
                      name="internship_status"
                      id="internship_status"
                      className="text-white p-1"
                      style={{ backgroundColor: "#0B0E2A" }}
                      value={student.placementStatus.selected}
                      onChange={(e) => handleCompanyStatusChange(e)}
                    >
                      <option
                        value="yes"
                        className="text-white p-1"
                        style={{ backgroundColor: "#0B0E2A" }}
                      >
                        Yes
                      </option>
                      <option
                        value="no"
                        className="text-white p-1"
                        style={{ backgroundColor: "#0B0E2A" }}
                      >
                        No
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="flex">Company Name</label>
                    <input
                      type="text"
                      className="px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                      autoComplete="false"
                      value={student.placementStatus.companyName}
                      onChange={(e) => handlePlacementCompanyNameChange(e)}
                    ></input>
                  </div>
                </div>

                {/* ********************* row - 19  ************************* */}

                <br />
                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Joining Date</label>
                    <div>
                      <input
                        type="date"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">Job Bond (in Months)</label>
                    <div>
                      <input
                        type="number"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.placementStatus.duration}
                        onChange={(e) => handleCompanyBondChange(e)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* ************************ row - 20  ************************* */}
                <br />

                <div className="flex justify-between mx-8">
                  <div>
                    <label className="flex">Annual Package (In Lakhs)</label>
                    <div>
                      <input
                        type="number"
                        className=" px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                        autoComplete="false"
                        value={student.placementStatus.package}
                        onChange={(e) => handlePackageChange(e)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label className="flex">Mode</label>
                    <div className="text-black">
                      <select
                        name="internship_status"
                        id="internship_status"
                        className="text-white p-1"
                        style={{ backgroundColor: "#0B0E2A" }}
                        value={student.placementStatus.mode}
                        onChange={(e) => handleCompanyModeChange(e)}
                      >
                        <option
                          value="yes"
                          className="text-white p-1"
                          style={{ backgroundColor: "#0B0E2A" }}
                        >
                          Remote
                        </option>
                        <option
                          value="no"
                          className="text-white p-1"
                          style={{ backgroundColor: "#0B0E2A" }}
                        >
                          Work from Home
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <br />
              <br />
              <br />

              <div className="flex justify-around mx-8">
                <div>
                  <button
                    style={{ backgroundColor: "#3040D6" }}
                    className="p-3 rounded-full w-40"
                    onClick={postEntry}
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
              </div>
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
  );
};
